import {Component, Inject, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from "@azure/msal-angular";

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
    ];
  }

}
