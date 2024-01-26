import {createSlice, Draft, PayloadAction, Slice } from "@reduxjs/toolkit";
import {getAuthenticatedUser, signIn, signUp} from "./asyncActions.ts";
import {GetAuthenticatedUserResponse, InitialState, SignInResponse, SignUpResponse} from "./types.ts";

const initialState: InitialState = {
    token: null,
    user: null,
    loading: false,
    error: null
}

export const slice: Slice<InitialState> = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state: Draft<InitialState>) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        setToken: (state: Draft<InitialState>, action: PayloadAction<string>): void => {
            state.token = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.pending, (state: Draft<InitialState>) => {
                state.loading = true;
            })
        builder.addCase(signUp.rejected, (state: Draft<InitialState>, action: PayloadAction<SignUpResponse>) => {
                state.loading = false;
                state.error = action.payload;
                localStorage.removeItem('token');
            })
        builder.addCase(signUp.fulfilled, (state: Draft<InitialState>, action: PayloadAction<SignUpResponse>) => {
                state.loading = false;
                state.error = null;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })

        builder.addCase(signIn.pending, (state: Draft<InitialState>) => {
                state.loading = true;
            })
        builder.addCase(signIn.rejected, (state: Draft<InitialState>, action: PayloadAction<SignInResponse>) => {
                state.loading = false;
                state.error = action.payload;
                localStorage.removeItem('token');
            })
        builder.addCase(signIn.fulfilled, (state: Draft<InitialState>, action: PayloadAction<SignInResponse>) => {
                state.loading = false;
                state.error = null;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })

        builder.addCase(getAuthenticatedUser.pending, (state: Draft<InitialState>) => {
            state.loading = true;
        })
        builder.addCase(getAuthenticatedUser.rejected, (state: Draft<InitialState>, action: PayloadAction<GetAuthenticatedUserResponse>) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload;
        })
        builder.addCase(getAuthenticatedUser.fulfilled, (state: Draft<InitialState>, action: PayloadAction<GetAuthenticatedUserResponse>) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload;
        })
    }
});

export const { setToken, logout} = slice.actions;

export default slice.reducer;