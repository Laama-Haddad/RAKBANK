import React, {forwardRef, useRef, useState} from 'react';
import {Platform, Text, TextInput, View} from 'react-native';
import {TextInputProps} from '../../resources/interfaces/components/genericTextInput';
import {getByScreenSize} from '../../utils/responsive';
import Icon from 'react-native-vector-icons/Entypo';
import styles from './styles';

const GenericTextInput = forwardRef(
  (
    {
      containerStyle,
      labelStyle,
      inputStyle,
      label,
      secureTextEntry,
      keyboardType,
      returnKeyType,
      noEye,
      showLabel,
      ...props
    }: TextInputProps,
    ref,
  ) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const keyboardTypeIOS = useRef(
      Platform.OS === 'ios' && keyboardType === 'decimal-pad'
        ? 'decimal-pad-ios'
        : keyboardType,
    );
    const withEye = !noEye && secureTextEntry;
    return (
      <View style={[styles.container, containerStyle]}>
        {showLabel && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <TextInput
          {...props}
          selectionColor={'#555555'}
          ref={ref}
          returnKeyType={returnKeyType || 'done'}
          keyboardType={keyboardTypeIOS.current}
          style={[styles.textInput,inputStyle]}
          placeholderTextColor={'#dddddd'}
          secureTextEntry={withEye && !passwordVisible}
        />
        {withEye && (
          <Icon
            name={passwordVisible ? 'eye' : 'eye-with-line'}
            color={'#aaaaaa'}
            size={getByScreenSize(20, 35)}
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.icon}
          />
        )}
      </View>
    );
  },
);
export default GenericTextInput;
