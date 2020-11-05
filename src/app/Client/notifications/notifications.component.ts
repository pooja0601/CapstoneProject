import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/_services";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit {
  notifications;
  currentUser;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );

    if (this.currentUser.role !== "Admin")
      this.http
        .post("/api/getNotifications", { emailId: this.currentUser.email })
        .subscribe((data) => {
          this.notifications = data;
        });
  }

  ngOnInit(): void {}
}
