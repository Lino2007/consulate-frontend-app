import {Component, Inject, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from '@azure/msal-angular';

@Component({
  selector: 'app-dashboard-vertical-menu',
  templateUrl: './dashboard-vertical-menu.component.html',
  styleUrls: ['./dashboard-vertical-menu.component.css']
})
export class DashboardVerticalMenuComponent implements OnInit {

  verticalMenu: MenuItem[];
  constructor() { }

  ngOnInit(): void {
    this.verticalMenu = [
      {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: '/dashboard'},
      {label: 'Profile information', icon: 'pi pi-fw pi-user', routerLink: '/profile'},
      {label: 'Request for a document', icon: 'pi pi-fw pi-copy', routerLink: '/document-request'},
      {label: 'My documents', icon: 'pi pi-fw pi-file-o', routerLink: '/documents'},
      {label: 'Consuls', icon: 'pi pi-fw pi-briefcase', routerLink: '/consuls'},
      {label: 'Population', icon: 'pi pi-fw pi-users', routerLink: '/population'},
      {label: 'Roles', icon: 'pi pi-fw pi-pencil', routerLink: '/roles'},
      {label: 'Permissions', icon: 'pi pi-fw pi-pencil', routerLink: '/permissions'},
    ];
  }

}
