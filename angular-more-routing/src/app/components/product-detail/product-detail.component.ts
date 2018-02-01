import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productID: number;
  isProdEnvironment: boolean;

  constructor(route: ActivatedRoute) { // inject ActivatedRoute object
    this.productID = route.snapshot.params['id'];
    this.isProdEnvironment = route.snapshot.data[0]['isProd'];
    console.log(`this.isProdEnvironment = ${this.isProdEnvironment}`);

}


  ngOnInit() {
  }

}
