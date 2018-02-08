import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from './product.service';

@Injectable()
export class MockProductService extends ProductService {

  constructor() {
    super();
  }

  getProduct(): Product {
    return new Product('Samsung Note 8');
  }

}
