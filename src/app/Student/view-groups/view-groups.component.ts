import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "@app/_services";
import { User } from "@app/_models";
import { FormControl, FormGroup } from "@angular/forms";
import {
  MatAccordion,
  MatExpansionPanelHeader,
} from "@angular/material/expansion";
import { MatDialog } from "@angular/material/dialog";
import { JoinGroupComponent } from "../join-group/join-group.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-groups",
  templateUrl: "./view-groups.component.html",
  styleUrls: ["./view-groups.component.scss"],
})
export class ViewGroupsComponent implements OnInit {
  projects;
  joinHidden;
  leaveBtnHidden;
  projectId;
  groupName;
  currentUser: User;
  profileForm = new FormGroup({
    name: new FormControl(""),
  });
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit(): void {
    this.leaveBtnHidden = false;
    this.http
      .post("/api/student/getProjects", { data: this.currentUser.course })
      .subscribe((data) => {
        this.projects = data;
        this.projects.forEach((project) => {
          this.http
            .post("/api/student/getGroups", { projectId: project.project_id })
            .subscribe((data) => {
              project["groups"] = data;
              const name = this.currentUser.username;
              project["groups"].forEach((d) => {
                console.log(d);
                if (
                  name === d.student_one ||
                  name === d.student_two ||
                  name === d.student_three ||
                  name === d.student_four ||
                  name === d.student_five
                ) {
                  this.joinHidden = true;
                  d["isHidden"] = true;
                }
              });
              console.log(this.projects);
            });
        });
      });
  }
  joinGroup(user, groupName, projectId) {
    // console.log(User);
    // console.log(this.accordion._headers.find((h) => h._isExpanded()));
    let dialogRef = this.dialog.open(JoinGroupComponent, {
      data: {
        projectId,
        groupName,
        user,
        joinBtn: true,
      },
      height: "80vh",
      width: "60vw",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result.event);
      if (result.event === "Join") {
        this.joinHidden = true;
      }
      this.router.navigate(["/student/projectDetails"]);
    });

    // const name = User.firstName + User.lastName;
    // this.profileForm.get("name").setValue(name);
  }

  leaveGroup(user, groupName, projectId) {
    let dialogRef = this.dialog.open(JoinGroupComponent, {
      data: {
        projectId,
        groupName,
        user,
        leaveBtn: true,
      },
      height: "80vh",
      width: "60vw",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result.event);
      if (result.event === "Left Group") {
        this.joinHidden = false;
        console.log(this.projects);
        this.leaveBtnHidden = true;
      }
      this.router.navigate(["/student/projectDetails"]);
    });
  }
}
