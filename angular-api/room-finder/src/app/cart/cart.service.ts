import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url: string
  token;
  constructor(
    public http: HttpClient
  ) {
    this.url = environment.baseUrl + '/cart';
    this.token = localStorage.getItem('token') || '';

  }
  getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.token
      })
    }
  }


  addToCart(id: string) {
    return this.http.post(`${this.url}/${id}?token=${this.token}`, this.getOptions())
  }
  getAllCart() {
    return this.http.get(`${this.url}`, this.getOptions())

  }
  updateCart(id: string) {
    return this.http.put(`${this.url}/${id}`, id, this.getOptions())

  }

}
