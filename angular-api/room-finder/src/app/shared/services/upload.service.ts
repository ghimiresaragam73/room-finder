import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';


@Injectable()
export class UploadService {
    upload(data: any, files: Array<any>, httpVerb, URL) {
        return new Observable((observer) => {
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            for (var file in files) {
                if (file !=='length' && file!=='item') {
                    console.log('file is>>>', file);
                    console.log('files is>>>', files);
                    formData.append('img', files[file], files[file].name);
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
                url = `${URL}/${data._id}?token=${localStorage.getItem('token')}`
            }

            xhr.open(httpVerb, url, true);
            xhr.send(formData);
        })
    }
}