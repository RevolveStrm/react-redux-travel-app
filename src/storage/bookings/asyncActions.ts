import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import {BookingModalData, BookTripBody, IBooking} from "./types.ts";

export const fetchUserBookings = createAsyncThunk(
    'bookings/fetchUserBookings',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;

            const response = await fetch('https://travel-app-api.up.railway.app/api/v1/bookings', {
                headers: {
                    'Authorization': `Bearer ${state.auth.token}`
                }
            }).then(res => res.json());

            if (response?.error) {
                throw new Error(response.message);
            }
            return await response as IBooking[];
        } catch (e) {
            if (e instanceof Error) {
                return thunkAPI.rejectWithValue(e.message);
            }
        }
    }
);

export const bookTrip = createAsyncThunk(
    'bookings/bookTrip',
    async (data: BookingModalData, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;

            const body: BookTripBody = {
                "tripId": data.tripId,
                "userId": state.auth.user.id,
                "guests": data.guests,
                "date": data.date
            };
            const response = await fetch('https://travel-app-api.up.railway.app/api/v1/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.auth.token}`
                },
                body: JSON.stringify(body)
            }).then(res => res.json());

            if (response?.error) {
                throw new Error(response.message);
            }
            return response;
        } catch (e) {
            if (e instanceof Error) {
                return thunkAPI.rejectWithValue(e.message);
            }
        }
    }
);

export const cancelBooking = createAsyncThunk(
    'bookings/cancelBooking',
    async (bookingId: string, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;

            const response = await fetch(`https://travel-app-api.up.railway.app/api/v1/bookings/${bookingId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${state.auth.token}`
                }
            }).then(res => res.json());

            if (response?.error) {
                throw new Error(response.message);
            }
            return response;
        } catch (e) {
            if (e instanceof Error) {
                return thunkAPI.rejectWithValue(e.message);
            }
        }
    }
);