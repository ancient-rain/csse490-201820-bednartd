import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-builder-03',
  templateUrl: './form-builder-03.component.html',
  styleUrls: ['./form-builder-03.component.css']
})
export class FormBuilder03Component implements OnInit {
  formModel: FormGroup;

  constructor(fb: FormBuilder) {
    this.formModel = fb.group({
      'username': [''],
      'ssn': [''],
      'passwordsGroup': fb.group({
        'password': [''],
        'pconfirm': ['']
      })
    });
  }


  ngOnInit() {
  }
  onSubmit() {
    console.log(this.formModel.value);
  }
}
