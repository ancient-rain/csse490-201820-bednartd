import { NgModule } from '@angular/core';
import { TemplateDriven01Component } from './index';
import { Reactive02Component } from './index';
import { FormBuilder03Component } from './index';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TemplateDriven01Component,
    Reactive02Component,
    FormBuilder03Component
  ],
  exports: [
    TemplateDriven01Component,
    Reactive02Component,
    FormBuilder03Component
  ]
})
export class OurFormsModule { }
