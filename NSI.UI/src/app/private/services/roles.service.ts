import {Injectable, Output} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Role } from 'src/app/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  public getRoles(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      })
    };
    return this.http.get(environment.url + '/api/Role', httpOptions);
  }

  public saveRole(roleName: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      })
    };
    return this.http.post(environment.url + '/api/Role', {
      name: roleName
    }, httpOptions);
  }

  // tslint:disable-next-line:typedef
  public addRolePermission(roleId: string, permissionId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      })
    };
    return this.http.post(environment.url + '/api/Permission/role', {
      RoleId: roleId,
      PermissionId: permissionId
    }, httpOptions);
  }

  // tslint:disable-next-line:typedef
  public deleteRolePermission(roleId: string, permissionId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      }),
      params: {
        RoleId: roleId,
        PermissionId: permissionId
      }
    };
    return this.http.delete(environment.url + '/api/Permission/role', httpOptions);
  }

  // tslint:disable-next-line:typedef
  public deleteRole(roleId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      })
    };
    return this.http.delete(environment.url + '/api/Role/' + roleId, httpOptions);
  }

  // tslint:disable-next-line:typedef
  public deleteRoleFromUser(roleId: string, userId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      }),
      params: {
        RoleId: roleId,
        UserID: userId
      }
    };
    return this.http.delete(environment.url + '/api/Role/user', httpOptions);
  }

  public asignRoleToUser(roleId: string, userId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token')),
        'Content-Type': 'application/json',
        'accept': 'text/plain'
      }),
    };
    const object = {};
    object['userId'] = userId;
    object['roleId'] = roleId;
    return this.http.post(environment.url + '/api/Role/user', JSON.stringify(object), httpOptions);
    }

}
