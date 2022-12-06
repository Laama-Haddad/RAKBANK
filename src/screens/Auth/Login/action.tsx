import {store} from '../../../redux/store';
import {setAuth} from './reducer';
import {AuthState} from '../../../resources/interfaces/screens/login';
import {services} from '../../../api';
import config from '../../../config';

export const setAuthStatus = ({logged, userInfo}: AuthState) => {
  store.dispatch(
    setAuth({
      logged,
      userInfo
    }),
  );
};
export const login = async form => {
  try {
    const res = await services.user.authenticate(form);
    console.log(res);
    if (res) {
      return res;
    } else {
      return {};
    }
  } catch (ex) {
    if (config.debug) {
      console.log(',ee', ex);
    }
  }
};
