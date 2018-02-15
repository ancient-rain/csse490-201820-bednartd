import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attribute-vs-property',
  template: `<div class=main>
    <h2>Property vs attribute binding demo</h2>

    <mat-form-field>
      <input matInput
        placeholder="Change the value"
        [value]="greeting"
        [attr.value] = "greeting"
        (input)="onInputEvent($event)">
    </mat-form-field>


    <h3>The component's greeting-property-value = {{ greeting }}</h3>
    <h3>{{ attribute }}</h3>
    <h3>{{ property }}</h3>
  </div>
  `,
  styles: []
})
export class AttributeVsPropertyComponent implements OnInit {

  greeting: string;
  property: string;
  attribute: string;


  constructor() {
  }

  onInputEvent(event: Event): void {
    const inputElement: HTMLInputElement = <HTMLInputElement> event.target;

    this.property = `The property value of the DOM input element = ${inputElement.value}`;
    this.attribute = `The attribute value of the DOM input  element = ${inputElement.getAttribute('value')}`;
  }

  ngOnInit() {
    this.greeting = 'A value';
  }

}
