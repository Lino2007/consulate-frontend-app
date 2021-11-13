import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;
  submitted = false;
  // @ts-ignore
  private readonly notifier: NotifierService;

  constructor(private formBuilder: FormBuilder,
              notifierService: NotifierService,
              private router: Router) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(2)
          ]
        ],
        password: [
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

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.notifier.notify('success', 'Successful register!');
    this.router.navigate(['/dashboard']);
  }
}
