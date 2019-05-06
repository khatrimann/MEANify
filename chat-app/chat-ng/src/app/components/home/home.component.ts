import { UserService } from './../../services/user.service';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private chatService: ChatService, private userService: UserService) {

    userService.getUsers().subscribe(users => {
      this.users = users;
  });

    this.chatService
    .getMessages()
    .subscribe((message: string) => {
      this.messages.push(message);
    });

    setInterval(() => {
      userService.getUsers().subscribe(users => {
        this.users = users;
    });
    }, 10000);
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  sendMessageTo() {
    console.log(this.to);
    this.chatService.sendMessageTo(this.to, this.message);
    console.log(this.to);
    this.message = '';
  }
  ngOnInit() {
  this.chatService
    .getMessages()
    .subscribe((message: string) => {
      this.messages.push(message);
    });
  }
}
