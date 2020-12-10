export class Room {
    price: string;
    user: string;
    image: [string];
    numberOfRoom: number;
    carParking: boolean;
    bikeParking: boolean;
    address: string;
    _id: string;
    constructor(details: any) {
        this.price = details.price || '';
        this.user = details.user || '';
        this.image = details.image || '';
        this.numberOfRoom = details.numberOfRoom || '';
        this.carParking = details.carParking || '';
        this.bikeParking = details.bikeParking || '';
        this.address = details.address || '';
        this._id = details._id || '';
    }
}