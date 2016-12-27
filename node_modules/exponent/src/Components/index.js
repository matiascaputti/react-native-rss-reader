export AppLoading from './AppLoading';
export BarCodeScanner from './BarCodeScanner';
export BlurView from './BlurView';
export LinearGradient from './LinearGradient';
export MapView from 'react-native-maps';
export Video from './Video';

import * as SvgModules from 'react-native-svg';
let { Svg } = SvgModules;
for (let key in SvgModules) {
  if (key !== 'default' && key !== 'Svg') {
    Svg[key] = SvgModules[key];
  }
}
export { Svg };
