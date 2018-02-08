import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-first-product',
  template: `
    <h3>
    {{product.title}}
    </h3>
  `,
  styles: []
})
export class FirstProductComponent implements OnInit {

  product: Product;

  constructor(private productService: ProductService) {
    this.product = productService.getProduct();
  }

  ngOnInit() {
  }

}
