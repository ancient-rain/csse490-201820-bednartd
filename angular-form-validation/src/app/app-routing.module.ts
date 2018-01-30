import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  TemplateDriven01Component,
  Reactive02Component,
  FormBuilder03Component
} from './forms/index';


export const ROUTES: Routes = [
  { path: 'template',      component: TemplateDriven01Component },
  { path: 'reactive', component: Reactive02Component },
  { path: 'builder', component: FormBuilder03Component }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
