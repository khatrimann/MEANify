import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PushService } from '../services/push.service';
import { Product } from '../constants/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  product: Product;
  updateForm: FormGroup;
  id: string;
  success: boolean;

  constructor(private pushService: PushService, private route: ActivatedRoute) {

    this.updateForm = new FormGroup({
      name: new FormControl(''),
      SKU: new FormControl(''),
      quantity: new FormControl('')
    });

    this.updateForm.controls['name'].setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(30)]);

    this.updateForm.controls['SKU'].setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(30)]);

    this.updateForm.controls['quantity'].setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(30)]);

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.id = id;
      console.log(id);
      this.pushService.getProduct(id).subscribe(product => {
        this.product = product;
        this.updateForm.patchValue({
          name: this.product.name,
          SKU: this.product.SKU,
          quantity: this.product.quantity
        });
      });
    });
  }

  ngOnInit() {  }

  updateProduct() {
    console.log(this.updateForm.value);
    this.pushService.putData(this.id, this.updateForm.value).subscribe(res => this.success = res.success);
    // this.updateForm.reset();
  }

}
