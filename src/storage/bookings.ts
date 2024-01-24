import data from '../assets/data/bookings.json';
import {ITrip} from "./trips.ts";

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
    guestsCount: number,
    totalPrice: number,
    pickedDate: string
}

export class BookingStorage {
    private static list: IBooking[] = data;

    public static getAll(): IBooking[] {
        return this.list;
    }

    public static createNewBooking(trip: ITrip, bookingData: BookingModalData): void {
        try {
            const booking: IBooking = {
                "id": '',
                "userId": '',
                "tripId": trip.id,
                "guests": bookingData.guestsCount,
                "date": bookingData.pickedDate,
                "trip": {
                    "title": trip.title,
                    "duration": trip.duration,
                    "price": trip.price,
                },
                "totalPrice": bookingData.totalPrice,
                "createdAt": Date.now().toString()
            }

            this.list.push(booking);

            console.log(booking);
        } catch (e) {
            console.error(`There was an error while creating new booking.`);
            console.error(e);
        }
    }

    public static removeBooking(bookingId: string): void {
        this.list = this.list.filter((el: IBooking) => el.id !== bookingId);
    }
}