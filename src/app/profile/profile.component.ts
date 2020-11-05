import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { User, Role } from "../_models";
import { AuthenticationService } from "@app/_services";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  name = "Angular 4";
  url = "";
  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    console.log(this.currentUser.username);
  }
  view;
  currentUser;
  user;
  student = false;
  ngOnInit(): void {
    this.http
      .post("/api/profile", { studentid: this.currentUser.username })
      .subscribe((resp) => {
        console.log(resp);
        this.user = this.currentUser.role;
        if (this.user === "Student") {
          this.student = true;
        }
        this.view = resp;
        console.log("view:", this.view);
      });
  }

  changepwd() {
    this.router.navigate(["/resetpassword"]);
  }
}
