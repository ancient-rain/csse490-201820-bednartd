import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-observables-events',
  template: `<div class=main>
  <h2>Observable events demo</h2>

  <mat-form-field>
    <input matInput type="text"
      placeholder="Enter stock"
      [formControl]="searchInput">
  </mat-form-field>

  <h3>{{stockPrice}}</h3>
  </div>
  `,
  styles: []
})
export class ObservablesEventsComponent implements OnInit {

  searchInput: FormControl = new FormControl('');
  stockPrice: string;

  constructor() {

    this.searchInput
      .valueChanges
      .debounceTime(500)
      .subscribe(stock => this.getStockQuoteFromServer(stock));
  }

  getStockQuoteFromServer(stock: string) {
    this.stockPrice = `The price of ${stock} is ${(100 * Math.random()).toFixed(4)}`;
  }

  ngOnInit() {
  }

}
