import { Component, OnInit } from '@angular/core';
import {RolesService} from '../../private/services/roles.service';
import {PermissionsService} from '../../private/services/permissions.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {

  roles: any[];
  selectedRole: any;
  update = false;
  permissions: any[];
  selectedRolesPermissions = [];

  constructor(
    private rolesService: RolesService,
    private permissionsService: PermissionsService,
  ) { }

  ngOnInit(): void {
    this.rolesService.goBackToLanding.subscribe((num: number) => {
      this.fetchRoles();
    });
    this.permissionsService.goBackToLanding.subscribe((num: number) => {
      this.fetchPermissions();
    });

    this.fetchRoles();
    this.fetchPermissions();
  }

  fetchRoles(): void {
    this.rolesService.getRoles().subscribe((res: any) => {
      this.roles = res.data;
      if (this.roles[0]) { this.selectedRole = this.roles[0]; }
    });
  }

  // tslint:disable-next-line:typedef
  fetchPermissions() {
    this.permissionsService.getPermissions().subscribe((res: any) => {
      this.permissions = res.data;
    });
  }

  changeRole(role: any): void {
    this.selectedRole = role;
    this.permissionsService.getPermissionForRole(role.id).subscribe((res: any) => {
      this.selectedRolesPermissions = res.data;
    });
  }

  deleteRole(): void {
    console.log('delete');
  }

  updateRole(): void {
    this.update = true;
    console.log('update');
  }

  cancelUpdate(): void {
    this.update = false;
  }

  addPermission(permission: any): void {
    this.selectedRolesPermissions.splice(this.selectedRolesPermissions.length, 0, permission);
  }

  deletePermission(permission: any): void {
    this.selectedRolesPermissions.forEach((value, index) => {
      if (value === permission) { this.selectedRolesPermissions.splice(index, 1); }
    });
  }

  save(): void {
    console.log('save');
  }
}
