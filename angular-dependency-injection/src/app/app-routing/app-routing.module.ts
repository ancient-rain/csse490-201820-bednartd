import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductBasicComponent } from '../product-basic.component';
import { CoupleProvidersComponent } from '../couple-providers/couple-providers.component';
import { MultipleProvidersComponent } from '../multiple-providers/multiple-providers.component';
import { TokenComponent } from '../token.component';

const routes: Routes = [
  {path: 'basic-product',        component: ProductBasicComponent},
  {path: 'couple-providers',        component: CoupleProvidersComponent},
  {path: 'multiple-providers',        component: MultipleProvidersComponent},
  {path: 'token',        component: TokenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
