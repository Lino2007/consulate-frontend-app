import { Component, OnInit } from '@angular/core';
import {RolesService} from '../../private/services/roles.service';
import {PermissionsService} from '../../private/services/permissions.service';
import {Permission} from '../../models/permission.model';
import {NotifierService} from 'angular-notifier';

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
  deletedPermissions = [];
  addedPermissions = [];
  originalPermissions = [];

  private readonly notifier: NotifierService;

  constructor(
    private rolesService: RolesService,
    private permissionsService: PermissionsService,
    notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.fetchRoles();
    this.fetchPermissions();
  }

  fetchRoles(): void {
    this.rolesService.getRoles().subscribe((res: any) => {
      this.roles = res.data;
      if (this.roles[0]) {
        this.selectedRole = this.roles[0];
        this.fetchRolePermissions(this.selectedRole.name);
      }
    });
  }

  // tslint:disable-next-line:typedef
  fetchPermissions() {
    this.permissionsService.getPermissions().subscribe((res: any) => {
      this.permissions = res.data;
    });
  }

  fetchRolePermissions(roleName: string): void {
    this.permissionsService.getPermissionForRole(roleName).subscribe((res: any) => {
      this.selectedRolesPermissions = res.data;
    });
  }

  validateRolePermission(permission: Permission): boolean {
    return (this.selectedRolesPermissions.find(element => element.id === permission.id) !== undefined);
  }

  changeRole(role: any): void {
    this.selectedRole = role;
    this.fetchRolePermissions(role.name);
  }

  deleteRole(): void {
    this.rolesService.deleteRole(this.selectedRole.id).subscribe((res: any) => {
      if (res.success === 'Succeeded') {
        this.fetchRoles();
        this.notifier.notify('success', 'Role deleted!');
      }
      else if (res.success === 'Failed') {
        this.notifier.notify('error', 'This role is assign to some user, please remove it from that user!');
      }
    });
  }

  updateRole(): void {
    this.update = true;
    this.deletedPermissions = [];
    this.addedPermissions = [];
    this.selectedRolesPermissions.forEach((value, index) => {
      this.originalPermissions.splice(index, 0, value);
    });
  }

  cancelUpdate(): void {
    this.update = false;
  }

  addPermission(permission: any): void {
    this.selectedRolesPermissions.splice(this.selectedRolesPermissions.length, 0, permission);
    if (this.originalPermissions.find(element => element.id === permission.id) === undefined) {
      this.addedPermissions.splice(0, 0, permission);
    }
    if (this.deletedPermissions.find(element => element.id === permission.id) !== undefined) {
      this.deletedPermissions.forEach((value, index) => {
        if (value.id === permission.id) {
          this.deletedPermissions.splice(index, 1);
        }
      });
    }
  }

  deletePermission(permission: any): void {
    this.selectedRolesPermissions.forEach((value, index) => {
      if (value.id === permission.id) {
        this.selectedRolesPermissions.splice(index, 1);
      }
    });

    if (this.originalPermissions.find(element => element.id === permission.id) !== undefined) {
      this.deletedPermissions.splice(0, 0, permission);
    }

    if (this.addedPermissions.find(element => element.id === permission.id) !== undefined) {
      this.addedPermissions.forEach((value, index) => {
        if (value.id === permission.id) {
          this.addedPermissions.splice(index, 1);
        }
      });
    }
  }

  save(): void {
    this.addedPermissions.forEach((value, index) => {
      this.rolesService.addRolePermission(this.selectedRole.id, value.id).subscribe((res: any) => {});
    });
    this.deletedPermissions.forEach((value, index) => {
      this.rolesService.deleteRolePermission(this.selectedRole.id, value.id).subscribe((res: any) => {});
    });
    this.update = false;
    this.notifier.notify('success', 'Role updated!');
  }
}
