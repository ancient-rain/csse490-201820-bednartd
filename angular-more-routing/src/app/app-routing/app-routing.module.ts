import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/index';
import { ProductDetailComponent } from '../components/index';
import { ProductDescriptionComponent } from '../components/index';
import { SellerInfoComponent } from '../components/index';

const routes: Routes = [
  {path: '',        component: HomeComponent},
  // can pass any static data. Does not replace passing data in path
  {path: 'product/:id', component: ProductDetailComponent,
    data: [{isProd: true}],
    children: [
      {path: 'prod-description', component: ProductDescriptionComponent},
      {path: 'seller/:id', component: SellerInfoComponent},
      // redirectTo value starts with a ‘/’ = absolute path
      // redirectTo value starts without a ‘/’ = relative path
      {path: '', redirectTo: 'prod-description', pathMatch: 'full'}
    ],
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
