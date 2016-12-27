/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "RCTNetworkTask.h"

#import <mutex>

#import "RCTLog.h"
#import "RCTUtils.h"

@implementation RCTNetworkTask
{
  NSMutableData *_data;
  id<RCTURLRequestHandler> _handler;
  dispatch_queue_t _callbackQueue;

  RCTNetworkTask *_selfReference;
  std::mutex _mutex;
}

@synthesize status = _status;

- (instancetype)initWithRequest:(NSURLRequest *)request
                        handler:(id<RCTURLRequestHandler>)handler
                  callbackQueue:(dispatch_queue_t)callbackQueue
{
  RCTAssertParam(request);
  RCTAssertParam(handler);
  RCTAssertParam(callbackQueue);

  static NSUInteger requestID = 0;

  if ((self = [super init])) {
    _requestID = @(requestID++);
    _request = request;
    _handler = handler;
    _callbackQueue = callbackQueue;
    _status = RCTNetworkTaskPending;

    dispatch_queue_set_specific(callbackQueue, (__bridge void *)self, (__bridge void *)self, NULL);
  }
  return self;
}

RCT_NOT_IMPLEMENTED(- (instancetype)init)

- (void)invalidate
{
  _selfReference = nil;
  _completionBlock = nil;
  _downloadProgressBlock = nil;
  _incrementalDataBlock = nil;
  _responseBlock = nil;
  _uploadProgressBlock = nil;
  _requestToken = nil;
}

- (RCTNetworkTaskStatus)status
{
  std::lock_guard<std::mutex> lock(_mutex);
  return _status;
}

- (void)dispatchCallback:(dispatch_block_t)callback
{
  if (dispatch_get_specific((__bridge void *)self) == (__bridge void *)self) {
    callback();
  } else {
    dispatch_async(_callbackQueue, callback);
  }
}

- (BOOL)start
{
  std::lock_guard<std::mutex> lock(_mutex);
  if (_status != RCTNetworkTaskPending) {
    RCTLogError(@"Can't start task that's not pending");
    return NO;
  }

  RCTAssert(_requestToken == nil, @"requestToken should not be set before the task is started");
  _selfReference = self;
  _status = RCTNetworkTaskInProgress;

  dispatch_block_t sendRequestBlock = ^{
    self->_requestToken = [self->_handler sendRequest:self->_request withDelegate:self];
  };

  if ([_handler respondsToSelector:@selector(methodQueue)]) {
    dispatch_async([_handler methodQueue], sendRequestBlock);
  } else {
    sendRequestBlock();
  }

  return YES;
}

- (void)cancel
{
  std::lock_guard<std::mutex> lock(_mutex);
  if (_status == RCTNetworkTaskFinished) {
    return;
  }

  id token = _requestToken;
  if (token && [_handler respondsToSelector:@selector(cancelRequest:)]) {
    [_handler cancelRequest:token];
  }

  // The task was in progress, we'll get a completion callback anyway
  if (_status != RCTNetworkTaskInProgress) {
    [self invalidate];
  }

  _status = RCTNetworkTaskFinished;
}

- (BOOL)validateRequestToken:(id)requestToken
{
  if (_requestToken == nil) {
    if (RCT_DEBUG) {
      RCTLogError(@"Missing request token for request: %@", _request);
    }
    return NO;
  }

  if (![requestToken isEqual:_requestToken]) {
    if (RCT_DEBUG) {
      RCTLogError(@"Unrecognized request token: %@ expected: %@", requestToken, _requestToken);
    }

    std::lock_guard<std::mutex> lock(_mutex);
    _status = RCTNetworkTaskFinished;
    if (_completionBlock) {
      RCTURLRequestCompletionBlock completionBlock = _completionBlock;
      [self dispatchCallback:^{
        completionBlock(self->_response, nil, RCTErrorWithMessage(@"Invalid request token."));
      }];
    }

    [self invalidate];
  }

  return YES;
}

- (void)URLRequest:(id)requestToken didSendDataWithProgress:(int64_t)bytesSent
{
  if (![self validateRequestToken:requestToken]) {
    return;
  }

  if (_uploadProgressBlock) {
    RCTURLRequestProgressBlock uploadProgressBlock = _uploadProgressBlock;
    int64_t length = _request.HTTPBody.length;
    [self dispatchCallback:^{
      uploadProgressBlock(bytesSent, length);
    }];
  }
}

- (void)URLRequest:(id)requestToken didReceiveResponse:(NSURLResponse *)response
{
  if (![self validateRequestToken:requestToken]) {
    return;
  }

  _response = response;
  if (_responseBlock) {
    RCTURLRequestResponseBlock responseBlock = _responseBlock;
    [self dispatchCallback:^{
      responseBlock(response);
    }];
  }
}

- (void)URLRequest:(id)requestToken didReceiveData:(NSData *)data
{
  if (![self validateRequestToken:requestToken]) {
    return;
  }

  if (!_data) {
    _data = [NSMutableData new];
  }
  [_data appendData:data];

  int64_t length = _data.length;
  int64_t total = _response.expectedContentLength;

  if (_incrementalDataBlock) {
    RCTURLRequestIncrementalDataBlock incrementalDataBlock = _incrementalDataBlock;
    [self dispatchCallback:^{
      incrementalDataBlock(data, length, total);
    }];
  }
  if (_downloadProgressBlock && total > 0) {
    RCTURLRequestProgressBlock downloadProgressBlock = _downloadProgressBlock;
    [self dispatchCallback:^{
      downloadProgressBlock(length, total);
    }];
  }
}

- (void)URLRequest:(id)requestToken didCompleteWithError:(NSError *)error
{
  if (![self validateRequestToken:requestToken]) {
    return;
  }

  std::lock_guard<std::mutex> lock(_mutex);
  _status = RCTNetworkTaskFinished;
  if (_completionBlock) {
    RCTURLRequestCompletionBlock completionBlock = _completionBlock;
    [self dispatchCallback:^{
      completionBlock(self->_response, self->_data, error);
    }];
  }

  [self invalidate];
}

@end
