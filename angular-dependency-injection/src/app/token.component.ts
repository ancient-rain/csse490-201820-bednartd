import { Component, OnInit, InjectionToken, Inject } from '@angular/core';


@Component({
  selector: 'app-token',
  template: `
    <h2>Value for backend URL provided by InjectionToken</h2>
    <h3>
    URL: {{url}}
    </h3>
  `,
  styles: []
})
export class TokenComponent implements OnInit {
  url: string = 'www.bad-url.com'
  constructor( ) {}

  ngOnInit() {
  }

}
