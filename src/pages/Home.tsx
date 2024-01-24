import React from 'react';
import TripsFilter from "../components/TripsFilter.tsx";
import Trips from "../components/Trips.tsx";
import {ITrip, TripsStorage} from "../storage/trips.ts";
import {durationFilter} from "../utils/durationFilter.ts";

const Home = () => {
    const trips = TripsStorage.getAll();

    const [currentSearch, setCurrentSearch] = React.useState<string>('');
    const [currentDuration, setCurrentDuration] = React.useState<string>('');
    const [currentLevel, setCurrentLevel] = React.useState<string>('');

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
        filteredBySearch.filter(el => durationFilter(el.duration, currentDuration)) : filteredBySearch;
    const filteredByLevel = currentLevel ?
        filteredByDuration.filter(el => el.level === currentLevel) : filteredByDuration;

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