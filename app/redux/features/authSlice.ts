import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN'; 
}

interface AuthState {
  user: IUser | null;
  token: string | null; 
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: IUser | null; token: string | null }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;