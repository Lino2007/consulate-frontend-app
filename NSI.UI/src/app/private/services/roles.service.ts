import {Injectable, Output} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  public getRoles(){
    return this.http.get(environment.url + '/api/Role');
  }

  public saveRole(roleName: string){
    return this.http.post(environment.url + '/api/Role', {
      name: roleName
    });
  }

  // tslint:disable-next-line:typedef
  public addRolePermission(roleId: string, permissionId: string) {
    return this.http.post(environment.url + '/api/Permission/role', {
      RoleId: roleId,
      PermissionId: permissionId
    });
  }

  // tslint:disable-next-line:typedef
  public deleteRolePermission(roleId: string, permissionId: string) {
    return this.http.delete(environment.url + '/api/Permission/role', {
      params: {
        RoleId: roleId,
        PermissionId: permissionId
      }
    });
  }

}
