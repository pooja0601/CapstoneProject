import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { HttpEventType, HttpErrorResponse } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { FileService } from "../../file.service";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { User } from "src/app/_models";
import { AuthenticationService } from "src/app/_services";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-upload-details",
  templateUrl: "./upload-details.component.html",
  styleUrls: ["./upload-details.component.scss"],
})
export class UploadDetailsComponent implements OnInit {
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  files = [];
  selectedFile: boolean;

  currentUser: User;

  constructor(
    private uploadService: FileService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit(): void {}

  uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file.data);
    file.inProgress = true;
    this.uploadService
      .upload(formData)
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              file.progress = Math.round((event.loaded * 100) / event.total);
              break;
            case HttpEventType.Response:
              return event;
          }
          this.selectedFile = true;
        }),
        catchError((error: HttpErrorResponse) => {
          file.inProgress = false;
          return of(`${file.data.name} upload failed.`);
        })
      )
      .subscribe((event: any) => {
        if (typeof event === "object") {
          console.log(event.body);
        }
      });
  }

  private uploadFiles() {
    console.log("this.files:", this.files);
    this.fileUpload.nativeElement.value = "";
    this.files.forEach((file) => {
      this.uploadFile(file);
    });
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      console.log(fileUpload.files.length);
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({
          data: file,
          inProgress: false,
          progress: 0,
        });
      }

      this.uploadFiles();
    };
    fileUpload.click();
  }

  deleteFile(file) {
    console.log(file);
    this.files.splice(file);
  }

  sendCV() {
    if (this.files.length !== 0) {
      this.snackBar.open("Sent CV Successfully", "Dismiss", {
        verticalPosition: "top",
        horizontalPosition: "end",
        duration: 2000,
      });
      this.router.navigate(["/student/projectDetails"]);
    } else {
      this.snackBar.open("Please upload file", "Dismiss", {
        verticalPosition: "top",
        horizontalPosition: "end",
        duration: 2000,
      });
    }
  }
}
