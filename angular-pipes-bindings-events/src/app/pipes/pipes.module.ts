import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TemperaturePipe } from './index';
import { TemperaturePipeComponent } from './index';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TemperaturePipe,
    TemperaturePipeComponent
  ]
})
export class OurPipesModule { }
