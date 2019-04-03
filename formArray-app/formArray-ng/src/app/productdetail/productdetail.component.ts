import { Component, OnInit } from '@angular/core';
import { PushService } from '../services/push.service';
import { Product } from '../constants/product';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  product: Product;

  constructor(private pushService: PushService) {
    this.pushService.getProduct(this.pushService.getId()).subscribe(product => this.product = product);
  }

  ngOnInit() {
  }

}
