import React from 'react';
import {getTomorrowDate} from "../../utils/getTomorrowDate.ts";
import {BookingModalData} from "../../storage/bookings/types.ts";
import {ITrip} from "../../storage/trips/types.ts";

interface BookTripModalProps {
    trip: ITrip;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (bookingData: BookingModalData) => void
}

const BookTripModal: React.FC<BookTripModalProps> = ({ trip, isOpen, onClose, onSubmit }) => {
    const [currentGuests, setCurrentGuests] = React.useState(1);
    const [currentDate, setCurrentDate] = React.useState('');

    const handleGuestsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = Number(event.target.value);
        setCurrentGuests(value);
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = event.target.value;
        setCurrentDate(value);
    }

    const handleModalSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClose();
        onSubmit({
            tripId: trip.id,
            guests: currentGuests,
            date: new Date(currentDate).toISOString()
        })
    }

    const totalValue: number = trip.price * currentGuests;

    return (
        <div hidden={!isOpen}>
            <div className="modal">
                <div data-test-id="book-trip-popup" className="book-trip-popup">
                    <button
                        data-test-id="book-trip-popup-close"
                        className="book-trip-popup__close"
                        onClick={() => onClose()}
                    >
                        ×
                    </button>
                    <form className="book-trip-popup__form" autoComplete="off">
                        <div className="trip-info">
                            <h3 data-test-id="book-trip-popup-title" className="trip-info__title">
                                {trip.title}
                            </h3>
                            <div className="trip-info__content">
                <span
                    data-test-id="book-trip-popup-duration"
                    className="trip-info__duration"
                >
                  <strong>{trip.duration}</strong> days
                </span>
                                <span
                                    data-test-id="book-trip-popup-level"
                                    className="trip-info__level"
                                >
                  {trip.level}
                </span>
                            </div>
                        </div>
                        <label className="input">
                            <span className="input__heading">Date</span>
                            <input
                                data-test-id="book-trip-popup-date"
                                name="date"
                                type="date"
                                value={currentDate}
                                min={getTomorrowDate()}
                                onChange={handleDateChange}
                                required
                            />
                        </label>
                        <label className="input">
                            <span className="input__heading">Number of guests</span>
                            <input
                                data-test-id="book-trip-popup-guests"
                                name="guests"
                                type="number"
                                min="1"
                                max="10"
                                value={currentGuests}
                                required
                                onChange={handleGuestsChange}
                            />
                        </label>
                        <span className="book-trip-popup__total">
              Total:
              <output
                  data-test-id="book-trip-popup-total-value"
                  className="book-trip-popup__total-value"
              >
                {totalValue}$
              </output>
            </span>
                        <button
                            data-test-id="book-trip-popup-submit"
                            className="button"
                            type="submit"
                            onClick={handleModalSubmit}
                        >
                            Book a trip
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookTripModal;
