import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { MatTableDataSource } from "@angular/material/table";
import { EditGroupsDialogComponent } from "../edit-groups-dialog/edit-groups-dialog.component";
import {
  ConfirmDialogModel,
  PublishDialogComponent,
} from "../publish-dialog/publish-dialog.component";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";

export interface UsersData {
  id: number;
  project_name: string;
  group_name: string;
  student_one: string;
  student_two: string;
  student_three: string;
  student_four: string;
  student_five: string;
}

@Component({
  selector: "app-edit-groups",
  templateUrl: "./edit-groups.component.html",
  styleUrls: ["./edit-groups.component.scss"],
})
export class EditGroupsComponent implements OnInit {
  view;
  proj;
  //currr_id: number;
  //currr_id = this.router.url.split("/")[2];
  displayedColumns: string[] = [
    "project_id",
    "group_name",
    "student_one",
    "student_two",
    "student_three",
    "student_four",
    "student_five",
    "action",
  ];
  dataSource;
  //dataSource : MatTableDataSource<UsersData>;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.http
      .post<UsersData[]>("/api/getAllGroups", {})
      .subscribe((resp: UsersData[]) => {
        //this.http.post("/api/getAllGroups",{}).subscribe((resp) =>{
        console.log(resp);
        this.view = resp;
        console.log("view:", this.view);
        this.dataSource = new MatTableDataSource(resp);
        console.log(this.dataSource);
        //this.dataSource = resp;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(EditGroupsDialogComponent, {
      width: "550px",
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == "Update") {
        this.updateRowData(result.data);
      } else if (result.event == "Delete") {
        this.deleteRowData(result.data);
      }
    });
  }

  updateRowData(row_obj) {
    this.http
      .post("/api/updateGroupStudents", {
        id: row_obj.id,
        student_one: row_obj.student_one,
        student_two: row_obj.student_two,
        student_three: row_obj.student_three,
        student_four: row_obj.student_four,
        student_five: row_obj.student_five,
      })
      .subscribe((resp) => {
        console.log(resp);
        this.view = resp;
        console.log("view:", this.view);
      });

    location.reload();
  }

  deleteRowData(row_obj) {
    //this.dataSource = this.dataSource.filter((value,key)=>{
    //return value.id != row_obj.id;
    //});
    this.http
      .post("/api/deleteGroupName", {
        id: row_obj.id,
      })
      .subscribe((resp) => {
        console.log(resp);
      });
    //this.ngOnInit()
    location.reload();
  }

  getUstudents() {
    this.http.post("/api/getUnassignedStudents", {}).subscribe((resp) => {
      console.log(resp);

      this.proj = resp;
    });
  }

  result: string = "";

  publish() {
    const message = `Once Published, Students will not be able to Join or Leave Groups`;

    const dialogData = new ConfirmDialogModel(
      "Are you sure you want to Publish the Groups?",
      message
    );

    const dialogRef = this.dialog.open(PublishDialogComponent, {
      maxWidth: "400px",
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      console.log(dialogResult.event);
      console.log("result:", dialogResult);
      if (dialogResult == false) {
        this.result = dialogResult;
      } else if (dialogResult == true) {
        this.result = dialogResult;
        this.http.post("/api/publishStudentGroups", {}).subscribe((resp) => {
          console.log(resp);
          this.proj = resp;
        });

        this.snackBar.open("Project Groups finalised", "Close", {
          duration: 2000,
        });
      }
    });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
}
