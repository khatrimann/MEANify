import { PostService } from './../../services/post.service';
import { AuthService } from './../../services/auth.service';
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
  users_ids: string[] = [];
  id: string;
  string_id: string;
  postForm = new FormGroup({
    text: new FormControl('')
  });
  posts: any;
  mentions: any;

  constructor(private userService: UserService, private authService: AuthService, private postService: PostService) {
    userService.getUsers().subscribe(users => {
      this.users = [];
      this.users_ids = [];
      for (let i = 0; i < users.length; i++) {
        this.users.push(users[i].username);
        this.users_ids.push(users[i]._id);
      }
      console.log(this.users);
      console.log(this.users_ids);
    });

    this.authService.getId().subscribe(id => {
      this.id = id;
      this.setId(id);
      console.log(this.id);

      this.postService.getPosts(id).subscribe(posts => {
        this.posts = posts;
        console.log(this.posts);
      });

      this.postService.getMentions(id).subscribe(mentions => {
        this.mentions = mentions;
        console.log(this.mentions);
      });

    });

    console.log(this.authService.string_id);
    console.log(this.getId());
    postService.getPosts(this.getId()).subscribe(posts => {
      this.posts = posts;
      console.log(this.posts);
    });

    console.log(this.getId());


  }

  ngOnInit() {
    this.authService.getId().subscribe(id => {
      this.id = id;
      this.setId(id);
      console.log(this.id);
      this.postService.getPosts(this.id).subscribe(posts => {
        this.posts = posts;
        console.log(this.posts);
      });

      this.postService.getMentions(this.id).subscribe(mentions => {
        this.mentions = mentions;
        console.log(this.mentions);
      });

    });



  }

  setId(id: string) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  onPost() {
    console.log(this.postForm.get('text').value);
    const text = this.postForm.get('text').value;
    const regex = /@\w+/gi;
    const result = text.match(regex);
    result.forEach(element => {
      element = element.slice(1, element.length);
      if (this.users.includes(element)) {
          console.log(element + ' is in users');
      }
    });
    console.log(this.getId());

    this.postService.postPost(this.getId(), { text : text}).subscribe(res => {
      console.log(res);
    });
  }

  inputChange(input) {
    console.log(input);
  }

}
