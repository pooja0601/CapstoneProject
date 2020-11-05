import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatTable } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-admin-feedback",
  templateUrl: "./admin-feedback.component.html",
  styleUrls: ["./admin-feedback.component.scss"],
})
export class AdminFeedbackComponent implements OnInit {
  displayedColumns: string[] = [
    "project_id",
    "group_name",
    "display",
    "displayComment",
    "fun",
    "funComment",
    "per",
    "perComment",
    "comments",
  ];
  indColumns: string[] = [
    "project_id",
    "display",
    "displayComment",
    "fun",
    "funComment",
    "per",
    "perComment",
    "comments",
  ];
  dataSource;
  indData;
  constructor(private http: HttpClient) {}
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild("groupPaginator")
  groupPaginator: MatPaginator;
  @ViewChild("indPaginator", { read: MatPaginator })
  indPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  view;
  view2;
  ngOnInit(): void {
    console.log("whattttt");
    this.http.post("/api/admin/getGroupFeedback", {}).subscribe((data) => {
      console.log(data);
      this.view = data;
      this.dataSource = new MatTableDataSource(this.view);
      this.dataSource.paginator = this.groupPaginator;
      this.dataSource.sort = this.sort;
    });
    this.http.post("/api/admin/getIndFeedback", {}).subscribe((data) => {
      console.log(data);
      this.view2 = data;
      this.indData = new MatTableDataSource(this.view2);
      this.indData.paginator = this.indPaginator;
      // this.indData.sort = this.sort2;
    });
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    this.indData.filter = value.trim().toLowerCase();
  };
}
