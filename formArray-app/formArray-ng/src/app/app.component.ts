import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;
  limitExceeded = false;
  creds: FormArray;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      entries: this.fb.array([]),
    });
  }

  addCreds() {
    this.creds = this.form.controls.entries as FormArray;
    if (this.creds.length <= 4) {
      this.creds.push(this.fb.group({
        name: '',
        sku: '',
        qty: ''
      }));
    }
  }
}
