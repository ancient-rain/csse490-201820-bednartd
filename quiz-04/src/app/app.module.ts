import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ROUTING } from './app-routing.module';

import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './guards/login.guard';
// import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpClientModule,
    MaterialModule,
    ROUTING
  ],
  providers: [LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
