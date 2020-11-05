import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  FormArray,
  Validators,
} from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/_services";
import { User } from "@app/_models";
import { Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";

export interface Card {
  title: string;
  supervisor: string;
  description: string;
}
@Component({
  selector: "app-view-projects",
  templateUrl: "./view-projects.component.html",
  styleUrls: ["./view-projects.component.scss"],
})
export class ViewProjectsComponent implements OnInit {
  projects;
  selected = "";
  currentUser: User;
  groupCourse: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit(): void {
    this.groupCourse = false;
    this.selectedCourse(this.currentUser.course);
  }
  viewProject(projectId, mode) {
    this.router.navigate(["/student/project/" + projectId + "/mode/" + mode]);
  }
  selectedCourse(courseId) {
    if (courseId === "COMP5703") {
      this.groupCourse = true;
    }
    this.http
      .post<Card[]>("/api/student/getProjects", { data: courseId })
      .subscribe((resp: Card[]) => {
        this.projects = resp;
        this.dataSource = resp;
        console.log(this.dataSource);
        this.dataSource = new MatTableDataSource<Card>(resp);
        this.changeDetectorRef.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
      });
  }
  joinGroup() {
    this.router.navigate(["/student/view/groups"]);
  }
}
