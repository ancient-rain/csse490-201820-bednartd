import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-reactive-02',
  templateUrl: './reactive-02.component.html',
  styleUrls: ['./reactive-02.component.css']
})
export class Reactive02Component implements OnInit {

  formModel:  FormGroup;

  constructor() {
   this.formModel = new FormGroup({
      'username': new FormControl(), // Example 1, predefined standard validator
      'ssn': new FormControl(),
      'passwordsGroup': new FormGroup({
        'password': new FormControl(),
        'pconfirm': new FormControl()
      })
    });
  }


  ngOnInit() {
  }

  onSubmit() {
    console.log(this.formModel.value);
  }
}
