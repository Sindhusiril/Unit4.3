import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly baseUrl;

  constructor(private http: HttpClient) { 
    this.baseUrl = 'http://localhost:8083'
  }

  get(uri: string) {
    return this.http.get(`${this.baseUrl}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.baseUrl}/${uri}`, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.baseUrl}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.baseUrl}/${uri}`);
  }
}
