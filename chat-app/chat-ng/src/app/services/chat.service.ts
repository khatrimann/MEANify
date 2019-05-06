import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    private url = 'http://localhost:3000';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message) {
      this.socket.emit('new-message', message);
    }

    public sendId(id) {
      this.socket.emit('login', id);
    }

    public sendMessageTo(to, message) {
      this.socket.emit('msg', { message: message, to: to });
    }

    public getMessages = () => {
      return Observable.create((observer) => {
          this.socket.on('pmsg', (message) => {
            console.log(message);
              observer.next(message);
          });
      });
    }


}
