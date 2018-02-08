import { Component, OnInit } from '@angular/core';
import { Product } from './models/product';
import { ProductService } from './services/product.service';
import { BigProductService } from './services/big-product.service';

@Component({
  selector: 'app-product-basic',
  template:  `<div>
  <h1>Product Details</h1>
  <h2>Title: {{product.title}}</h2>
  <h2>Description: {{product.description}}</h2>
  <h2>Price: \${{product.price}}</h2>
</div>`,
  styles: []
})
export class ProductBasicComponent implements OnInit {

  product: Product;

  constructor(productService: ProductService) {

      this.product = productService.getProduct();
  }

  ngOnInit() {
  }

}
