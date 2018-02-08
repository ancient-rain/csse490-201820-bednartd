import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-couple-providers',
  template: `
  <h2>A component hosts two products that are each provided by different services</h2>
  <app-first-product></app-first-product>
  <br>
  <app-second-product></app-second-product>
`,
  styles: []
})
export class CoupleProvidersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
