import data from '../assets/data/trips.json';

export interface ITrip {
    "id": string;
    "title": string;
    "description": string;
    "level": string;
    "duration": number;
    "price": number;
    "image": string;
    "createdAt": string;
}

export class TripsStorage {
    public static getAll(): ITrip[] {
        return data as ITrip[];
    }
}