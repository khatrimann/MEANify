import { Product } from './constants/product';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
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
    this.creds = this.form.controls.entries as FormArray;
    if (this.creds.length <= 4) {
      this.creds.push(this.fb.group({
        name: '',
        SKU: '',
        quantity: '',
      }));
    }
  }

  showConsole() {
    let values = this.form.get('entries').value;
    console.log(values);
    this.pushService.pushData(values);
  }

  trackByFn(index: any, item: any) {
    return index;
 }
}
