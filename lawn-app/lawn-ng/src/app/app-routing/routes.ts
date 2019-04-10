import { LawnComponent } from './../lawn/lawn.component';
import { HomeComponent } from './../home/home.component';
import { LoginComponent } from './../login/login.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'lawns/:id', component: LawnComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];
