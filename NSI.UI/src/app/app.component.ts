import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { PrimeNGConfig } from 'primeng/api';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NSI.UI.ECHO';
  menuItems = [];
  private readonly _destroying$ = new Subject<void>();

  constructor (private authService:MsalService,
              private msalBroadcastService:MsalBroadcastService,
              private primengConfig: PrimeNGConfig) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.msalBroadcastService.msalSubject$
    .pipe(
      filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
    )
    .subscribe((result: EventMessage) => {
      console.log(result);
    });
  }
}
