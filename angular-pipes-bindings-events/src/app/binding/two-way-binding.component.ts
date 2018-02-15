import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-two-way-binding',
  template: `<div class=main>
  <h2>Two-way binding demo</h2>

  <mat-form-field>
  <input matInput type='text'
    placeholder= "Enter stock symbol"
    [(ngModel)] = "lastStockSymbol" />
  </mat-form-field>

  <h3>The value of lastStockSymbol is {{lastStockSymbol}} </h3>
  </div>
  `,
  styles: []
})
export class TwoWayBindingComponent implements OnInit {

  lastStockSymbol: string;

  constructor() {
    setTimeout(() => {
      // Code to get the last entered stock from
      // local history goes here (not implemented)

      this.lastStockSymbol = 'AAPL';
  }, 2000);
  }

  ngOnInit() {
  }

}
