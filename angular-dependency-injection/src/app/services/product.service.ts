import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable()
export class  ProductService {

  constructor() {}

  getProduct(): Product {
    // Code making an HTTP request to get actual product details
    // would go here
    return new Product('iPhone X');
  }

}
