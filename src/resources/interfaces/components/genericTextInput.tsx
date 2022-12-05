import {StyleProp, TextInputAndroidProps} from 'react-native';
export interface TextInputProps extends TextInputAndroidProps {
  containerStyle?: StyleProp<any> | StyleProp<any>[];
  labelStyle?: StyleProp<any> | StyleProp<any>[];
  inputStyle?: StyleProp<any> | StyleProp<any>[];
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: string;
  returnKeyType?: string;
  noEye?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onEndEditing?: (text: string) => void;
  maxLength?: number;
  multiline?: boolean;
  editable?: boolean;
  showLabel: boolean;
  onFocus: () => void;
  onBlur: () => void;
  autoFocus?:boolean;
}
