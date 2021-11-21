import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { PasswordChangeComponent } from '../password-change/password-change.component';

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
  email = 'smujcinovi1@etf.unsa.ba'

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

}

  ngOnInit(): void {
  }

  changePassword(): void{
    this.router.navigateByUrl('/change-password');
  }

}
