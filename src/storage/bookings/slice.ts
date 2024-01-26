import {createSlice, Draft, PayloadAction, Slice} from "@reduxjs/toolkit";
import {BookingStatus, IBooking, InitialState} from "./types.ts";
import {bookTrip, cancelBooking, fetchUserBookings} from "./asyncActions.ts";

const initialState: InitialState = {
    list: [],
    listStatus: BookingStatus.EMPTY,
    listError: '',
    bookTripStatus: BookingStatus.EMPTY,
    bookTripError: '',
    cancelBookingStatus: BookingStatus.EMPTY,
    cancelBookingError: '',
}

export const slice: Slice<InitialState> = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        resetBookTripStatus(state: Draft<InitialState>): void {
            state.bookTripStatus = BookingStatus.EMPTY;
        },
        resetCancelTripStatus(state: Draft<InitialState>): void {
            state.cancelBookingStatus = BookingStatus.EMPTY;
        },
    },
    extraReducers: (builder): void => {
        builder.addCase(fetchUserBookings.pending, (state: Draft<InitialState>) => {
            state.listStatus = BookingStatus.LOADING;
            state.listError = '';
        })
        builder.addCase(fetchUserBookings.rejected, (state: Draft<InitialState>, action: PayloadAction<any>): void => {
            state.listStatus = BookingStatus.ERROR;
            state.listError = action.payload;
        })
        builder.addCase(fetchUserBookings.fulfilled, (state: Draft<InitialState>, action: PayloadAction<IBooking[] | undefined>): void => {
            state.listStatus = BookingStatus.SUCCESS;

            if (action.payload?.length) {
                state.list = action.payload;
            }
        });

        builder.addCase(bookTrip.pending, (state: Draft<InitialState>): void => {
            state.bookTripStatus = BookingStatus.LOADING;
            state.bookTripError = '';
        })
        builder.addCase(bookTrip.rejected, (state: Draft<InitialState>, action: PayloadAction<any>): void => {
            state.bookTripStatus = BookingStatus.ERROR;
            state.bookTripError = action.payload;
        })
        builder.addCase(bookTrip.fulfilled, (state: Draft<InitialState>): void => {
            state.bookTripStatus = BookingStatus.SUCCESS;
        });

        builder.addCase(cancelBooking.pending, (state: Draft<InitialState>): void => {
            state.cancelBookingStatus = BookingStatus.LOADING;
            state.cancelBookingError = '';
        })
        builder.addCase(cancelBooking.rejected, (state: Draft<InitialState>, action: PayloadAction<any>): void => {
            state.cancelBookingStatus = BookingStatus.ERROR;
            state.cancelBookingError = action.payload;
        })
        builder.addCase(cancelBooking.fulfilled, (state: Draft<InitialState>): void => {
            state.cancelBookingStatus = BookingStatus.SUCCESS;
        });
    }
});

export const { resetBookTripStatus, resetCancelTripStatus } = slice.actions;

export default slice.reducer;