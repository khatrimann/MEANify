import { User } from './../shared/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(baseURL + 'users/')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(baseURL + 'users/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getUserIds(): Observable<number[] | any> {
    return this.getUsers().pipe(map(users => users.map(user => user.id)))
      .pipe(catchError(error => error));
}
}
