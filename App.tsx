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

import React from 'react';
import {SafeAreaView} from 'react-native';
import Button from './src/components/Button';
import {wdp} from './src/utils/responsive';

const App = () => {
  return (
    <SafeAreaView style={{backgroundColor: 'white', paddingHorizontal: '10%'}}>
      <Button
        title={'Login With UserId'}
        titleColor={'white'}
        type={'solid'}
        buttonColor={'#3e3c3b'}
        buttonStyle={{width: wdp(70), marginVertical: 50}}
        onPress={() => console.log('Sign In')}
      />
      <Button
        buttonStyle={{width: wdp(30), marginVertical: 50}}
        title={'Register'}
        titleColor={'red'}
        type={'outline'}
        buttonColor={'red'}
        onPress={() => console.log('register')}
      />
    </SafeAreaView>
  );
};

export default App;
