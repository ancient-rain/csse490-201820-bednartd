import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ROUTING } from './app-routing.module';

import { MaterialModule } from './material/material.module';

import { OurFormsModule } from './forms/forms.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ROUTING,
    BrowserAnimationsModule,
    OurFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
