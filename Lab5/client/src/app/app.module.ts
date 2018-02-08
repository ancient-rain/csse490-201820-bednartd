import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GenerateScheduleComponent } from './generate-schedule/generate-schedule.component';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';


@NgModule({
  declarations: [
    AppComponent,
    GenerateScheduleComponent,
    ViewScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
