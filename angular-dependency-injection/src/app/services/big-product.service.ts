import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from './product.service';

@Injectable()
export class BigProductService extends ProductService {

  constructor() {
    super();
  }

  getProduct(): Product {
      const product = new Product('iPhone 7');
      product.productId = 0;
      product.productPrice = 249.99;
      product.productDescription = 'The latest iPhone, 7-inch screen';
      return product;
  }
}
