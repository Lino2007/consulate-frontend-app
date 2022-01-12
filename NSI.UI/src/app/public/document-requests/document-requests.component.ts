import {Component, Inject, OnInit} from '@angular/core';
import {DocumentService} from '../../private/services/document.service';
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from '@azure/msal-angular';
import {filter} from 'rxjs/operators';
import {EventMessage, EventType} from '@azure/msal-browser';
import {PrimeNGConfig} from 'primeng/api';
import {CookieService} from 'ngx-cookie-service';
import {NotifierService} from 'angular-notifier';
import {RequestService} from '../../private/services/request.service';
import {Router} from "@angular/router";

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
  documents: File[] = [] ;
  type = [];

  // @ts-ignore
  private readonly notifier: NotifierService;

  constructor(
    private requestService: RequestService,
    notifierService: NotifierService,
    private router: Router,
    ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void { }

  submit(): void {
    let formData: any = new FormData();
    formData.append('type', this.choosenType.name);
    formData.append('reason', this.reason);
    for (let i = 0; i <= this.documents.length; i++) {
       formData.append('attachments', this.documents[i]);
    }
    for (let i = 0; i <= this.type.length; i++) {
      formData.append(`attachmentTypes[${i}]`, this.type[i]);
    }
    if (this.choosenType.name === '' || this.reason === '' || this.documents.length === 0 )
      this.notifier.notify('error', 'Please fill all fields!');
    // tslint:disable-next-line:max-line-length
    this.requestService.addRequestItem(formData).subscribe((res: any) => {
      if (res.success === 'Succeeded') {
        this.notifier.notify('success', 'Request send!');
        this.router.navigate(['/dashboard']);
      }
      else {
        this.notifier.notify('error', 'Request did not send!');
      }
    });
  }

  handleFileInput(file: any): void {
    if (file.files.length > 5) {
      this.notifier.notify('error', 'You can upload only 5 documents!');
      this.documents = [];
    }
    else if (file.files.length !== 0){
      if (file.files.length === 1) {
        this.documents[0] = file.files[0];
        this.type[0] = 'Other';
      }
      else {
        for (let i = 0; i < file.files.length; i++) {
          this.documents[i] = file.files[i];
          this.type[i] = 'Other';
        }
      }
    }
  }
}
