import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-client-home",
  templateUrl: "./client-home.component.html",
  styleUrls: ["./client-home.component.scss"],
})
export class ClientHomeComponent implements OnInit {
  badgeCount;
  notifications;
  //let badgeCount;

  constructor(private http: HttpClient, private router: Router) {
    this.http.post("/api/getNotifications", {}).subscribe((data) => {
      console.log(data);

      this.notifications = data;
      console.log(this.notifications.length);
      this.badgeCount = this.notifications.length;
    });
  }

  ngOnInit(): void {}

  clearBadgeCount() {
    this.badgeCount = 0;
  }

  openNotificationPage() {
    this.router.navigate(["/notifications"]);
  }
}
