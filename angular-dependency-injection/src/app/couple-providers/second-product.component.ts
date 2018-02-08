import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { MockProductService } from '../services/mock-product.service';

@Component({
  selector: 'app-second-product',
  template: `
    <h3>
    {{product.title}}
    </h3>
  `,
  styles: [],
})
export class SecondProductComponent implements OnInit {

  product: Product;

  constructor(private productService: ProductService) {
    this.product = productService.getProduct();
  }

  ngOnInit() {
  }

}
