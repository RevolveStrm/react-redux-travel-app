export interface InitialState {
    list: ITrip[];
    status: TripsStatus
}

export enum TripsStatus {
    EMPTY = '',
    SUCCESS = 'success',
    LOADING = 'loading',
    ERROR = 'error',
}

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