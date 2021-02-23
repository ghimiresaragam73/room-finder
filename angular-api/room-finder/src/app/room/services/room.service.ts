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

    add(data: any) {
        return this.http.post(this.url, data, this.getOptions())
    }
    edit(id: string, data: any) {
        return this.http.put(`${this.url}/${id}`, data, this.getOptions())
    }
    get() {
        return this.http.get(this.url, this.getOptions())
    }
    getByEight() {
        return this.http.get(`${this.url}/eight`, this.getOptions())
    }
    getByCategories() {
        return this.http.get(`${this.url}/categories`, this.getOptions());
    }
    getById(id: string) {
        return this.http.get(`${this.url}/${id}`, this.getOptions())
    }
    remove(id: string) {
        return this.http.delete(`${this.url}/${id}`, this.getOptions())
    }

    search(condition: any) {
        return this.http.post(`${this.url}/search`, condition, this.getOptions())
    }

    upload(data: any, files: Array<any>, httpVerb, URL) {
        return new Observable((observer) => {
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            for (var file in files) {
                if (files.length > 3) {
                    observer.error({ error: { message: 'Do not upload more than 3 photos' } })
                }
                if (file !== 'length' && file !== 'item') {
                    formData.append('img', files[file], files[file].name);
                    /* if (file == '0' || file == '1' || file == '2') {
                        console.log('file is>>>', file);
                        console.log('files is>>>', files);
                        formData.append('img', files[file], files[file].name);
                    }
 */
                }

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
            let url = `${URL}?token=${localStorage.getItem('token')}`;
            if (httpVerb == "PUT") {
                url = `${URL}/${data._id}?token=${localStorage.getItem('token')}`;
                console.log('this.url here', url);
            }
            xhr.open(httpVerb, url, true);
            xhr.send(formData);
        })
    }
}