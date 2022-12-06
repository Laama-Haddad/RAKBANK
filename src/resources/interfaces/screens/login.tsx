import {NavigationProp} from '@react-navigation/native';
import {UserInfo} from '../userInfo';

export interface AuthState {
  logged: boolean;
  userInfo: UserInfo | {};
}

export interface LoginProps {
  navigation?: NavigationProp<any>;
  auth: AuthState;
}
