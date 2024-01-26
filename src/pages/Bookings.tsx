import BookingCard from "../components/BookingCard.tsx";
import {useSelector} from "react-redux";
import {BookingStatus, IBooking} from "../storage/bookings/types.ts";
import {RootState, useAppDispatch} from "../storage/store.ts";
import React from "react";
import {cancelBooking, fetchUserBookings} from "../storage/bookings/asyncActions.ts";
import {toast} from "react-toastify";
import Loader from "../components/Loader.tsx";
import { resetCancelTripStatus } from "../storage/bookings/slice.ts";

const Bookings = () => {
    const dispatch = useAppDispatch();
    const { list, listStatus, listError, cancelBookingStatus, cancelBookingError } =
        useSelector((state: RootState) => state.bookings);

    React.useEffect(() => {
        dispatch(fetchUserBookings());
    }, []);

    React.useEffect(() => {
        if (listStatus === BookingStatus.ERROR) {
            toast.error(listError, {
                className: 'notification',
                hideProgressBar: true,
                autoClose: 2000,
            });
        }
    }, [listStatus]);

    React.useEffect(() => {
        if (cancelBookingStatus === BookingStatus.SUCCESS) {
            toast.success('Trip has been canceled!', {
                className: 'notification',
                hideProgressBar: true,
                autoClose: 2000,
            });
            dispatch(resetCancelTripStatus(''));
            dispatch(fetchUserBookings());
        } else if (cancelBookingStatus === BookingStatus.ERROR) {
            toast.error(cancelBookingError, {
                className: 'notification',
                hideProgressBar: true,
                autoClose: 2000,
            });
        }
    }, [cancelBookingStatus]);

    const handleBookingCancel = (bookingId: string) => {
        dispatch(cancelBooking(bookingId));
    }

    return (
        <main className="bookings-page">
            <ul className="bookings__list">
                { listStatus === BookingStatus.LOADING ?
                    <Loader/> :
                    list.length ?
                    list.map((el: IBooking) => <BookingCard booking={el} key={el.id} handleCancel={handleBookingCancel}/>) :
                    "Unfortunately, you booked nothing :("
                }
            </ul>
        </main>
    );
};

export default Bookings;