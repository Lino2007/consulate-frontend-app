import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {MsalService} from "@azure/msal-angular";
import { ActivatedRoute,Router } from '@angular/router';
import { EmployeeService } from 'src/app/private/services/employee.service';
import { NotifierService } from 'angular-notifier';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

interface Gender {
  name: string;
  code: string;
}

@Component({
  selector: 'app-add-consul',
  templateUrl: './add-consul.component.html',
  styleUrls: ['./add-consul.component.css']
})
export class AddConsulComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;
  submitted = false;
  genders = [];
  selectedGender = {name: 'Male', code: 1};

  firstName = '';
  surname = '';
  gender = '';
  selectedBirthDay?: Date;
  placeOfBirth = '';
  country = '';
  username = '';
  email = ''

  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService,
    private authService: MsalService,
    private employeeService: EmployeeService,
    private notifier: NotifierService,
    private formBuilder: FormBuilder,) {
      this.genders.push({name: 'Female', code: 2});
      this.genders.push({name: 'Male', code: 1});
      this.selectedGender = this.genders[1];
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

  submit() {

    this.submitted = true;
    const stringDate = this.dateToString(this.form.value.dateOfBirth);

    const user = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      gender: this.form.value.selectedGender.name,
      email: this.form.value.email,
      username: this.form.value.username,
      placeOfBirth: this.form.value.placeOfBirth,
      dateOfBirth: stringDate,
      country: this.form.value.country,
    };

    console.log(stringDate);
    console.log(user);

    if (this.form.invalid) {
      return;
    }

    this.employeeService.addEmployee(user).subscribe(res => {
      // @ts-ignore
      if (res.success === 'Succeeded') {
        this.notifier.notify('success', 'Successful register!');
        this.router.navigate(['/consuls']);
      }
      else {
        this.notifier.notify('error', 'Write correct informations!');
      }
    });

  }
}
