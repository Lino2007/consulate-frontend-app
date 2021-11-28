import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  public addDocumentRequest(body: any, token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Bearer: token
      })
    };
    return this.http.post(environment.url + '/api/Request', body, httpOptions);
  }
}
