import { AddressService } from './../services/address.service';
import { AuthServiceService } from './../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id: Subject<string> = undefined;
  username: string = undefined;
  subscription: Subscription;
  isAuthenticated: Boolean;
  lawns: any;

  constructor(private authService: AuthServiceService, private addressService: AddressService) {
    this.authService.loadUserCredentials();
    this.id = authService.id;
    // console.log(this.id);
    this.addressService.getLawns(this.id).subscribe(lawns => this.lawns = lawns);
   }

  ngOnInit() {
    // this.authService.loadUserCredentials();
    this.id = this.authService.id;
    console.log(this.id);
  }

  print(query: any) {
    console.log(query);
  }
}
