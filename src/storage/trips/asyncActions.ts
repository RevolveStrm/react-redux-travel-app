import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITrip } from "./types.ts";
import { RootState } from "../store.ts";

export const fetchTrips= createAsyncThunk<ITrip[] | undefined, void, {state: RootState}>(
    'trips/fetchTrips', async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState;

        const response = await fetch('https://travel-app-api.up.railway.app/api/v1/trips', {
            headers: {
                'Authorization': `Bearer ${state.auth.token}`
            }
        }).then(res => res.json());

        if (response?.error) {
            throw new Error(response.message);
        }
        return await response as ITrip[];
    } catch (e) {
        if (e instanceof Error) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
});

export const fetchTripById= createAsyncThunk<ITrip | undefined, string, {state: RootState}>(
    'trips/fetchTripById', async (tripId: string, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;

            const response = await fetch(`https://travel-app-api.up.railway.app/api/v1/trips/${tripId}`, {
                headers: {
                    'Authorization': `Bearer ${state.auth.token}`
                }
            }).then(res => res.json());

            if (response?.error) {
                throw new Error(response.message);
            }
            return await response as ITrip;
        } catch (e) {
            if (e instanceof Error) {
                return thunkAPI.rejectWithValue(e.message);
            }
        }
});