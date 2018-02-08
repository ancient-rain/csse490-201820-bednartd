import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

function ssnValidator(control: FormControl): { [key: string]: any } {
  const value: string = control.value || '';
  const valid = value.match(/^\d{9}$/);
  return valid ? null : { ssn: true }; // null ⇒ no error
}

function equalValidator({ value }: FormGroup): { [key: string]: any } {
  // get names of all properties in values object using destructuring
  const [first, ...rest] = Object.keys(value || {});
  // iterate through all the values and make sure they are equal
  const valid = rest.every(v => value[v] === value[first]);
  return valid ? null : { equal: true }; // null or an error object
}

@Component({
  selector: 'app-reactive-02',
  templateUrl: './reactive-02.component.html',
  styleUrls: ['./reactive-02.component.css']
})
export class Reactive02Component implements OnInit {

  formModel: FormGroup;

  constructor() {
    this.formModel = new FormGroup({
      'username': new FormControl('', Validators.required), // Example 1, predefined standard validator
      'ssn': new FormControl('', ssnValidator),
      'passwordsGroup': new FormGroup({
        'password': new FormControl('', [Validators.minLength(5), Validators.required]),
        'pconfirm': new FormControl('')
      }, equalValidator)
    });
  }


  ngOnInit() {
  }

  onSubmit() {
    console.log(this.formModel.value);
  }

  get password() {
    return this.formModel.get('passwordsGroup.password');
  }
}
