/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
// @ts-ignore

import React, {useEffect} from 'react';
import AppNavigator from './router';
import {store} from './redux/store';
import {Provider} from 'react-redux';
import {Platform, StatusBar, StatusBarStyle, UIManager} from 'react-native';
import {getLocalData} from './utils/storage';
import {keys} from './api/keys';
import {setAuthStatus} from './screens/Auth/Login/action';

const STYLES: StatusBarStyle[] = ['default', 'dark-content', 'light-content'];
const TRANSITIONS: any = ['fade', 'slide', 'none'];

const App = () => {
  const copyDataFromLocalToReducer = async () => {
    let res = await getLocalData(keys.AUTH);
    setAuthStatus({
      logged: res?.logged ? res?.logged : false,
      userInfo: res?.userInfo ? res?.userInfo : {},
    });
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    copyDataFromLocalToReducer().then();
  }, []);
  return (
    <Provider store={store}>
      <StatusBar
        animated
        translucent
        backgroundColor={'transparent'}
        barStyle={STYLES[2]}
        showHideTransition={TRANSITIONS[0]}
      />
      <AppNavigator />
    </Provider>
  );
};

export default App;
