import React from 'react';
import TripCard from "./TripCard.tsx";
import {ITrip} from "../storage/trips/types.ts";

interface TripsProps {
    trips: ITrip[];
}

const Trips: React.FC<TripsProps> = ({ trips }) => {
    return (
        <section className="trips">
            <h2 className="visually-hidden">Trips List</h2>
            <ul className="trip-list">
                {   trips?.length ?
                    trips.map(el => <TripCard key={el.id} trip={el}/>) :
                    <h4>Couldn't find any trips. Please, check your filters.</h4>
                }
            </ul>
        </section>
    );
};

export default Trips;