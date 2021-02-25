import { AppRegistry, YellowBox } from 'react-native';
import App from './src/Root';;
import { name as appName } from './app.json';
//import AppContainer from './src';

// 关闭远程调式非独立窗口的⚠️
//YellowBox.ignoreWarnings(['Remote debugger']);
export default App;
AppRegistry.registerComponent(appName, () => App);