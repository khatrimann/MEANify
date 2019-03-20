import { SongService } from './../services/song.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router/';
import { Song } from '../shared/song';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';


@Component({
  selector: 'app-listensong',
  templateUrl: './listensong.component.html',
  styleUrls: ['./listensong.component.scss']
})
export class ListensongComponent implements OnInit {

  @Input()
  song: Song;

  comment: Comment;
  songIds: string[];
  prev: string;
  next: string;
  errMess: string;

  constructor(private songService: SongService, private route: ActivatedRoute,
    private location: Location,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.songService.getSongIds().subscribe(songIds => this.songIds = songIds);
    this.route.params.pipe(switchMap((params: Params) => this.songService.getSong(params['id']) ))
    .subscribe(song => { this.song = song;  this.setPrevNext(song.id);  },
      errmess => this.errMess = <any>errmess);
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(songId: string) {
    if (this.songIds) {
      const index = this.songIds.indexOf(songId);
      this.prev = this.songIds[(this.songIds.length + index - 1)%this.songIds.length];
      this.next = this.songIds[(this.songIds.length + index + 1)%this.songIds.length];
    }
  }
}
