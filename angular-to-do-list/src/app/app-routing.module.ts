import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ToDoFormComponent,
  ToDoListComponent
} from './to-do/index';


export const ROUTES: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos',      component: ToDoListComponent },
  { path: 'todo-form', component: ToDoFormComponent },
  { path: 'todo-form/:id', component: ToDoFormComponent },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
