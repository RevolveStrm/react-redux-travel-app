import { useParams } from "react-router-dom";
import TripInfo from "../components/TripInfo.tsx";
import {ITrip} from "../storage/trips/types.ts";
import {useSelector} from "react-redux";

const Trip = () => {
    const params = useParams();
    const trips: ITrip[] = useSelector((state: any) => state.trips.list)
    const trip: ITrip | undefined = trips.find(el => el.id === params.tripId);

    return (
        <main className="trip-page">
            {trip ? <TripInfo trip={trip}/> : <h1>Sorry, trip doesn't exist.</h1>}
        </main>
    );
};

export default Trip;