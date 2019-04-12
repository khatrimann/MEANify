import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LawnComponent } from './lawn/lawn.component';
import { ChartsModule } from 'ng2-charts';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LawnComponent,
    AddComponent
  ],
  imports: [
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBfZuebKAQlVtruGr8j3eYpOpeOg7kim2Y'}),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
