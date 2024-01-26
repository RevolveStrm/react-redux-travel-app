// @ts-ignore
import { RejectedWithValueActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";

export interface InitialState {
    token: string | null;
    user: UserData | null;
    loading: boolean;
    error: string | null;
}

export type UserData = {
    createdAt: string;
    email: string;
    fullName: string;
    id: string;
}

export type AuthResponse = {
    token: string;
    user: UserData;
};

export type SignInData = {
    email: string;
    password: string;
}

export type SignUpData = SignInData & {
    fullName: string;
}

export type SignUpResponse = AuthResponse | RejectedWithValueActionFromAsyncThunk<string>;

export type SignInResponse = SignUpResponse;

export type GetAuthenticatedUserResponse = UserData | RejectedWithValueActionFromAsyncThunk<string>;
