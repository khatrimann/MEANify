import { Component, OnInit } from '@angular/core';
import {  FileUploader, FileSelectDirective, FileUploadModule, FileItem } from 'ng2-file-upload/ng2-file-upload';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { ElementRef } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  uploadForm: FormGroup;
  public filePreviewPath: SafeUrl;
  pathimg: string;
  ppath: SafeUrl[] = [];

  public uploader: FileUploader = new FileUploader({
    isHTML5: true,
    itemAlias: 'imageFile',
  });

  title = 'Angular File Upload';
  constructor(private fb: FormBuilder, private http: HttpClient, private sanitizer: DomSanitizer ) {
    this.uploader.onAfterAddingFile = (fileItem) => {
      this.filePreviewPath  = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file)));
      this.ppath.push(this.filePreviewPath);
    };
   }

  uploadSubmit(){
        for (let i = 0; i < this.uploader.queue.length; i++) {
          let fileItem = this.uploader.queue[i]._file;
          console.log(fileItem);
          if(fileItem.size > 10000000){
            alert("Each File should be less than 10 MB of size.");
            return;
          }
        }
        for (let j = 0; j < this.uploader.queue.length; j++) {
          let data = new FormData();
          let fileItem = this.uploader.queue[j]._file;
          console.log(fileItem);
          data.append('imageFile', fileItem);
          data.append('fileSeq', 'seq'+j);
          data.append( 'dataType', this.uploadForm.controls.type.value);
          this.uploadFile(data).subscribe(data => alert(data.message));
        }
        this.uploader.clearQueue();
  }

  uploadFile(data: FormData): Observable<any> {
    console.log(data);
    return this.http.post('http://localhost:3000/upload', data);
  }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      document: [null, null],
      type:  [null, Validators.compose([Validators.required])]
    });
  }
  removeIndex(index: number) {
    console.log(index);
    console.log(this.ppath[index]);
    delete this.ppath[index];
  }


}
