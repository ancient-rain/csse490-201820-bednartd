import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-binding',
  template: `<div class=main>
  <h2>Template binding demo</h2>

  <button mat-raised-button (click)="flag = !flag">Toggle flag's value</button>

  <p>
    Flag's value: {{flag}}
  </p>

  <p>
   1. span with *ngIf="flag": <span *ngIf="flag">Flag is true</span>
  </p>

  <p>
    2. ng-template with [ngIf]="flag": <ng-template [ngIf]="flag">Flag is true</ng-template>
  </p>
  </div>
  `,
  styles: []
})
export class TemplateBindingComponent implements OnInit {
  flag: boolean;
  constructor() {
    this.flag = true;
  }

  ngOnInit() {
  }

}
