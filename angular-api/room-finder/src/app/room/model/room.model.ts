export class Room {
    price: string;
    image: [string];
    numberOfRoom: number;
    carParking: boolean;
    bikeParking: boolean;
    address: string;
    minPrice: number;
    maxPrice: number;
    constructor(details: any) {
        this.price = details.price || '';
        this.image = details.image;
        this.numberOfRoom = details.numberOfRoom || '';
        this.carParking = details.carParkings;
        this.bikeParking = details.bikeParking;
        this.address = details.address || '';
        this.minPrice = details.minPrice;
        this.maxPrice = details.maxPrice;
    }
}