import React from 'react';
import {BookingStorage, IBooking} from "../storage/bookings.ts";
import BookingCard from "../components/BookingCard.tsx";

const Bookings = () => {
    const [bookings, setBookings] = React.useState<IBooking[]>(BookingStorage.getAll());

    const handleBookingCancel = (id: string) => {
        BookingStorage.removeBooking(id);
        setBookings(BookingStorage.getAll());
    }

    return (
        <main className="bookings-page">
            <ul className="bookings__list">
                { bookings.length ?
                    bookings.map(el => <BookingCard booking={el} key={el.id} handleCancel={handleBookingCancel}/>) :
                    "Unfortunately, you booked nothing :("
                }
            </ul>
        </main>
    );
};

export default Bookings;