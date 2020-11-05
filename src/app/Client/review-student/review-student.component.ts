import { element } from "protractor";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User, Role } from "../../_models";
import { AuthenticationService } from "@app/_services";
import { MatSnackBar } from "@angular/material/snack-bar";
export interface PeriodicElement {
  id: number;
  name: string;
}

@Component({
  selector: "app-review-student",
  templateUrl: "./review-student.component.html",
  styleUrls: ["./review-student.component.scss"],
})
export class ReviewStudentComponent implements OnInit, PeriodicElement {
  view;
  files;
  currentUser: User;
  accept = true;
  checkedEvent;
  studentId;
  selectedIds = [];
  cpid;
  hidden = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackbar: MatSnackBar
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }
  id: number;
  name: string;
  projectIds;
  ipid = this.router.url.split("/")[2];
  ngOnInit(): void {
    console.log(this.ipid);

    this.http
      .post("/api/getProjects", { data: this.ipid })
      .subscribe((resp) => {
        this.view = resp;
        console.log(this.view);
      });
    this.http
      .post("/api/student/getUploadedFiles", {
        data: this.ipid,
      })
      .subscribe((data) => {
        console.log(data);
        this.files = data;
        this.files.forEach((file) => {
          file["projectTitle"] = this.view[0].title;
        });
        console.log(this.files);
      });
  }

  downloadFile(file) {
    const byteArray = new Uint8Array(file.cv.data);
    const a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(
      new Blob([byteArray], { type: "application/doc" })
    );

    console.log(a.href);

    // supply your own fileName here...
    a.download = file.filename;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  OnChange(event, sid, pid) {
    this.checkedEvent = event.checked;
    this.studentId = sid;
    this.cpid = pid;
    console.log(this.checkedEvent, this.studentId);
    if (this.checkedEvent === true) {
      console.log("true");
      this.selectedIds.push(this.studentId);
    } else {
      console.log("false");
      this.selectedIds = this.selectedIds.filter((v) => v !== this.studentId);
      console.log(this.selectedIds);
      this.hidden = false;
    }
    console.log(this.selectedIds);
  }

  submit(id) {
    if (this.selectedIds.length !== 1) {
      this.snackbar.open("Please select a student", "close", {
        duration: 1000,
      });
    } else {
      this.hidden = false;
      console.log("success");
      this.snackbar.open("Student has been approved", "close", {
        duration: 1000,
      });
      this.http
        .post("/api/studentApprove", {
          studid: this.selectedIds,
          cpid: this.cpid,
        })
        .subscribe((data) => {
          console.log(data);
        });
      this.router.navigate(["/approvedStudents"]);
    }
  }
  back() {
    this.router.navigate(["/viewProjectDetails"]);
  }
}
