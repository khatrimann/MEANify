import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: string[] = [];
  postForm = new FormGroup({
    text: new FormControl('')
  });

  constructor(private userService: UserService) {
    userService.getUsers().subscribe(users => {
      this.users = [];
      for (let i = 0; i < users.length; i++) {
        this.users.push(users[i].username);
      }
    });
  }

  ngOnInit() {
  }

  onPost() {
    console.log(this.postForm.value);
  }

  inputChange(input) {
    console.log(input);
  }
}
