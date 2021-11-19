import {Component, Inject, OnInit} from '@angular/core';
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from '@azure/msal-angular';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent implements OnInit {

  isIframe = false;

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
              private broadcastService: MsalBroadcastService,
              private authService: MsalService) {
    this.isIframe = window !== window.parent && !window.opener;
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.loginRedirect();
    this.isIframe = true;
  }

  logout(): void {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200'
    });
    this.isIframe = false;
  }

}
