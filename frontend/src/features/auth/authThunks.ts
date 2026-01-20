import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../api/authApi";
import { checkAuth } from "../../api/authApi";
interface LoginPayload {
  email: string;
  password: string;
}

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const data = await loginUser(payload);
      return data; // { token, user? }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const checkAuthThunk = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const data = await checkAuth();
      return data;
    } catch {
      return rejectWithValue("Not authenticated");
    }
  }
);