import { HomeComponent } from './../home/home.component';
import { Routes } from '@angular/router';
import { ProductdetailComponent } from '../productdetail/productdetail.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'details/:id', component: ProductdetailComponent, data: { id: '/:id'} },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
