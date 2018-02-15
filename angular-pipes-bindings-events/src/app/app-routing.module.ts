import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  TemperaturePipeComponent,
} from './pipes/index';

import {
  AttributeVsPropertyComponent,
  TemplateBindingComponent,
  TwoWayBindingComponent
} from './binding/index';

import {
  ObservablesEventsComponent,
  ObservablesEventsHttpComponent
} from './observables/index';




export const ROUTES: Routes = [
  { path: 'temp-pipe',      component: TemperaturePipeComponent },
  { path: 'binding',      component: AttributeVsPropertyComponent },
  { path: 'template-binding',      component: TemplateBindingComponent },
  { path: 'two-way-binding',      component: TwoWayBindingComponent },
  { path: 'observables-events',      component: ObservablesEventsComponent },
  { path: 'observables-events-http',      component: ObservablesEventsHttpComponent },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
