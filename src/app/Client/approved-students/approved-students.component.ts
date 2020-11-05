import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { User, Role } from "../../_models";
import { AuthenticationService } from "@app/_services";
import { MatTable } from "@angular/material/table";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";

@Component({
  selector: "app-approved-students",
  templateUrl: "./approved-students.component.html",
  styleUrls: ["./approved-students.component.scss"],
})
export class ApprovedStudentsComponent implements OnInit {
  currentUser: User;

  displayedColumns: string[] = [
    "no",
    "projectName",
    "projectId",
    "groupName",
    "student1",
    "student2",
    "student3",
    "student4",
    "student5",
    "feedback",
  ];
  indColumns: string[] = [
    "no",
    "projectName",
    "projectId",
    "student",
    "feedback",
  ];
  dataSource;
  indData;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snack: MatSnackBar
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit(): void {
    this.http
      .post("/api/client/getApprovedGroups", {
        mode: "group",
        cid: this.currentUser.username,
      })
      .subscribe((data) => {
        console.log(data);
        this.dataSource = data;
      });
    this.http
      .post("/api/client/getApprovedInds", {
        mode: "individual",
        cid: this.currentUser.username,
      })
      .subscribe((data) => {
        console.log(data);
        this.indData = data;
      });
  }

  // selectedCourse(id) {
  //   console.log(id);
  //   if (id == "group") {
  //     this.http
  //       .post("/api/client/getApprovedGroups", {
  //         mode: id,
  //         cid: this.currentUser.username,
  //       })
  //       .subscribe((data) => {
  //         //  console.log(data);

  //         this.dataSource = data;
  //         //console.log("datasource", this.dataSource);
  //       });
  //   }
  //   if (id == "individual") {
  //     this.http
  //       .post("/api/client/getApprovedInds", {
  //         mode: id,
  //         cid: this.currentUser.username,
  //       })
  //       .subscribe((data) => {
  //         console.log(data);
  //         this.dataSource = data;
  //         console.log(this.dataSource);
  //       });
  //   }
  //   if (id == "all") {
  //     this.http
  //       .post("/api/client/getApprovedStudents", {
  //         mode: id,
  //         cid: this.currentUser.username,
  //       })
  //       .subscribe((data) => {
  //         // console.log(data);
  //         this.dataSource = data;
  //       });
  //   }
  // }
  studentFeedback(pid, gid) {
    // console.log(id);
    // this.snack.open("Routing to feedback page", "close", {
    //   duration: 5000,
    // });
    this.router.navigate(["/feedback/" + pid + "/" + gid]);
  }
}
