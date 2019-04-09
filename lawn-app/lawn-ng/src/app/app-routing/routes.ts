import { HomeComponent } from './../home/home.component';
import { LoginComponent } from './../login/login.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];
