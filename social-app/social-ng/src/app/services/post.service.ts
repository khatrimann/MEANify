import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { localUrl } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  postPost(id, body: any): Observable<any> {
    return this.http.post<any>(localUrl + 'users/' + id + '/post', body);
  }

  getPosts(id): Observable<any> {
    return this.http.get<any>(localUrl + 'users/' + id + '/post');
  }

  getMentions(id): Observable<any> {
    return this.http.get<any>(localUrl + 'users/' + id + '/mentions');
  }
}
