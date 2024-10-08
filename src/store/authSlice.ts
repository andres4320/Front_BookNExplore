import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../services/Api';

interface IUser {
    id: number;
    name: string;
    email: string;
}

type AuthState = {
    token: string | null;
    user: null | IUser;
    isLogin: boolean;
    isLoading: boolean;
}

const initialState: AuthState = {
    token: null,
    user: null,
    isLogin: false,
    isLoading: false,
}

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data: any) => {
        // async (data: any, thunkAPI) => {
        const response = await Api.post("auth/login", data);
        if (response.statusCode === 200) {
            window.localStorage.setItem("token", response.data.token);
            return response.data;
        }

        throw new Error("Error");
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (data: any, thunkApi) => {
        const response = await Api.post("auth/register", data);
        if (response.statusCode === 201) {
            window.localStorage.setItem("token", response.data.token);
            return response.data;
        }
        return thunkApi.rejectWithValue(response.data);
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder
            .addCase(loginUser.pending, (state: AuthState, action: any) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state: AuthState, action: any) => {
                state.isLoading = false;
                state.isLogin = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state: AuthState, action: any) => {
                state.isLoading = false;
                state.isLogin = false;
                state.token = null;
                state.user = null;
            })
            .addCase (registerUser.pending, (state: AuthState, action: any) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state: AuthState, action: any) => {
                state. isLoading = false;
                state.isLogin = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase (registerUser.rejected, (state: AuthState, action: any) => {
                state.isLoading = false;
                state.isLogin = false;
                state.token = null;
                state.user = null;
            });
    },
});


export default authSlice.reducer;