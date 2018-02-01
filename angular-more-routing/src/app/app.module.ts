import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/index';
import { ProductDetailComponent } from './components/index';
import { NavBarComponent } from './components/index';
import { ProductDescriptionComponent } from './components/index';
import { SellerInfoComponent } from './components/index';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDetailComponent,
    NavBarComponent,
    ProductDescriptionComponent,
    SellerInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
