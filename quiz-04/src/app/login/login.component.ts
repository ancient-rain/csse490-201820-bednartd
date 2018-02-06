import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

function usernameValidator(control: FormControl) {
  const value: string = control.value || '';
  const valid = User.isCorrectUsername(value);
  return valid ? null : {username: true};
}

function passwordValidator(control: FormControl) {
  return null;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Login';
  formGroup: FormGroup;

  constructor(fb: FormBuilder, private _router: Router) {
    this.formGroup = fb.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', [Validators.required, passwordValidator])
    });
  }

  ngOnInit() {
  }

  login(formValue: any, isFormValid: boolean) {
    if (isFormValid) {
      console.log('Logging in');
      console.log('Username', formValue['username']);
      console.log('Password', formValue['password']);
      this._router.navigate(['/home']);
    }
  }

}
