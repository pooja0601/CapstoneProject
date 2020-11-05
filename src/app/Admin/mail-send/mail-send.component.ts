import { Component, OnInit, Inject } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  EmailValidator,
} from "@angular/forms";
import { MaterialModule } from "../../material/material.module";
import { HttpClient } from "@angular/common/http";
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
} from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-mail-send",
  templateUrl: "./mail-send.component.html",
  styleUrls: ["./mail-send.component.scss"],
})
export class MailSendComponent implements OnInit {
  specificUsers: boolean;
  allClients = [];

  mailForm = new FormGroup({
    emailId: new FormControl(""),
    emailContent: new FormControl(""),
    subject: new FormControl(""),
  });

  constructor(
    fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.mailForm = fb.group({
      emailId: ["", Validators.required],
      subject: ["", Validators.required],
      emailContent: ["", Validators.required],
    });
  }

  emails;
  sendTo(event) {
    //console.log(event);

    if (event === "specificUser") {
      this.specificUsers = true;
    } else {
      this.specificUsers = false;
      if (event == "allStudents") {
        this.http
          .post("/api/getMails", { searchString: "Student" })
          .subscribe((data) => {
            console.log(data);
            this.emails = data;
            // console.log("emails", this.emails);
          });
      } else if (event == "allClients") {
        this.http
          .post("/api/getMails", { searchString: "Client" })
          .subscribe((data1) => {
            console.log(data1);
            this.emails = data1;

            // console.log("emails", this.emails);
          });
      }
    }
  }
  submitForm() {
    if (this.specificUsers) {
      this.http
        .post("/api/sendMail", {
          emailId: this.mailForm.value.emailId,
          subject: this.mailForm.value.subject,
          emailContent: this.mailForm.value.emailContent,
        })
        .subscribe((data) => {
          console.log(data);
        });
    } else {
      this.emails.forEach((email) => {
        this.http
          .post("/api/sendMail", {
            emailId: email.email,
            emailContent: this.mailForm.value.emailContent,
          })
          .subscribe((data) => {
            console.log(data);
          });
      });
    }
    this.snackBar.open("Mail Sent Successfully", "Dismiss", {
      verticalPosition: "top",
      horizontalPosition: "end",
      duration: 2000,
    });

    this.router.navigate(["/"]);
  }
  ngOnInit(): void {}
}
