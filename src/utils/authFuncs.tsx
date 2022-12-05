import {setLocalData} from './storage';
import {keys} from '../api/keys';
import {AuthState} from '../resources/interfaces/screens/login';
import {setAuthStatus} from '../screens/Login/action';

export const ToggleAuth = async (auth: AuthState) => {
  if (auth) {
    setAuthStatus(auth);
    await setLocalData(keys.AUTH, auth);
  }
};
