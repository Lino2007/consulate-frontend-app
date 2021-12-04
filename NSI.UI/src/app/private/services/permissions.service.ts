import {Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  public getPermissions(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      })
    };
    return this.http.get(environment.url + '/api/Permission', httpOptions);
  }

  // tslint:disable-next-line:typedef
  public getPermissionForRole(roleId: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      }),
      params: { role: roleId }
    };
    // @ts-ignore
    return this.http.get(environment.url + '/api/Permission', httpOptions);
  }
}
