import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  // /login
  {
    path: 'login',
    component: LoginComponent
  },
  // /register
  {
    path: 'register',
    component: RegisterComponent
  },
  // /home
  {
    path: '',
    component: HomeComponent,
    canActivate: [LoginGuard],
  }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(routes);
