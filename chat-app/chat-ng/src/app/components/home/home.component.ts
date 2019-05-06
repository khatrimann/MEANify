import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message: string;
  to: string;
  messages: string[] = [];
  users;
  username: string = undefined;
  interval: any;
  userSubscription: Subscription;
  chatSubscription: Subscription;

  constructor(private chatService: ChatService, private userService: UserService, private authService: AuthService) {

   this.userSubscription = userService.getUsers().subscribe(users => {
      this.users = users;
  });

    this.username = authService.string_user;

    this.chatSubscription =  this.chatService
    .getMessages()
    .subscribe((message: string) => {
      this.messages.push(message);
    });

    this.interval = setInterval(() => {
      userService.getUsers().subscribe(users => {
        this.users = users;
    });
    }, 10000);
  }

  sendMessageTo() {
    console.log(this.to);
    if (this.message ) {
      this.messages.push(this.username + ': ' + this.message);
      this.chatService.sendMessageTo(this.to, this.username, this.message);
      console.log(this.to);
      this.message = '';
    }

  }
  ngOnInit() {
  this.chatService
    .getMessages()
    .subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  logout() {
    clearInterval(this.interval);
    this.userSubscription.unsubscribe();
    this.chatSubscription.unsubscribe();
    this.authService.logOut();
  }
}
