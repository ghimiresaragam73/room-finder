import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
    url: string;
    constructor(
        public http: HttpClient
    ) {
        this.url = environment.baseUrl + '/auth';
    }

    getOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
    }

    login(data: User) {
        return this.http.post(this.url + '/login', data, this.getOptions());
    }
    register(data: User) {
        return this.http.post(this.url + '/register', data, this.getOptions());
    }
}