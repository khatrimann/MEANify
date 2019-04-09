import { AuthServiceService } from './../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthServiceService, private route: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.loginForm.value);
    this.authService.logIn(this.loginForm.value).subscribe(res => console.log(res));
    this.route.navigate(['/home']);
  }

}
