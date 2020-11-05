import { Router } from '@angular/router';
import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTable } from "@angular/material/table";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
export interface UsersData {
  Student_id: string;
  Total_Ind1: number;
  Total_Ind2: number;
  Total_Ind3: number;
  Group_Progress_5: number;
  Group_Progress_9: number;
  Final_Group_13: number;
  Group_Presentation: number;
  Final_mark: number;

}
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";@Component({
  selector: 'app-show-students-marks',
  templateUrl: './show-students-marks.component.html',
  styleUrls: ['./show-students-marks.component.scss']
})

export class ShowStudentsMarksComponent implements OnInit {
  profileForm = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
    supervisor: new FormControl(""),
    id: new FormControl(""),
  });
  constructor(fb: FormBuilder, private http: HttpClient, private router: Router) {

    this.profileForm = fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      supervisor: ["", Validators.required],
      id: ["", Validators.required],
    });
  }
  marks;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  displayedColumns: string[] = ['Student_id','Total_Ind1', 'Total_Ind2','Total_Ind3', 'Group_Progress_5','Group_Progress_9',
    'Final_Group_13', 'Group_Presentation', 'Final_mark', 'actions'];
 // 'Individual_report_3', 'Individual_report_4', 'Individual_report_5', 'Individual_report_6', 'Individual_report_7',
 // 'Individual_report_8', 'Individual_report_9', 'Individual_report_10', 'Individual_report_11', 'Individual_report_12', 'Individual_report_13',
  formula;
  dataSource;
  ngOnInit(): void {
    //this.http.post("/api/ViewStudentsMarks", {}).subscribe(resp => {
    //  console.log(resp);
    //  this.marks = resp;
    //  console.log('formula:', this.formula);
    //  this.dataSource = resp;
    //});

    this.http
      .post<UsersData[]>("/api/ViewStudentsMarks", {})
      .subscribe((resp: UsersData[]) => {
        console.log(resp);
        this.marks = resp;
        // console.log('view:', this.view)
        this.dataSource = new MatTableDataSource(this.marks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  edit(id) {
    console.log(id);
    this.router.navigate(['/CalculateStudentMark/' + id]);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
