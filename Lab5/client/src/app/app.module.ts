import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { GenerateScheduleComponent } from './generate-schedule/generate-schedule.component';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GenerateScheduleComponent,
    ViewScheduleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
