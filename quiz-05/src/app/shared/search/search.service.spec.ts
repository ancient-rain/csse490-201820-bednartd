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
          { 'name': 'John Elway' },
          { 'name': 'Gary Kubiak' }
        ];

        // DONE: Add your test code here
        // expect(1).toBe(2);
        searchService.search('').subscribe(results => {
          expect(results.name).toBeTruthy('John Elway'); // FEEDBACK: results is an array
        });

        // Except that a single request has been made that matches the given
        // URL and flushes a mocked response
        // DONE: Add Code here
        // FEEDBACK: backend.expectOne('assets/data/people.json') (-1)
        const request = backend.expectOne('John Elway');
        request.flush(mockResponse, { status: 200, statusText: 'OK' });
      })));

  it(`should filter by search term`,
    async(inject([SearchService, HttpTestingController],
      (searchService: SearchService, backend: HttpTestingController) => {

        // setup the mock object to use to determine response.
        // In this case one of these objects. You can make assertions
        // or expectations against the expected results.
        const mockResponse = [
          { 'name': 'John Elway' },
          { 'name': 'Gary Kubiak' }
        ];


        // TODO: Add your test code here
        // expect(1).toBe(2);
        searchService.search('John').subscribe(results => {
          expect(results.name).toBeTruthy('John Elway'); // FEEDBACK: results is an array
        });

        // Except that a single request has been made that matches the given
        // URL and flushes a mocked response
        // TODO: Add Code here
        // FEEDBACK: backend.expectOne('assets/data/people.json') (-1)
        const request = backend.expectOne('John Elway');
        request.flush(mockResponse, { status: 200, statusText: 'OK' });
      })));


  it(`should fetch by id`,
    async(inject([SearchService, HttpTestingController],
      (searchService: SearchService, backend: HttpTestingController) => {

        // setup the mock object to use to determine response.
        // In this case one of these objects. You can make assertions
        // or expectations against the expected results.
        const mockResponse = [
          { 'id': 1, 'name': 'John Elway' },
          { 'id': 2, 'name': 'Gary Kubiak' }
        ];

        // TODO: Add your test code here
        expect(1).toBe(2); // FEEDBACK: Remove this
        searchService.get(1).subscribe(results => {
          expect(results.name).toBeTruthy('John Elway'); // FEEDBACK: results is an array
        });

        // Except that a single request has been made that matches the given
        // URL and flushes a mocked response
        // TODO: Add Code here
        // FEEDBACK: backend.expectOne('assets/data/people.json') (-1)
        const request = backend.expectOne('John Elway');
        request.flush(mockResponse, { status: 200, statusText: 'OK' });
      })));

});
