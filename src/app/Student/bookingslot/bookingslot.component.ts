import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { User, Role } from "../../_models";
import { AuthenticationService } from "@app/_services";
import { MatSnackBar } from "@angular/material/snack-bar";

import { MaterialModule } from "../../material/material.module";
@Component({
  selector: "app-bookingslot",
  templateUrl: "./bookingslot.component.html",
  styleUrls: ["./bookingslot.component.scss"],
})
export class BookingslotComponent implements OnInit {
  slotStored;
  currentUser: User;
  groupName;

  bookingForm = new FormGroup({
    group_name: new FormControl(""),
  });

  constructor(
    fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    console.log(this.currentUser.username);
    console.log(this.currentUser.course);
  }

  view;
  success;
  error;
  message;

  ngOnInit(): void {
    this.http.post("/api/bookingslot", {}).subscribe((resp) => {
      console.log(resp);
      this.view = resp;
      console.log("view:", this.view);
    });

    this.http
      .post("/api/checkgroup", { studentid: this.currentUser.username })
      .subscribe((resp) => {
        console.log("student group:", resp);
        this.groupName = resp;
      });

  }
  confirm(id) {
    // if(this.currentUser.course == "COMP5703")
    // {
    // if (this.groupName == "" || null) {
    //   this.router.navigate(["/home"]);
    //   this._snackBar.open("You have to select a project to book a presentation slot !", "close", {
    //     duration: 5000,
    //   });
    // }
  
     {
      this.http
        .post("/api/updateslot", {
          id,
          groupName: this.groupName,
          studentid: this.currentUser.username,
          courseid: this.currentUser.course,
        })
        .subscribe((resp) => {
          console.log(resp);
          this.message = resp;
          if (
            this.message["message"] == "Your group has already booked a slot !" || 
            this.message["message"] == "You have booked a slot for your group!" || 
            this.message["message"] == "You have booked a slot!"
          ) {
            this.router.navigate(["/viewslot"]);
            this._snackBar.open(this.message["message"], "close", {
              duration: 5000,
            });
          }
           else if (
            
            this.message["message"] == "You cannot book a slot as your project is rejected" || 
            this.message["message"] == "You cannot book a slot as your project is in pending status" || 
            this.message["message"] == "You have to select a project to book a presentation slot !" 
          
          ) {
            this.router.navigate(["/home"]);
            this._snackBar.open(this.message["message"], "close", {
              duration: 5000,
            });
          }

          // else {
          //   this.router.navigate(["/viewslot"]);
          //   this._snackBar.open(this.message["message"], "close", {
          //     duration: 5000,
          //   });
          // }
        });
    }
  }
}


