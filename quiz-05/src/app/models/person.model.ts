import { Address } from './index';

export class Person {
    id: number;
    name: string;
    phone: string;
    address: Address;

    constructor(obj?: any) {
      this.id = obj && Number(obj.id) || null;
      this.name = obj && obj.name || null;
      this.phone = obj && obj.phone || null;
      this.address = obj && obj.address || null;
    }
  }
