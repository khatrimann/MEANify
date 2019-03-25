import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  subscriptionUser: Subscription;
  username: string = undefined;
  file = {artist: '', name: '', year: 0, uploadedby: '', genre: '', location: ''};
  constructor(private uploadService: UploadService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.loadUserCredentials();
    this.subscriptionUser = this.authService.getUsername()
      .subscribe(name => { console.log(name); this.username = name; });
  }

  upload() {
    this.file.uploadedby = this.username;
    console.log(this.file);
    this.uploadService.upload(this.file)
    .subscribe(res => console.log(res));
  }
}
