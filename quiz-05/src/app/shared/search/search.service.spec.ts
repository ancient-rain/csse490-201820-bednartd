import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));

  it(`should retrieve all search results`,
  async(inject([SearchService, HttpTestingController],
    (searchService: SearchService, backend: HttpTestingController) => {

      // setup the mock object to use to determine response.
      // In this case everything. You can make assertions
      // or expectations against the expected results.
      const mockResponse = [
        {'name': 'John Elway'},
        {'name': 'Gary Kubiak'}
      ];

      // TODO: Add your test code here
      expect(1).toBe(2);

      // Except that a single request has been made that matches the given
      // URL and flushes a mocked response
      // TODO: Add Code here

  })));

  it(`should filter by search term`,
  async(inject([SearchService, HttpTestingController],
    (searchService: SearchService, backend: HttpTestingController) => {

      // setup the mock object to use to determine response.
      // In this case one of these objects. You can make assertions
      // or expectations against the expected results.
      const mockResponse = [
        {'name': 'John Elway'},
        {'name': 'Gary Kubiak'}
      ];


      // TODO: Add your test code here
      expect(1).toBe(2);

      // Except that a single request has been made that matches the given
      // URL and flushes a mocked response
      // TODO: Add Code here

  })));


  it(`should fetch by id`,
  async(inject([SearchService, HttpTestingController],
    (searchService: SearchService, backend: HttpTestingController) => {

      // setup the mock object to use to determine response.
      // In this case one of these objects. You can make assertions
      // or expectations against the expected results.
      const mockResponse = [
        {'id': 1, 'name': 'John Elway'},
        {'id': 2, 'name': 'Gary Kubiak'}
      ];

      // TODO: Add your test code here
      expect(1).toBe(2);

      // Except that a single request has been made that matches the given
      // URL and flushes a mocked response
      // TODO: Add Code here

  })));

});
