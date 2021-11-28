import {Component, Inject, OnInit} from '@angular/core';
import {DocumentService} from '../../private/services/document.service';
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from '@azure/msal-angular';
import {filter} from 'rxjs/operators';
import {EventMessage, EventType} from '@azure/msal-browser';
import {PrimeNGConfig} from 'primeng/api';
import {CookieService} from 'ngx-cookie-service';

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

  constructor(
    private documentService: DocumentService,
    private cookieService: CookieService
    ) { }

  ngOnInit(): void { }

  submit(): void {
    console.log(this.choosenType, this.reason);
    const token = this.cookieService.get('Token');
    this.documentService.addDocumentRequest({type: this.choosenType.name, reason: this.reason}, token).subscribe((res: any) => {
      console.log(res);
    });
  }
}
