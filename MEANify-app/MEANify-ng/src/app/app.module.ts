import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { baseURL } from './shared/baseurl';

import 'hammerjs';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlaylistComponent } from './playlist/playlist.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';

import { PlaylistService } from './services/playlist.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { SongService } from './services/song.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';


import { AppRoutingModule } from './app-routing/app-routing.module';
import { OneplaylistComponent } from './oneplaylist/oneplaylist.component';
import { SongComponent } from './song/song.component';
import { HomeComponent } from './home/home.component';
import { ListensongComponent } from './listensong/listensong.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    OneplaylistComponent,
    SongComponent,
    HomeComponent,
    ListensongComponent,
    HeaderComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    PlaylistService,
    ProcessHTTPMsgService,
    SongService,
    AuthService,
    AuthGuardService,
    {provide: 'BaseURL', useValue: baseURL}
  ],
  bootstrap: [AppComponent],
  exports: [
    LoginComponent
  ]
})
export class AppModule { }
