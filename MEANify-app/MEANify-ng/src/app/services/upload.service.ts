import { baseURL } from './../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map} from 'rxjs/operators';

interface UploadResponse {
  success: string;
}

@Injectable({
  providedIn: 'root'
})

export class UploadService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    upload(file: any): Observable<any> {
      return this.http.post<UploadResponse>(baseURL + 'upload', {'artist': file.artist, 'name': file.name, 'year': file.year, 'genre': file.genre, 'uploadedby': file.uploadedby, 'location': file.location })
      .pipe( map(res => {
        return {'success': true };
    }),
    catchError(error => this.processHTTPMsgService.handleError(error)));
    }
}
