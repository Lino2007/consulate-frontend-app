import {Component, Inject, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from '@azure/msal-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: MenuItem[];
  verticalMenu: MenuItem[];

  activeItem: MenuItem;

  constructor(private router: Router,
              @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
              private broadcastService: MsalBroadcastService,
              private authService: MsalService) {
            }

  ngOnInit(): void {
    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/home'},
      {label: 'About', icon: 'pi pi-fw pi-file', routerLink: '/about'},
      {label: 'Contact', icon: 'pi pi-fw pi-pencil', routerLink: '/contact'},
    ];

    this.verticalMenu = [
      {label: 'Profile information', icon: 'pi pi-fw pi-user', routerLink: '/profile'},
    ];

    this.activeItem = this.items[0];
  }

  logout(): void {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200'
    });
  }
}
