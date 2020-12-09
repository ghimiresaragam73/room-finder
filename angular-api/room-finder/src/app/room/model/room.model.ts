export class Room {
    discription: string;
    price: number;
    image: [string];
    user: string;
    constructor(details: any) {
        this.discription = details.discription || '';
        this.price = details.price || '';
        this.image = details.image || '';
        this.user = details.user || '';
    }
}