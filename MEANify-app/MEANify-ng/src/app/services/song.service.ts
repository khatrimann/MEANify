import { Song } from './../shared/song';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(baseURL + 'songs/')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getSong(id: number): Observable<Song> {
    return this.http.get<Song>(baseURL + 'songs/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getSongIds(): Observable<number[] | any> {
    return this.getSongs().pipe(map(songs => songs.map(song => song.id)))
      .pipe(catchError(error => error));
  }
}
