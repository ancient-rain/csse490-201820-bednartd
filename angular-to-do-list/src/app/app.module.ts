import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ROUTING } from './app-routing.module';

import { MaterialModule } from './material/material.module';

import { ToDoModule } from './to-do/to-do.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ToDoService } from './services/to-do.service';

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
    ToDoModule
  ],
  providers: [ToDoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
