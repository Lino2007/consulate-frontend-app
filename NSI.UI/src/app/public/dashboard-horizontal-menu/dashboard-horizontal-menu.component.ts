import {Component, Inject, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from "@azure/msal-angular";

@Component({
  selector: 'app-dashboard-horizontal-menu',
  templateUrl: './dashboard-horizontal-menu.component.html',
  styleUrls: ['./dashboard-horizontal-menu.component.css']
})
export class DashboardHorizontalMenuComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;
  constructor(private router: Router,
              @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
              private broadcastService: MsalBroadcastService,
              private authService: MsalService) {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'BiH Konzulat', routerLink: '/home'},
      {label: 'About', routerLink: '/about'},
    ];

    this.activeItem = this.items[0];
  }

  logout(): void {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200'
    });
  }
}
