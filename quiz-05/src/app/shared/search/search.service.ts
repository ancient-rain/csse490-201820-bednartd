import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Person } from '../../models/index';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>('assets/data/people.json');
  }

  search(q: string): Observable<any> {
    if (!q || q === '*') {
      q = '';
    } else {
      q = q.toLowerCase();
    }
    return this.getAll().switchMap(data => {
      const results: any = [];
      data.map(item => {
        // check for item in localStorage
        if (localStorage['person' + item.id]) {
          item = JSON.parse(localStorage['person' + item.id]);
        }
        if (JSON.stringify(item).toLowerCase().includes(q)) {
          results.push(item);
        }
      });
      return Observable.of(results);
    });
  }

  get(id: number) {
    return this.getAll().switchMap(all => {
      if (localStorage['person' + id]) {
        return Observable.of(JSON.parse(localStorage['person' + id]));
      }
      return Observable.of(all.find(e => e.id === id));
    });
  }

  save(person: Person) {
    localStorage['person' + person.id] = JSON.stringify(person);
  }
}
