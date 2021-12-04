import {Component, Inject, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from '@azure/msal-angular';
import {PermissionsService} from '../../private/services/permissions.service';

@Component({
  selector: 'app-dashboard-vertical-menu',
  templateUrl: './dashboard-vertical-menu.component.html',
  styleUrls: ['./dashboard-vertical-menu.component.css']
})
export class DashboardVerticalMenuComponent implements OnInit {

  verticalMenu: MenuItem[];
  permissions = [];
  constructor(private permissionsService: PermissionsService ) {

    this.verticalMenu = [
      {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: '/dashboard'},
      /*
      {label: 'Profile information', icon: 'pi pi-fw pi-user', routerLink: '/profile'},
      {label: 'Request for a document', icon: 'pi pi-fw pi-copy', routerLink: '/document-request'},
      {label: 'My documents', icon: 'pi pi-fw pi-file-o', routerLink: '/documents'},
      {label: 'Consuls', icon: 'pi pi-fw pi-briefcase', routerLink: '/consuls'},
      {label: 'Population', icon: 'pi pi-fw pi-users', routerLink: '/population'},
      {label: 'Roles', icon: 'pi pi-fw pi-pencil', routerLink: '/roles'},
      {label: 'Permissions', icon: 'pi pi-fw pi-pencil', routerLink: '/permissions'},
      */
    ];

    if (JSON.parse(localStorage.getItem('Menu')) !== null) {
      this.verticalMenu = JSON.parse(localStorage.getItem('Menu'));
    }
    else {
      this.permissionsService.getPermissionForRole(JSON.parse(localStorage.getItem('Role'))?.name).subscribe((res: any) => {
        this.permissions = res.data;
        const permissionsName = [];

        res.data.forEach((permis, index) => {
          permissionsName.splice(0, 0, permis?.name);
        });

        if (permissionsName.indexOf('document:create') !== -1) {
          this.verticalMenu.splice(this.verticalMenu.length, 0,
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: '/dashboard'});
        }
        if (permissionsName.indexOf('employee:delete') !== -1 ||
              permissionsName.indexOf('employee:update') !== -1 ||
                permissionsName.indexOf('employee:create') !== -1) {
          this.verticalMenu.splice(this.verticalMenu.length, 0,
            {label: 'Consuls', icon: 'pi pi-fw pi-briefcase', routerLink: '/consuls'});
        }
        if (permissionsName.indexOf('permission:modify') !== -1) {
          this.verticalMenu.splice(this.verticalMenu.length, 0,
            {label: 'Permissions', icon: 'pi pi-fw pi-pencil', routerLink: '/permissions'});
        }
        if (permissionsName.indexOf('user:delete') !== -1) {
          this.verticalMenu.splice(this.verticalMenu.length, 0,
            {label: 'Population', icon: 'pi pi-fw pi-users', routerLink: '/population'});
        }
        if (permissionsName.indexOf('role:modify') !== -1) {
          this.verticalMenu.splice(this.verticalMenu.length, 0,
            {label: 'Roles', icon: 'pi pi-fw pi-pencil', routerLink: '/roles'});
        }
        /*if (permissionsName.indexOf('document:create') !== -1) {
          this.verticalMenu.splice(this.verticalMenu.length, 0,
            {label: 'Request for a document', icon: 'pi pi-fw pi-copy', routerLink: '/document-request'});
        }*/
        if (permissionsName.indexOf('document:view') !== -1) {
          this.verticalMenu.splice(this.verticalMenu.length, 0,
            {label: 'Documents', icon: 'pi pi-fw pi-file-o', routerLink: '/documents'});
        }
        if (permissionsName.indexOf('request:view') !== -1) {
          this.verticalMenu.splice(this.verticalMenu.length, 0,
            {label: 'Documents', icon: 'pi pi-fw pi-file-o', routerLink: '/documents'});
        }
        if (permissionsName.indexOf('request:create') !== -1) {
          this.verticalMenu.splice(this.verticalMenu.length, 0,
            {label: 'Request for a document', icon: 'pi pi-fw pi-copy', routerLink: '/document-request'});
        }
        if (permissionsName.indexOf('profile:view') !== -1) {
          this.verticalMenu.splice(this.verticalMenu.length, 0,
            {label: 'Profile information', icon: 'pi pi-fw pi-user', routerLink: '/profile'});
        }

        localStorage.setItem('Menu', JSON.stringify(this.verticalMenu));
      });
    }
  }

  ngOnInit(): void {
  }

}
