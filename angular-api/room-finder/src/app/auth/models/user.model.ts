export class User {
    name: string;
    username: string;
    password: string;
    email: string;
    phone: number;
    dob: string;
    gender: string;
    role: string;
    constructor(details: any) {
        this.name = details.name || '';
        this.username = details.username || '';
        this.password = details.password || '';
        this.email = details.email || '';
        this.phone = details.phone || '';
        this.dob = details.dob || '';
        this.gender = details.gender || '';
        this.role = details.role || '';
    }
}