import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PushService } from '../services/push.service';
import { Product } from '../constants/product';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  product: Product;
  updateForm: FormGroup;

  constructor(private pushService: PushService, private route: ActivatedRoute) {

    this.updateForm = new FormGroup({
      name: new FormControl(''),
      SKU: new FormControl(''),
      qty: new FormControl('')
    });

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      console.log(id);
      this.pushService.getProduct(id).subscribe(product => {
        this.product = product;
        this.updateForm.patchValue({
          name: this.product.name,
          SKU: this.product.SKU,
          qty: this.product.quantity
        });
      });
    });
  }

  ngOnInit() {  }

}
