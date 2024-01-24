import React from 'react';
import SelectFilter, {SelectFilterOption} from "./filters/SelectFilter.tsx";
import SearchFilter from "./filters/SearchFilter.tsx";

interface TripsFilterProps {
    searchChange: (value: string) => void;
    durationChange: (value: string) => void;
    levelChange: (value: string) => void;
}

const TripsFilter: React.FC<TripsFilterProps> = ({ searchChange, durationChange, levelChange }) => {
    const durationSelectOptions: SelectFilterOption[] = [
        {label: 'duration', value: ''},
        {label: '< 5 days', value: '0_x_5'},
        {label: '< 10 days', value: '5_x_10'},
        {label: '≥ 10 days', value: '10'},
    ]

    const levelSelectOptions: SelectFilterOption[] = [
        {label: 'level', value: ''},
        {label: 'easy', value: 'easy'},
        {label: 'moderate', value: 'moderate'},
        {label: 'difficult', value: 'difficult'},
    ]

    return (
        <section className="trips-filter">
            <h2 className="visually-hidden">Trips filter</h2>
            <form className="trips-filter__form" autoComplete="off">
                <SearchFilter onChange={searchChange}/>
                <SelectFilter
                    label='Search by duration'
                    name='duration'
                    testId='filter-duration'
                    options={durationSelectOptions}
                    onChange={durationChange}
                />
                <SelectFilter
                    label='Search by level'
                    name='level'
                    testId='filter-level'
                    options={levelSelectOptions}
                    onChange={levelChange}
                />
            </form>
        </section>
    );
};

export default TripsFilter;