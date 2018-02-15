import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ROUTING } from './app-routing.module';

import { MaterialModule } from './material/material.module';

import { OurPipesModule } from './pipes/pipes.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BindingModule } from './binding/binding.module';
import { ObservablesModule } from './observables/observables.module';

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
    OurPipesModule,
    BindingModule,
    ObservablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
