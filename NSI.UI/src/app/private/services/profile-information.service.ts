import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileInformationService {

  constructor(private http: HttpClient) { }

  public getUserInformation(userEmail: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      }),
      params: {
        email: userEmail
      }
    };
    return this.http.get(environment.url + '/api/Auth', httpOptions);
  }

  public deleteUserAccount(userEmail: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      }),
      params: {
        email: userEmail
      }
    };
    return this.http.delete(environment.url + '/api/User', httpOptions);
  }
}
