import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-driven-01',
  templateUrl: './template-driven-01.component.html',
  styleUrls: ['./template-driven-01.component.css'],
})
export class TemplateDriven01Component implements OnInit {
  formData: any;

  constructor() { }

  onSubmit(formData) {
    this.formData = formData;
    console.log(formData);
  }

  ngOnInit() {
    this.formData = {};
  }

}
