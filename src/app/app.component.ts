import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MaterialModule } from "./material/material.module";

import { AuthenticationService } from "./_services";
import { User, Role } from "./_models";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app",
  templateUrl: "app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "cs68";
  currentUser: User;
  notifications;
  badgeCount;
  options: FormGroup;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    fb: FormBuilder
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.options = fb.group({
      bottom: 0,
      fixed: true,
      top: 0,
    });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isClient() {
    return this.currentUser.role === Role.Client;
  }

  get isStudent() {
    return this.currentUser.role === Role.Student;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }

  ngOnInit() {
    console.log("In ngOn", this.currentUser);

    if (this.currentUser.role !== "Admin") {
      this.http
        .post("/api/getNotifications", { emailId: this.currentUser.email })
        .subscribe((data) => {
          console.log(data);

          this.notifications = data;
          console.log(this.notifications.length);
          this.badgeCount = this.notifications.length;
        });
    }
  }

  clearBadgeCount() {
    this.badgeCount = 0;
  }

  openNotificationPage() {
    this.router.navigate(["/notifications"]);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {}
}
