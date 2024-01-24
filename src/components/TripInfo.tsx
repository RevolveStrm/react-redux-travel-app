import React, { useState } from "react";
import { ITrip } from "../storage/trips.ts";
import BookTripModal from "./modals/BookTripModal.tsx";
import { BookingModalData, BookingStorage } from "../storage/bookings.ts";

interface TripInfoProps {
    trip: ITrip;
}

const TripInfo: React.FC<TripInfoProps> = ({ trip }) => {
    const [modalVisibility, setModalVisibility] = useState(false);

    const handleModalOpen = () => {
        setModalVisibility(true);
    };

    const handleModalClose = () => {
        setModalVisibility(false);
    };

    const handleModalSubmit = (bookingData: BookingModalData) => {
        BookingStorage.createNewBooking(trip, bookingData);
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