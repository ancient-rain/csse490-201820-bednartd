import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ROUTING } from './app-routing.module';

import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { EditComponent } from './edit/edit.component';
import { SearchComponent } from './search/search.component';
import { SearchService } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SearchComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    ROUTING
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
