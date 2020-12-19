import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';


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

    forgotPassword(email: string) {
        return this.http.post(this.url + '/forgotPassword', { email: email }, this.getOptions());
    }

    resetPassword(data: any) {
        return this.http.post(this.url + '/resetPassword/' + data.id, data, this.getOptions())
    }

    emailVerifySend(data: any) {
        return this.http.get(this.url + '/email/' + data.email, this.getOptions())
    }

    emailVerify(id: string) {
        return this.http.get(this.url + '/verify/email/' + id + '?verify=true', this.getOptions())
    }
    remove(id: string) {
        return this.http.delete(this.url + '/' + id, this.getOptions());
    }




}