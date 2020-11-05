import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { MatTable } from "@angular/material/table";
import { MatTableDataSource } from "@angular/material/table";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatButton } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';




export interface UsersData {
  id: number;
  session_date: Date;
  session_time: Date;
  session_location: string;
  group_name: string;
  actions: MatButton;
}
@Component({
  selector: "app-viewsession",
  templateUrl: "./viewsession.component.html",
  styleUrls: ["./viewsession.component.scss"],
})
export class ViewsessionComponent implements OnInit {
  // currr_id = this.router.url.split("/")[2];
  displayedColumns: string[] = [
    "id",
    "session_date",
    "session_starttime",
    "session_endtime",
    "session_location",
    "group_name",
    "actions",
  ];
  dataSource;
  apidata: any[];
  view;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('deleteAPIDialog') deleteAPIDialog: TemplateRef<any>;

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar, private dialog: MatDialog) { }
  success;
  message;
  // error;
  ngOnInit(): void {
    this.http.post<UsersData[]>("/api/viewsession", {})
      .subscribe((resp: UsersData[]) => {
        this.view = resp;
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
      });
  }
  submit(action, id) {
    console.log(id)
    console.log(action);

    this.router.navigate(["/session/" + id + '/' + action]);
  }

  sessioncreate() {
    this.router.navigate(["/pptsession"]);
  }
  delete(id) {
    // console.log(id);
    // this.http.post("/api/deletesession", { id })
    // .subscribe((resp) => {
    //   console.log(resp);
    //   this.success = "Session deleted successfully!!";
    //         this.ngOnInit();
    //       })
    
    let dialogRef = this.dialog.open(this.deleteAPIDialog);
        dialogRef.afterClosed().subscribe(result => {
            // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
            if (result !== undefined) {
                if (result === 'yes') {
                    // TODO: Replace the following line with your code.
                    this.http.post("/api/deletesession", { id })
                    .subscribe((resp) => {
                      this.message=resp;
                      this.ngOnInit();
                  this._snackBar.open(this.message["message"], "close", {
                    duration: 1000,
                  }); 
                      
              })
                    console.log('User clicked yes.');
                } else if (result === 'no') {
                    // TODO: Replace the following line with your code.
                    console.log('User clicked no.');
                }
            }
        })
         

  }
  back() {
    this.router.navigate(["/pptsession"]);
  }

}
