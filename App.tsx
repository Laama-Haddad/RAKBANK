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

import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import Button from './src/components/Button';
import {wdp} from './src/utils/responsive';
import GenericTextInput from './src/components/GenericTextInput';

const App = () => {
  const [showLabel, setShowLabel] = useState(false);
  const [value, setValue] = useState('');
  const refInput = React.useRef(null);

  return (
    <SafeAreaView style={{backgroundColor: 'red', alignItems: 'center'}}>
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
      <GenericTextInput
        placeholder={showLabel ? ' ' : 'password'}
        ref={refInput}
        onFocus={() => {
          setShowLabel(true);
        }}
        onBlur={() => {
          setShowLabel(false);
        }}
        value={value}
        onChangeText={text => setValue(text)}
        onEndEditing={value =>
          value === '' ? setShowLabel(false) : setShowLabel(true)
        }
        showLabel={showLabel}
        secureTextEntry
        label={'password'}
        containerStyle={{width: wdp(90), marginVertical: 10}}
      />
    </SafeAreaView>
  );
};

export default App;
