import {Component, Inject, OnInit} from '@angular/core';
import {DocumentService} from '../../private/services/document.service';
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from '@azure/msal-angular';
import {filter} from 'rxjs/operators';
import {EventMessage, EventType} from '@azure/msal-browser';
import {PrimeNGConfig} from 'primeng/api'
import {CookieService} from 'ngx-cookie-service';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-document-requests',
  templateUrl: './document-requests.component.html',
  styleUrls: ['./document-requests.component.css']
})
export class DocumentRequestsComponent implements OnInit {

  documentType = [
    {id: 1, name: 'Passport'},
    {id: 2, name: 'Visa'}
  ];
  choosenType = {id: 1, name: 'Passport'};
  reason = '';
  // @ts-ignore
  private readonly notifier: NotifierService;

  constructor(
    private documentService: DocumentService,
    notifierService: NotifierService,
    ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void { }

  submit(): void {
    this.documentService.addDocumentRequest({type: this.choosenType.name, reason: this.reason}).subscribe((res: any) => {
      console.log(res);
      if (res.success === 'Succeeded') {
        this.notifier.notify('success', 'Request send!');
      }
      else {
        this.notifier.notify('error', 'Request did not send!');
      }
    });
  }
}
