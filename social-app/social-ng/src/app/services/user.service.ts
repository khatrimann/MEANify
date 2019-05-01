import { Observable } from 'rxjs';
import { localUrl } from './../constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(localUrl + 'users');
  }

  getUser(id): Observable<any> {
    return this.http.get<any>(localUrl + 'users/' + id + '/profile');
  }
}
