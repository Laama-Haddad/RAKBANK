import {setLocalData} from './storage';
import {keys} from '../api/keys';
import {AuthState} from '../resources/interfaces/screens/login';
import {setAuthStatus} from '../screens/Auth/Login/action';

export const ToggleAuth = async ({logged, userInfo}: AuthState) => {
  if (logged) {
    setAuthStatus({logged, userInfo});
    await setLocalData(keys.AUTH, {logged, userInfo});
  }
};
