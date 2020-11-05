import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TESTINGComponent implements OnInit {
 // profileForm = new FormGroup({
 //   type: new FormControl(""),
 // });
  //private view;
  displayedColumns: string[] = ['id', 'title', 'supervisorNames', 'description', 'unitCode', 'status', 'actions'];
  projects;
  selected = "";
  dataSource;
  // projectForm = new FormGroup({
  //   course: new FormControl(""),
  // });
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {
    // this.projectForm = fb.group({
    //   course: ["", Validators.required],
    // });
  }

  ngOnInit(): void { }
  viewProject(projectId, mode) {
    this.router.navigate(["/student/project/" + projectId + "/mode/" + mode]);
  }
  selectedCourse(ProjectType) {
    console.log(ProjectType);
    this.http
      .post("/api/getProjectsforId", { data: ProjectType })
      .subscribe((data) => {
        // this.projects = data;
        console.log(data);
        this.projects = data;
        this.dataSource = data;
      });
  }


}
