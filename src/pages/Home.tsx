import React from 'react';
import TripsFilter from "../components/TripsFilter.tsx";
import Trips from "../components/Trips.tsx";
import {durationFilter} from "../utils/durationFilter.ts";
import {useSelector} from "react-redux";
import {ITrip} from "../storage/trips/types.ts";
import {fetchTrips} from "../storage/trips/asyncActions.ts";
import {RootState, useAppDispatch} from "../storage/store.ts";

const Home = () => {
    const dispatch = useAppDispatch();
    const trips: ITrip[] = useSelector((state: RootState) => state.trips.list);

    const [currentSearch, setCurrentSearch] = React.useState<string>('');
    const [currentDuration, setCurrentDuration] = React.useState<string>('');
    const [currentLevel, setCurrentLevel] = React.useState<string>('');

    React.useEffect(() => {
        dispatch(fetchTrips());
    }, []);

    const handleSearchChange = (value: string) => {
        setCurrentSearch(value);
    };
    const handleDurationChange = (value: string) => {
        setCurrentDuration(value);
    };
    const handleLevelChange = (value: string) => {
        setCurrentLevel(value);
    };

    const filteredBySearch = currentSearch ?
        trips.filter((el: ITrip) => el.title.includes(currentSearch)) : trips;
    const filteredByDuration = currentDuration ?
        filteredBySearch.filter((el: ITrip) => durationFilter(el.duration, currentDuration)) : filteredBySearch;
    const filteredByLevel = currentLevel ?
        filteredByDuration.filter((el: ITrip) => el.level === currentLevel) : filteredByDuration;

    return (
        <main>
            <h1 className="visually-hidden">Travel App</h1>
            <TripsFilter
                searchChange={handleSearchChange}
                durationChange={handleDurationChange}
                levelChange={handleLevelChange}/>
            <Trips trips={filteredByLevel}/>
        </main>
    );
};

export default Home;