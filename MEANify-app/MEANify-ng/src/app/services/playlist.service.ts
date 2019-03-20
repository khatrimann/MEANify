import { Playlist } from './../shared/playlist';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(baseURL + 'playlists')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPlaylist(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(baseURL + 'playlists/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPlaylistIds(): Observable<number[] | any> {
    return this.getPlaylists().pipe(map(playlists => playlists.map(playlist => playlist.id)))
      .pipe(catchError(error => error));
  }
}
