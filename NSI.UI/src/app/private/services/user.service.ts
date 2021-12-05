import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  public getUser(userEmail: string) {
    return this.http.get(environment.url + '/api/User', {
      params: {
        email: userEmail,
      }
    });
  }

  // tslint:disable-next-line:typedef
  public register(user: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      })
    };
    return this.http.post(environment.url + '/api/User', user, httpOptions);
  }

  // tslint:disable-next-line:typedef
  public getUserPermission() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      })
    };
    return this.http.get(environment.url + '/api/User/permission', httpOptions);
  }

  // tslint:disable-next-line:typedef
  public getPopulation(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      })
    };
    return this.http.get(environment.url + '/api/User/users', httpOptions);
  }
}
