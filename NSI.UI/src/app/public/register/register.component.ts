import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {UserService} from '../../private/services/user.service';
import {CookieService} from 'ngx-cookie-service';
import {MsalService} from '@azure/msal-angular';

interface Gender {
  name: string;
  code: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;
  submitted = false;
  genders = [];
  selectedGender = {name: 'Male', code: 1};
  // @ts-ignore
  private readonly notifier: NotifierService;

  constructor(private formBuilder: FormBuilder,
              notifierService: NotifierService,
              private router: Router,
              private authService: MsalService,
              private userService: UserService) {
    this.notifier = notifierService;
    this.genders.push({name: 'Female', code: 2});
    this.genders.push({name: 'Male', code: 1});
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2)
          ]
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2)
          ]
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(2)
          ]
        ],
        placeOfBirth: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
          ]
        ],
        selectedGender: [
          '',
          [
            Validators.required,
          ]
        ],
        dateOfBirth: [
          '',
          [
            Validators.required,
          ]
        ],
        country: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
          ]
        ],
      },
      {}
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  dateToString(date: Date){
    let day = '';
    let month = '';
    if (date?.getMonth() < 11) {
      date.setMonth(date.getMonth());
    }
    if (date?.getDate() < 10) {
      day = `0${date?.getDate()}`;
    } else {
      day = `${date?.getDate()}`;
    }
    if (date?.getMonth() < 10) {
      month = `0${date.getMonth() + 1}`;
    } else if (date?.getMonth() === 11) {
      month = `${12}`;
    } else {
      // eslint-disable-next-line no-unsafe-optional-chaining
      month = `${date?.getMonth() + 1}`;
    }

    const dateString = `${date?.getFullYear()}-${month}-${day}`;
    return dateString;
  }

  onSubmit(): void {
    this.submitted = true;
    const stringDate = this.dateToString(this.form.value.dateOfBirth);

    const user = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      gender: this.form.value.selectedGender.code,
      email: this.form.value.email,
      username: this.form.value.username,
      placeOfBirth: this.form.value.placeOfBirth,
      dateOfBirth: stringDate,
      country: this.form.value.country,
    };

    if (this.form.invalid) {
      return;
    }

    this.userService.register(user).subscribe(res => {
      (user.dateOfBirth);
      // @ts-ignore
      if (res.success === 'Succeeded') {
        this.notifier.notify('success', 'Successful register!');
        this.router.navigate(['/dashboard']);
      }
      else {
        this.notifier.notify('error', 'Write correct informations!');
      }
    });
  }

  cancel(): void {
      this.authService.logoutRedirect({
        postLogoutRedirectUri: 'http://localhost:4200'
      });
      localStorage.setItem('Role', JSON.stringify(''));
      localStorage.setItem('Token', JSON.stringify(''));
      localStorage.setItem('Menu', JSON.stringify(null));
  }
}
