import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservablesEventsComponent } from './observables-events.component';
import { ObservablesEventsHttpComponent } from './observables-events-http.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [ObservablesEventsComponent, ObservablesEventsHttpComponent]
})
export class ObservablesModule { }
