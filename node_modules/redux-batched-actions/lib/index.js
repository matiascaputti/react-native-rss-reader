'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.batchActions = batchActions;
exports.enableBatching = enableBatching;
var BATCH = exports.BATCH = 'BATCHING_REDUCER.BATCH';

function batchActions(actions) {
	return { type: BATCH, payload: actions };
}

function enableBatching(reduce) {
	return function batchingReducer(state, action) {
		switch (action.type) {
			case BATCH:
				return action.payload.reduce(batchingReducer, state);
			default:
				return reduce(state, action);
		}
	};
}