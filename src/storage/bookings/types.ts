export interface IBooking {
    "id": string;
    "userId": string;
    "tripId": string;
    "guests": number;
    "date": string;
    "trip": {
        "title": string;
        "duration": number;
        "price": number;
    },
    "totalPrice": number;
    "createdAt": string;
}

export type BookingModalData = {
    tripId: string,
    guests: number,
    date: string
}

export type BookTripBody = {
    "tripId": string;
    "userId": string;
    "guests": number;
    "date": string; // ISO string
}

export enum BookingStatus {
    EMPTY = '',
    SUCCESS = 'success',
    LOADING = 'loading',
    ERROR = 'error',
}

export interface InitialState {
    list: IBooking[],
    listStatus: BookingStatus,
    listError: string | null,
    bookTripStatus: BookingStatus,
    bookTripError: string | null,
    cancelBookingStatus: BookingStatus,
    cancelBookingError: string | null
}