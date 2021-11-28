import { Component, OnInit } from '@angular/core';
import {NotifierService} from "angular-notifier";
import {RolesService} from '../../private/services/roles.service';
import {PermissionsService} from '../../private/services/permissions.service';
import {Permission} from "../../models/permission.model";
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  roles: any[];
  permissions: any[];
  cancle: false;
  addedPermissions = [];
  addedRole: any;
  roleName = '';

  private readonly notifier: NotifierService;

  constructor(
    private rolesService: RolesService,
    private permissionsService: PermissionsService,
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    notifierService: NotifierService,) 
    { 
      this.notifier = notifierService;
    }

  ngOnInit(): void {
    this.fetchRoles();
    this.fetchPermissions();
  }

  fetchPermissions() {
    this.permissionsService.getPermissions().subscribe((res: any) => {
      this.permissions = res.data;
    });
  }

  fetchRoles(): void {
    this.rolesService.getRoles().subscribe((res: any) => {
      this.roles = res.data;
    });
  }

  addPermission(permission: any): void {
    this.addedPermissions.splice(0,0,permission);
  }

  deletePermission(permission: any): void {
    this.addedPermissions.forEach((value, index) => {
      if(value.id === permission.id){
        this.addedPermissions.splice(index,1);
      }
    });
  }


  validateRole(name: string): boolean {
    return (this.roles.find(element => element.name === name) === undefined);
  }

  validateRolePermission(permission: Permission): boolean {
    return (this.addedPermissions.find(element => element.id === permission.id) !== undefined);
  }

  cancel(): void{
    this.roleName = '';
    this.addedPermissions = [];
    this.router.navigateByUrl('/roles');
  }

  save(): void {
    if(this.roleName === ''){
      this.notifier.notify('error', 'Role name not set!');
    }
    else if(this.addedPermissions.length === 0){
      this.notifier.notify('error', 'Add permissions to role!');
    }
    else if(this.validateRole(this.roleName)){
        this.rolesService.saveRole(this.roleName).subscribe((res: any) => {
          this.addedPermissions.forEach((value, index) => {
            this.rolesService.addRolePermission(res.data.id, value.id).subscribe((res: any) => {});
          });
        });
        this.cancle = false;
        this.notifier.notify('success', 'Role added!');
        this.router.navigateByUrl('/roles');
    }
    else{
      this.notifier.notify('error', 'Role already exists!');
    }
  }



}
