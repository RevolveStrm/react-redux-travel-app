import {createAsyncThunk} from "@reduxjs/toolkit";
import {SignInData, SignUpData, AuthResponse, UserData, SignUpResponse, SignInResponse} from "./types.ts";
import {RootState} from "../store.ts";

export type ThunkAPIConfig = {
    state: RootState,
    rejectValue: string
};

export const signUp = createAsyncThunk<SignUpResponse, SignUpData, ThunkAPIConfig>(
    'auth/signUp', async (signUpData: SignUpData, thunkAPI) => {
    try {
        const response = await fetch('https://travel-app-api.up.railway.app/api/v1/auth/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signUpData),
        }).then(res => res.json());

        if (response?.error) {
            throw new Error(response.message);
        }
        return await response as AuthResponse;
    } catch (e) {
        if (e instanceof Error) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
});

export const signIn = createAsyncThunk<SignInResponse, SignInData, ThunkAPIConfig>(
    'auth/signIn', async (signInData: SignInData, thunkAPI) => {
        try {
            const response = await fetch('https://travel-app-api.up.railway.app/api/v1/auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signInData),
            }).then(res => res.json());

            if (response?.error) {
                throw new Error(response.message);
            }
            return await response as AuthResponse;
        } catch (e) {
            if (e instanceof Error) {
                return thunkAPI.rejectWithValue(e.message);
            }
        }
});

export const getAuthenticatedUser = createAsyncThunk<UserData | undefined, void, {state: RootState}>(
    'auth/getAuthenticatedUser', async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;

            const response = await fetch('https://travel-app-api.up.railway.app/api/v1/auth/authenticated-user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.auth.token}`
                }
            }).then(res => res.json());

            if (response?.error) {
                throw new Error(response.message);
            }
            return await response as UserData;
        } catch (e) {
            if (e instanceof Error) {
                return thunkAPI.rejectWithValue(e.message);
            }
        }
});