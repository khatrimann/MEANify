import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { UserService } from './services/user.service';
import { ProcessHttpmsgService } from './services/process-httpmsg.service';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MentionModule } from 'angular-mentions';
import { LinkPipe } from './pipes/link.pipe';
import { RouterTransFormerDirective } from './directives/router-trans-former.directive';
import { OtherprofilesComponent } from './components/otherprofiles/otherprofiles.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    LinkPipe,
    RouterTransFormerDirective,
    OtherprofilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MentionModule
  ],
  providers: [
    UserService,
    ProcessHttpmsgService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
