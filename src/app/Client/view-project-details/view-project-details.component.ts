import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { User, Role } from "../../_models";
import { AuthenticationService } from "@app/_services";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-view-project-details",
  templateUrl: "./view-project-details.component.html",
  styleUrls: ["./view-project-details.component.scss"],
})
export class ViewProjectDetailsComponent implements OnInit {
  currentUser: User;
  @ViewChild("deleteAPIDialog") deleteAPIDialog: TemplateRef<any>;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  view;
  display;
  // approved;
  ngOnInit(): void {
    this.http
      .post("/api/getClientProjects", { clientId: this.currentUser.username })
      .subscribe((resp) => {
        this.view = resp;
        console.log(this.view);
        this.view.forEach((v) => {
          if (v.status == "pending") {
            console.log(v.status);
            v["approved"] = false;
          }
          if (v.status === "Approved" && v.mode === "individual") {
            v["isApproved"] = true;
          }
          if (v.IsAssigned == true) {
            v["assigned"] = true;
          } else {
            v["assigned"] = false;
          }
        });
      });
  }
  submit(id) {
    console.log(id);
    this.router.navigate(["/addProject/" + id]);
  }

  deleteHidden = false;

  delete(id) {
    console.log(id);
    console.log(this.view);
    let dialogRef = this.dialog.open(this.deleteAPIDialog);
    dialogRef.afterClosed().subscribe((result) => {
      // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
      if (result !== undefined) {
        if (result === "yes") {
          this.view = this.view.filter((v) => v.id !== id);
          console.log(this.view);

          this.http
            .post("/api/deleteClientProject", {
              clientId: this.currentUser.username,
              projectId: id,
            })
            .subscribe((resp) => {
              console.log(resp);
            });
          console.log("User clicked yes.");
        } else if (result === "no") {
          // TODO: Replace the following line with your code.
          console.log("User clicked no.");
        }
      }
    });
  }

  review(id) {
    console.log(id);
    this.router.navigate(["/reviewStudent/" + id]);
    // this.http
    //   .post("/api/getProjects", {
    //     clientId: this.currentUser.username,
    //     projectId: id,
    //   })
    //   .subscribe((resp) => {
    //     console.log(resp);
    //   });
  }

  viewProject(id) {
    console.log(id);
    this.router.navigate(["/viewProject/" + id]);
  }
}
