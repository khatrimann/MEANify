import { Config } from './../shared/config';
import { AuthService } from './../services/auth.service';
import { Song } from './../shared/song';
import { SongService } from './../services/song.service';
import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  songs: Song[];
  songErrMsg: string;
  subscriptionUser: Subscription;
  username: string = undefined;
  id: Subject<string> = undefined;


  constructor(private songService: SongService,
    private authService: AuthService,
    @Inject('BaseURL') private BaseURL) {
    }

  ngOnInit() {
    this.songService.getSongs()
    .subscribe(songs => this.songs = songs,
      errmess => this.songErrMsg = <any>errmess);
    }
}
