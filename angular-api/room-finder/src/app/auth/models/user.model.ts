export class User {
    name: string;
    username: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    role: string;
    constructor(details: any) {
        this.name = details.name || '';
        this.username = details.username || '';
        this.email = details.email || '';
        this.phone = details.phone || '';
        this.dob = details.dob || '';
        this.gender = details.gender || '';
        this.role = details.role || '';
    }
}