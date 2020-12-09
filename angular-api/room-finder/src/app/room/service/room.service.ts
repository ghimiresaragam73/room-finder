import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Room } from '../model/room.model';


@Injectable()
export class RoomService {
    url: string;
    constructor(
        public http: HttpClient
    ) {
        this.url = environment.baseUrl + '/room';
    }

    getOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            })
        }
    }

    add(data: Room) {
        return this.http.post(this.url, data, this.getOptions())
    }
    edit(id: string, data: Room) {
        return this.http.put(`${this.url}/${id}`, data, this.getOptions())
    }
    get() {
        return this.http.get(this.url, this.getOptions())
    }
    getById(id: string) {
        return this.http.get(`${this.url}/${id}`, this.getOptions())
    }
    remove(id: string) {
        return this.http.delete(`${this.url}/${id}`, this.getOptions())
    }
    search(condition: Room) {
        return this.http.post(`${this.url}/search`, condition, this.getOptions())
    }
}