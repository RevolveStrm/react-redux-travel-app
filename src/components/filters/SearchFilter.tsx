import React from 'react';

interface SearchFilterProps {
    onChange: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onChange }) => {
    const [currentSearch, setCurrentSearch] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.target.value;
        setCurrentSearch(value);
        onChange(value);
    }

    return (
        <label className="trips-filter__search input">
            <span className="visually-hidden">Search by name</span>
            <input
                data-test-id="filter-search"
                name="search"
                type="search"
                value={currentSearch}
                onChange={handleChange}
                placeholder="search by title"
            />
        </label>
    );
};

export default SearchFilter;