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
export class HeaderComponent implements OnInit {

  username: string = undefined;
  id: Subscription;
  isloggedin: Boolean;
  subscriptionUser: Subscription;
  subscriptionId: Subscription;
  errMess: string;
  user: User;
  id2: Subject<string> = undefined;


  constructor(private authService: AuthService, private route: ActivatedRoute,
    private userService: UserService) {
    this.authService.loadUserCredentials();
    this.subscriptionUser = this.authService.getUsername()
      .subscribe(name => { console.log(name); this.username = name; });
      // this.subscriptionId = this.authService.getUserId().subscribe(id => {console.log(id); this.id = id; });
      this.id2 = authService.id;
      console.log('Retrieved [form header] ' + this.id2);
     }

  ngOnInit() {
  }

  onLogout() {
    console.log('Logging out...');
    this.username = undefined;
    this.authService.logOut();
  }
}
