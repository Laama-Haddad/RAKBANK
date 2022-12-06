import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState} from '../../../resources/interfaces/screens/login';
import {UserInfo} from '../../../resources/interfaces/userInfo';

const initialState: AuthState = {
  logged: false,
  userInfo: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{logged: boolean; userInfo: UserInfo}>,
    ) => {
      state.logged = action.payload.logged;
      state.userInfo = action.payload.userInfo;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setAuth} = authSlice.actions;

export default authSlice.reducer;
