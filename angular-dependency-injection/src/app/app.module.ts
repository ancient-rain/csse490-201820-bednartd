import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { OurMaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductBasicComponent } from './product-basic.component';
import { CoupleProvidersComponent } from './couple-providers/couple-providers.component';
import { FirstProductComponent } from './couple-providers/first-product.component';
import { SecondProductComponent } from './couple-providers/second-product.component';
import { ProductService } from './services/product.service';
import { MultipleProvidersComponent } from './multiple-providers/multiple-providers.component';
import { ThirdProductComponent } from './multiple-providers/third-product.component';
import { TokenComponent } from './token.component';

// Remove this after completing work on product basic component.
import { BigProductService } from './services/big-product.service';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductBasicComponent,
    CoupleProvidersComponent,
    FirstProductComponent,
    SecondProductComponent,
    MultipleProvidersComponent,
    ThirdProductComponent,
    TokenComponent,
  ],
  imports: [
    BrowserModule,
    OurMaterialModule,
    AppRoutingModule
  ],
  providers: [{provide: ProductService, useClass: BigProductService}],
  // providers: [ProductService, // DO NOT USE FOR product-basic component
  //   {provide: "IS_DEV_ENVIRONMENT", useValue: false}, // only use with multiple providers component
  //   {provide: BackendUrl, useValue: 'myQAserver.com'} // Use only with token component
  // ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
