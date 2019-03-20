import { AuthService } from './../services/auth.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../shared/user';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  username: string = undefined;
  id: Subject<string> = undefined;
  isloggedin: Boolean;
  subscriptionUser: Subscription;
  subscriptionId: Subscription;
  errMess: string;
  user: User;

  constructor(private authService: AuthService, private route: ActivatedRoute,
    private userService: UserService) {
    this.authService.loadUserCredentials();
    this.subscriptionUser = this.authService.getUsername()
      .subscribe(name => { console.log(name); this.username = name; });
      this.id = this.authService.id;
      console.log('Retrieved [form header] ' + this.id);
     }

  ngOnInit() {
  }

  onLogout() {
    console.log('Logging out...');
    this.username = undefined;
    this.authService.logOut();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('invoked');
    this.authService.loadUserCredentials();
    this.subscriptionUser = this.authService.getUsername()
      .subscribe(name => { console.log(name); this.username = name; });
      this.id = this.authService.id;
      console.log('Retrieved [form header] ' + this.id);
  }

}
