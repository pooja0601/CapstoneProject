// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User, Role } from "../../_models";
import { AuthenticationService } from "@app/_services";

@Component({
  selector: 'app-viewslot',
  templateUrl: './viewslot.component.html',
  styleUrls: ['./viewslot.component.scss']
})
export class ViewslotComponent implements OnInit {
view;
currentUser: User;
id = this.router.url.split("/")[2];
groupName;



  displayedColumns: string[] = ['id','group_name', 'session_date', 'session_starttime', 'session_endtime', 'session_location'];
  dataSource;
  apidata: any[];

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(private http: HttpClient, 
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    console.log(this.currentUser.username);
    console.log(this.currentUser.course);
  }
    

  ngOnInit(): void {
    this.http.post("/api/checkgroup", {studentid: this.currentUser.username})
      .subscribe((resp)=>{
        console.log("student group:", resp);
        this.groupName= resp;
        console.log(this.groupName)
        
      this.http.post("/api/viewslot", { groupName: this.groupName, studentid: this.currentUser.username, courseid: this.currentUser.course})
      .subscribe(resp =>{ 
        console.log(resp);
      this.view =resp;
      this.dataSource = resp;
      });

      });
    }
  }
  


