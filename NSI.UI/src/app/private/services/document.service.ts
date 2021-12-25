import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  public getDocuments() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      })
    };
    return this.http.get(environment.url + '/api/User/document', httpOptions);
  }
}
