import {ActionReducerMapBuilder, createSlice, Draft, PayloadAction, Slice} from "@reduxjs/toolkit";
import {InitialState, ITrip, TripsStatus} from "./types.ts";
import {fetchTrips} from "./asyncActions.ts";

const initialState: InitialState = {
    list: [],
    status: TripsStatus.EMPTY
};

export const slice: Slice<InitialState> = createSlice({
    name: 'trips',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<InitialState>) => {
        builder
            .addCase(fetchTrips.pending, (state: Draft<InitialState>): void => {
            state.status = TripsStatus.LOADING;
            })
            .addCase(fetchTrips.fulfilled, (state: Draft<InitialState>, action: PayloadAction<ITrip[] | undefined>): void => {
                state.status = TripsStatus.SUCCESS;

                if (action.payload?.length) {
                    state.list = action.payload;
                }
            })
            .addCase(fetchTrips.rejected, (state: Draft<InitialState>): void => {
                state.status = TripsStatus.ERROR;
            });
    }
});

export default slice.reducer;