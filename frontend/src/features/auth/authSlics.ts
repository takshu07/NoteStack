import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, checkAuthThunk } from "./authThunks";

interface AuthState {
  loading: boolean;
  error: string | null;
  isAuthChecked: boolean; // ✅ important for refresh handling
}

const initialState: AuthState = {
  loading: false,
  error: null,
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthChecked = true;
      // backend clears cookie
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- LOGIN ---------- */
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthChecked = true;
        // Save user to storage
        if (action.payload?.user) {
           localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthChecked = true;
      })

      /* ---------- CHECK AUTH ---------- */
      .addCase(checkAuthThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthChecked = true;
        // Sync user from backend check
        if (action.payload?.user) {
           localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(checkAuthThunk.rejected, (state) => {
        state.loading = false;
        state.isAuthChecked = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
