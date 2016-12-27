/**
 * @providesModule Exponent
 * @flow
 */

import {
  NativeModules,
} from 'react-native';

// this is done for the side effects
import './Logs';

module.exports = {
  // constants
  get Amplitude() { return NativeModules.ExponentAmplitude; },
  get Crypto() { return NativeModules.ExponentCrypto; },
  get Fabric() { return NativeModules.ExponentFabric; },
  get Facebook() { return NativeModules.ExponentFacebook; },
  get FileSystem() { return NativeModules.ExponentFileSystem; },
  get ImageCropper() { return NativeModules.ExponentImageCropper; },
  get Segment() { return NativeModules.ExponentSegment; },
  get Util() { return NativeModules.ExponentUtil; },

  // defaults
  get apisAreAvailable() { return require('./apisAreAvailable').default; },
  get createTHREEViewClass() { return require('./createTHREEViewClass').default; },
  get registerRootComponent() { return require('./registerRootComponent').default; },
  get takeSnapshotAsync() { return require('./takeSnapshotAsync').default; },
  get Asset() { return require('./Asset').default; },
  get Accelerometer() { return require('./Accelerometer').default; },
  get GLView() { return require('./GLView').default; },
  get Gyroscope() { return require('./Gyroscope').default; },
  get Notifications() { return require('./Notifications').default; },

  // globs
  get Components() { return require('./Components'); },
  get Constants() { return require('./Constants'); },
  get Contacts() { return require('./Contacts'); },
  get Font() { return require('./Font'); },
  get Google() { return require('./Google'); },
  get ImagePicker() { return require('./ImagePicker'); },
  get Location() { return require('./Location'); },
  get Logs() { return require('./Logs'); },
  get Permissions() { return require('./Permissions'); },
};

if (global) {
  global.__exponent = module.exports;
}
