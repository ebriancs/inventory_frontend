import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API, { setAuthToken } from '../../api';

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

export const loginAsync = createAsyncThunk('auth/login', async (payload: { username: string; password: string }, { rejectWithValue }) => {
  try {
    const res = await API.post('/login/', payload);
    console.log('authSlice -> loginAsync:', res);
    return res.data.access;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.detail || 'Login failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem('token');
      setAuthToken(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
        setAuthToken(action.payload);
        state.loading = false;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
