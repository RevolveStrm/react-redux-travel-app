import {configureStore, Store, ThunkDispatch} from "@reduxjs/toolkit";
import authReducer from './auth/slice.ts';
import tripsReducer from './trips/slice.ts';
import bookingsReducer from './bookings/slice.ts';
import {useDispatch} from "react-redux";

const store: Store = configureStore({
    reducer: {
        trips: tripsReducer,
        auth: authReducer,
        bookings: bookingsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch & ThunkDispatch<any, any, any>;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;