import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Room } from '../model/room.model';


@Injectable()
export class RoomService {
    url: string;
    token: string;
    constructor(
        public http: HttpClient
    ) {
        this.url = environment.baseUrl + '/room';
        this.token = localStorage.getItem('token') || '';
    }

    getOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'x-access-token': this.token
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

    upload(data: Room, files: Array<any>, httpVerb) {
        return new Observable((observer) => {
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            if (files.length) {
                formData.append('img', files[0], files[0].name);
            }
            for (let key in data) {
                formData.append(key, data[key]);
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        observer.next(xhr.response);
                    } else {
                        observer.error(xhr.response);
                    }
                }
            }
        })
    }
}