import { Product } from './constants/product';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { PushService } from './services/push.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  form: FormGroup;
  limitExceeded = false;
  creds: FormArray;
  response: Product[];
  entries: FormArray;

  constructor(private fb: FormBuilder, private pushService: PushService){
    this.form = this.fb.group({
      entries: this.fb.array([]),
    });
    console.log(this.form.get('entries'));

  }

  ngOnInit() {
    this.pushService.getData().subscribe(res => { this.response = res; console.log(this.response)});
  }

  addCreds() {
    if ((<FormArray>this.form.get('entries')).length <= 4) {
      (<FormArray>this.form.get('entries')).push(this.fb.group({
        name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
        SKU: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
        quantity: [1, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]
      }));
    }
    console.log(this.form.get('entries').controls[0].controls.name.errors);
  }

  submitProduct() {
    let values = this.form.get('entries').value;
    console.log(values);
    this.pushService.pushData(values);

    for(var i=0;i<(<FormArray>this.form.get('entries')).length;i++) {
      (<FormArray>this.form.get('entries')).removeAt(-1);
    }
    this.form.reset();
    this.pushService.getData().subscribe(res => { this.response = res; console.log(this.response); });
  }

  trackByFn(index: any, item: any) {
    return index;
 }

 removeProduct(index: number) {
   console.log(index);
   (<FormArray>this.form.get('entries')).removeAt(index);
   let values = this.form.get('entries').value;
    console.log(values);
 }

 removeProductfromDb(id: string) {
   console.log(id);
    this.pushService.removeProductfromDb(id);
    this.pushService.getData().subscribe(res => { this.response = res; console.log(this.response); });
 }

}
