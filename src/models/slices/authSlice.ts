import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    profile: {
      username: '',
      token: ''
    }
  },
  reducers: {
    setToken: (state, action) => {
      state.profile.token = action.payload;
    },
    setUsername: (state, action) => {
      state.profile.username = action.payload;
    },
    clearProfile: state => {
      state.profile.token = '';
      state.profile.username = '';
    }
  }
});

export default authSlice.reducer;
export const {
  clearProfile,
  setToken,
  setUsername
} = authSlice.actions