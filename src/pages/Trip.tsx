import { useParams } from "react-router-dom";
import {ITrip, TripsStorage} from "../storage/trips.ts";
import TripInfo from "../components/TripInfo.tsx";

const Trip = () => {
    const params = useParams();
    const trips: ITrip[] = TripsStorage.getAll();
    const trip: ITrip | undefined = trips.find(el => el.id === params.tripId);

    return (
        <main className="trip-page">
            {trip ? <TripInfo trip={trip}/> : <h1>Sorry, trip doesn't exist.</h1>}
        </main>
    );
};

export default Trip;