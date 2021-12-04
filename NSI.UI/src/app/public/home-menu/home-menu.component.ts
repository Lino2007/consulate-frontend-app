import {Component, Inject, OnInit} from '@angular/core';
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from '@azure/msal-angular';
import {InteractionStatus} from '@azure/msal-browser';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {UserService} from '../../private/services/user.service';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent implements OnInit {

  isIframe = false;
  loginDisplay = false;
  readonly #_destroying$ = new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
              private broadcastService: MsalBroadcastService,
              private authService: MsalService,
              private cookieService: CookieService,
              private userService: UserService,
              private router: Router) {

    if (JSON.parse(localStorage.getItem('Role')) === '' && JSON.parse(localStorage.getItem('Token')) !== '') {
      this.router.navigate(['/register']);
    }
  }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    this.broadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this.#_destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });
  }

  login(): void {
    this.authService.loginRedirect().subscribe(
      {
        next: (result) => {
          this.setLoginDisplay();
        },
        error: (error) => console.log(error)
      }
    );
  }

  setLoginDisplay(): void {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

}
