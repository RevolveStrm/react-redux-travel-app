export const durationFilter = (value: number, filter: string) => {
    if (filter.includes('_')) {
        const [min, _, max] = filter.split('_');

        return value >= Number(min) && value <= Number(max);
    } else {
        const num = parseFloat(filter);

        return num <= value;
    }
}