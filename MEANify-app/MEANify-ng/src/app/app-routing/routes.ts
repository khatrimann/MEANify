import { AuthGuardService } from './../services/auth-guard.service';
import { UploadComponent } from './../upload/upload.component';
import { ProfileComponent } from './../profile/profile.component';
import { ListensongComponent } from './../listensong/listensong.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './../home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'listensong/:id', component: ListensongComponent },
  { path: 'users/:id',     component: ProfileComponent },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuardService] },
];
