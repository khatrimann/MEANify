import { Product } from './../constants/product';
import { baseURL } from './../constants/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common//http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private http: HttpClient) { }

  pushData(form: any) {
    console.log(typeof(form));
      return this.http.post<any>(baseURL + 'products', form)
      .subscribe(res => console.log(res));
  }

  getData(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + 'products');
  }

  removeProductfromDb(id: string) {
    return this.http.delete<any>(baseURL + 'products/' + id).subscribe(res => console.log(res));
  }
}
