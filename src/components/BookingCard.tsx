import React from 'react';
import { IBooking } from "../storage/bookings.ts";

interface BookingCardProps {
    booking: IBooking;
    handleCancel: (id: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, handleCancel }) => {
    return (
        <li data-test-id="booking" className="booking">
            <h3 data-test-id="booking-title" className="booking__title">{booking.trip.title}</h3>
            <span data-test-id="booking-guests" className="booking__guests">
            {booking.guests} {booking.guests > 1 ? 'guests' : 'guest'}
          </span>
            <span data-test-id="booking-date" className="booking__date">
            {booking.date}
          </span>
            <span data-test-id="booking-total" className="booking__total">
            {booking.totalPrice} $
          </span>
            <button
                data-test-id="booking-cancel"
                className="booking__cancel"
                title="Cancel booking"
                onClick={() => handleCancel(booking.id)}
            >
                <span className="visually-hidden">Cancel booking</span>
                ×
            </button>
        </li>
    );
};

export default BookingCard;