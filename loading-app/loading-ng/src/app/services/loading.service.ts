import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private http: HttpClient) { }

  getPosts(start) {
    return this.http.get<any>('http://localhost:3000/posts/' + start);
  }
}
