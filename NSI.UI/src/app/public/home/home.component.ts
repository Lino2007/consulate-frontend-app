import {Component, Inject, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from '@azure/msal-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: MenuItem[];
  images = [{
    source: 'assets/images/gallery/image1.jpg',
    alt: 'Image1',
    title: 'Title1'
  }, {
    source: 'assets/images/gallery/image2.jpg',
    alt: 'Image2',
    title: 'Title2'
  }, {
    source: 'assets/images/gallery/image3.jpg',
    alt: 'Image3',
    title: 'Title3'
  }, {
    source: 'assets/images/gallery/image4.jpg',
    alt: 'Image4',
    title: 'Title4'
  }, {
    source: 'assets/images/gallery/image5.jpg',
    alt: 'Image5',
    title: 'Title5'
  }];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
              private broadcastService: MsalBroadcastService,
              private authService: MsalService) {
            }

  ngOnInit(): void {
    this.items = [];
  }

  logout(): void {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200'
    });
  }
}
