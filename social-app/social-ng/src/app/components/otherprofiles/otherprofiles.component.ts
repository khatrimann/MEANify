import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-otherprofiles',
  templateUrl: './otherprofiles.component.html',
  styleUrls: ['./otherprofiles.component.css']
})
export class OtherprofilesComponent implements OnInit {

  user: any;
  users: any;
  users_ids: any;
  constructor(private route: ActivatedRoute, private userService: UserService) {
    route.paramMap.subscribe(params => {
      const id = params.get('id');
      userService.getUser(id).subscribe(user => {
        this.user = user;
        console.log(user);
      });
    });

    userService.getUsers().subscribe(users => {
      this.users = [];
      this.users_ids = [];
      for (let i = 0; i < users.length; i++) {
        this.users.push(users[i].username);
        this.users_ids.push(users[i]._id);
      }
    });

  }

  ngOnInit() {
  }

}
