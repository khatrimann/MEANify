import { LoadingService } from './services/loading.service';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  scroll = 0;
  start = 0;
  posts: any[] = [];
  constructor(private loadingService: LoadingService) {
    this.loadingService.getPosts(0).subscribe(res => {
      this.posts = res;
      console.log(this.posts);
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    console.log(this.posts);
   console.log('innerHeight: ' + window.innerHeight + ' scrolly ' + window.scrollY + 'body  height ' + document.body.offsetHeight);
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          console.log('at bottom');
          console.log('Ok');
          console.log('old array: ', this.posts);
          this.scroll += 1;
          this.start = this.scroll * 4;
          this.loadingService.getPosts(this.start).subscribe(res => {
            console.log('new array: ', res);
            res.forEach(element => {
              this.posts.push(element);
            });
          });
          console.log(this.posts);
      }
  }
}
