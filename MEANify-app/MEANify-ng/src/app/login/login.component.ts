import { Location } from '@angular/common';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { User } from '../shared/user';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {


  username: string = undefined;
  id: Subscription;
  isloggedin: Boolean;
  subscription: Subscription;
  subscriptionId: Subscription;
  // user: User;
  user = {username: '', password: '', remember: false};
  errMess: string;
  id2: Subject<string> = undefined;

  constructor(private authService: AuthService,
    private router: Router, private location: Location,
    private userService: UserService) {}

  ngOnInit() {

  }

    onSubmit() {
    console.log('User: ', this.user);
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          console.log(res.success);
          this.user.username = '';
          this.user.password = '';
          this.user.remember = false;
        } else {
          console.log(res);
        }
      },
      error => {
        console.log(error);
        this.errMess = error;
      });
      // this.subscriptionId =  this.authService.getUserId().subscribe(id => {console.log(id); this.id = id; });
      this.id2 = this.authService.id;
      console.log(this.id2);
      this.router.navigate(['/users', this.id2]);

  }

}
