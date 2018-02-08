import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiple-providers',
  template: `
  <h2>A component hosts two products and their values are provided by multiple services</h2>
  <app-first-product></app-first-product>
  <br>
  <app-third-product></app-third-product>
  `,
  styles: []
})
export class MultipleProvidersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
