import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn: Boolean = false;
  constructor(private authService: AuthService, private router: Router) {
    authService.loadUserCredentials();
    this.authService.getLoggedIn().subscribe(loggedin => {
      this.loggedIn = loggedin;
    });
   }

  ngOnInit() {
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

}
