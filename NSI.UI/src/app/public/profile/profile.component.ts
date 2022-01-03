import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {ProfileInformationService} from '../../private/services/profile-information.service';
import {CookieService} from 'ngx-cookie-service';
import {MsalService} from '@azure/msal-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

  firstName = 'Samra';
  surname = 'Mujcinovic';
  gender = 'Female';
  dateOfBirth = new Date();
  placeOfBirth = 'Sarajevo';
  country = 'Bosnia and Herzegowina';
  username = 'smujcinovi1';
  email = 'smujcinovi1@etf.unsa.ba';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private profileInfoService: ProfileInformationService,
              private cookieService: CookieService,
              private authService: MsalService) {

}

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('Username'));
    this.profileInfoService.getUserInformation(this.email).subscribe((res: any) => {
      this.firstName = res.data.firstName;
      this.surname = res.data.lastName;
      this.gender = res.data.gender;
      this.email = res.data.email;
      this.username = res.data.username;
      this.placeOfBirth = res.data.placeOfBirth;
      this.dateOfBirth = res.data.dateOfBirth;
      this.country = res.data.country;
    });
  }

  deleteAccount(): void{
    const result = confirm('Want to delete your account?');
    if (result) {
      this.profileInfoService.deleteUserAccount(this.email).subscribe((res: any) => {
        this.authService.logoutRedirect({
          postLogoutRedirectUri: 'http://localhost:4200'
        });
        localStorage.setItem('Role', JSON.stringify(''));
        localStorage.setItem('Token', JSON.stringify(''));
        localStorage.setItem('Menu', JSON.stringify(null));
      });
    }

  }

}
