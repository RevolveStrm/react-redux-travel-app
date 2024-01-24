import React from 'react';

export interface SelectFilterOption {
    value: string | number;
    label: string;
}

export interface SelectFilterProps {
    label: string;
    name: string;
    options: SelectFilterOption[];
    testId: string;
    onChange: (value: string) => void;
}

const SelectFilter: React.FC<SelectFilterProps> = ({ label, name, options, testId, onChange }) => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };

    return (
        <label className="select">
            <span className="visually-hidden">{label}</span>
            <select data-test-id={testId} name={name} onChange={handleChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default SelectFilter;
