import { UserService } from './../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../shared/user';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username: string = undefined;
  isloggedin: Boolean;
  subscription: Subscription;
  subscriptionId: Subscription;
  errMess: string;
  id: Subject<string> = undefined;
  user: User;
  isAuthenticated: Boolean;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService) {
      this.subscription = this.authService.getUsername()
      .subscribe(name => { console.log(name); this.username = name; console.log('profile');
      console.log(this.username); });
      this.isAuthenticated = this.authService.isAuthenticated;
      this.id = authService.id;
      console.log('Retrieved [from profile] ' + this.id);
    }

  ngOnInit() {

  }

}
