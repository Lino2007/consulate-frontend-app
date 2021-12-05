import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { PrimeNGConfig } from 'primeng/api';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import {UserService} from './private/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NSI.UI';
  menuItems = [];
  private readonly _destroying$ = new Subject<void>();

  constructor(private authService: MsalService,
              private msalBroadcastService: MsalBroadcastService,
              private primengConfig: PrimeNGConfig,
              private cookieService: CookieService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.msalBroadcastService.msalSubject$
    .pipe(
      filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
    )
    .subscribe((result: EventMessage) => {
      // @ts-ignore
      localStorage.setItem('Token', JSON.stringify(result.payload["idToken"]));
      // @ts-ignore
      localStorage.setItem('Username', JSON.stringify(result.payload?.account.username));
      console.log('username',localStorage.getItem('Username'));

      // @ts-ignore
      this.userService.getUser(result.payload?.account.username).subscribe((res: any) => {
        console.log('res', res.data);
        if (res.data != null) {
          localStorage.setItem('Role', JSON.stringify(res.data));
          console.log('toooo', localStorage.getItem('Role'));
        } else {
          this.router.navigate(['/register']);
        }
      });
      });
  }
}
