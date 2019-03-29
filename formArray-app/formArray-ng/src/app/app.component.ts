import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { PushService } from './services/push.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;
  limitExceeded = false;
  creds: FormArray;

  constructor(private fb: FormBuilder, private pushService: PushService) {
    this.form = this.fb.group({
      entries: this.fb.array([]),
    });
    console.log(this.form.get('entries'));
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
}
