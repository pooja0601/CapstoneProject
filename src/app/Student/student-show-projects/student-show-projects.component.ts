import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { User, Role } from "../../_models";
import { AuthenticationService } from "@app/_services";

@Component({
  selector: 'app-student-show-projects',
  templateUrl: './student-show-projects.component.html',
  styleUrls: ['./student-show-projects.component.scss']
})
export class StudentShowProjectsComponent implements OnInit {

  private view;
  displayedColumns: string[] = ['id', 'title', 'supervisorNames', 'description', 'unitCode', 'actions'];
  dataSource;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  currentUser: User;
  //availUser: User;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }
  ngOnInit(): void {
    this.http.post("/api/getStudentsProjects", { course: this.currentUser.course}).subscribe(resp => {
      console.log(resp);
      this.view = resp;
      console.log('view:', this.view)
      this.dataSource = resp;

    });

  }

  
}
