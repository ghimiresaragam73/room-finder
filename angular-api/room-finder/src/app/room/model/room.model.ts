export class Room {
    price: string;
    image: [string];
    categories: string;
    numberOfRoom: number;
    carParking: boolean;
    bikeParking: boolean;
    address: string;
    minPrice: number;
    maxPrice: number;
    description: string;

    constructor(details: any) {
        this.price = details.price || '';
        this.image = details.image;
        this.numberOfRoom = details.numberOfRoom || '';
        this.carParking = details.carParking;
        this.bikeParking = details.bikeParking;
        this.address = details.address || '';
        this.minPrice = details.minPrice;
        this.maxPrice = details.maxPrice;
        this.categories = details.categories || '';
        this.description = details.description || '';
    }
}