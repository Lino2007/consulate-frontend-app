import {Injectable, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  public getPermissions(){
    return this.http.get(environment.url + '/api/Permission');
  }

  // tslint:disable-next-line:typedef
  public getPermissionForRole(roleId: string){
    return this.http.get(environment.url + '/api/Permission', {
      params: {role: roleId}
    });
  }
}
