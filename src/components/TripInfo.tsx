import React, { useState } from "react";
import BookTripModal from "./modals/BookTripModal.tsx";
import {BookingModalData, BookingStatus} from "../storage/bookings/types.ts";
import {ITrip} from "../storage/trips/types.ts";
import {RootState, useAppDispatch} from "../storage/store.ts";
import {useSelector} from "react-redux";
import {bookTrip} from "../storage/bookings/asyncActions.ts";
import {toast} from "react-toastify";
import {resetBookTripStatus} from "../storage/bookings/slice.ts";

interface TripInfoProps {
    trip: ITrip;
}

const TripInfo: React.FC<TripInfoProps> = ({ trip }) => {
    const dispatch = useAppDispatch();
    const { bookTripStatus, bookTripError } = useSelector((state: RootState) => state.bookings);
    const [modalVisibility, setModalVisibility] = useState(false);

    React.useEffect(() => {
        if (bookTripStatus === BookingStatus.SUCCESS) {
            toast.success(`Trip has been booked!`, {
                className: 'notification',
                hideProgressBar: true,
                autoClose: 2000,
            });
            dispatch(resetBookTripStatus(''));
        } else if (bookTripStatus === BookingStatus.ERROR) {
            toast.error(bookTripError, {
                className: 'notification',
                hideProgressBar: true,
                autoClose: 2000,
            });
        }
    }, [bookTripStatus]);

    const handleModalOpen = () => {
        setModalVisibility(true);
    };

    const handleModalClose = () => {
        setModalVisibility(false);
    };

    const handleModalSubmit = (bookingData: BookingModalData) => {
        dispatch(bookTrip(bookingData));
    };

    return (
        <>
            <div className="trip">
                <img
                    data-test-id="trip-details-image"
                    src={trip.image}
                    className="trip__img"
                    alt="trip photo"
                />
                <div className="trip__content">
                    <div className="trip-info">
                        <h3 data-test-id="trip-details-title" className="trip-info__title">
                            {trip.title}
                        </h3>
                        <div className="trip-info__content">
              <span
                  data-test-id="trip-details-duration"
                  className="trip-info__duration"
              >
                <strong>{trip.duration}</strong> days
              </span>
                            <span
                                data-test-id="trip-details-level"
                                className="trip-info__level"
                            >
                {trip.level}
              </span>
                        </div>
                    </div>
                    <div
                        data-test-id="trip-details-description"
                        className="trip__description"
                    >
                        {trip.description}
                    </div>
                    <div className="trip-price">
                        <span>Price</span>
                        <strong
                            data-test-id="trip-details-price-value"
                            className="trip-price__value"
                        >
                            {trip.price} $
                        </strong>
                    </div>
                    <button
                        data-test-id="trip-details-button"
                        className="trip__button button"
                        onClick={handleModalOpen}
                    >
                        Book a trip
                    </button>
                </div>
            </div>
            <BookTripModal
                trip={trip}
                isOpen={modalVisibility}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
            />
        </>
    );
};

export default TripInfo;