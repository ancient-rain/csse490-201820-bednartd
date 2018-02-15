import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeVsPropertyComponent } from './index';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateBindingComponent } from './template-binding.component';
import { TwoWayBindingComponent } from './two-way-binding.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AttributeVsPropertyComponent, TemplateBindingComponent, TwoWayBindingComponent],

})
export class BindingModule { }
