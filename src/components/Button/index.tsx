import React from 'react';
import {ButtonProps} from '../../resources/interfaces/components/button';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {getByScreenSize} from '../../utils/responsive';

const Button = ({
  type,
  buttonColor,
  title,
  titleColor,
  titleStyle,
  buttonStyle,
  onPress,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        type === 'solid' && {
          backgroundColor: buttonColor,
          borderRadius: getByScreenSize(55, 80) / 2,
        },
        type === 'outline' && {
          borderColor: buttonColor,
          borderWidth: getByScreenSize(2, 2.2),
          borderRadius: getByScreenSize(20, 30),
        },
        styles.container,
        buttonStyle,
      ]}
      onPress={onPress}>
      <Text style={[{color: titleColor}, styles.title, titleStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
