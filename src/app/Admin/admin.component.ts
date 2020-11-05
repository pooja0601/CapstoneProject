import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';
import { MaterialModule } from '../material/material.module';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  
import { UploadService } from  '../upload.service';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

export interface UsersData {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  course: string;
}

@Component({ 
selector: 'app-admin',
templateUrl: 'admin.component.html',
styleUrls: ['./admin.component.scss']})

export class AdminComponent implements OnInit {

  displayedColumns: string[] = [ 'firstName', 'lastName', 'role','email', 'course'];
  dataSource;

  view;
  proj;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChild( MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

    loading = false;
    users: User[] = [];

    @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  
    constructor(private userService: UserService, private uploadService: UploadService, private http: HttpClient) { }

    ngOnInit() {

        this.loading = true;
        this.http.post<UsersData[]>("/api/getAllUsers",{}).subscribe((resp: UsersData[]) =>{
          //this.http.post("/api/getAllGroups",{}).subscribe((resp) =>{  
        console.log(resp);
        this.view =resp;
        console.log('view:',this.view)
          this.dataSource = new MatTableDataSource(resp);
          //this.dataSource = resp;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    }


uploadFile(file) {  
    const formData = new FormData();  
    formData.append('file', file.data);  
    file.inProgress = true;  
    this.uploadService.upload(formData).pipe(  
      map(event => {  
        switch (event.type) {  
          case HttpEventType.UploadProgress:  
            file.progress = Math.round(event.loaded * 100 / event.total);  
            break;  
          case HttpEventType.Response:  
            return event;  
        }  
      }),  
      catchError((error: HttpErrorResponse) => {  
        file.inProgress = false;  
        return of(`${file.data.name} upload failed.`);  
      })).subscribe((event: any) => {  
        if (typeof (event) === 'object') {  
          console.log(event.body);  
        }  
      });  
  }
  private uploadFiles() {  
    this.fileUpload.nativeElement.value = '';  
    this.files.forEach(file => {  
      this.uploadFile(file);  
    });  
}

onClick() {  
  const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {  
  for (let index = 0; index < fileUpload.files.length; index++)  
  {  
   const file = fileUpload.files[index];  
   this.files.push({ data: file, inProgress: false, progress: 0});  
  }  
    this.uploadFiles();  
  };  
  fileUpload.click();  
}

public doFilter = (value: string) => {
  this.dataSource.filter = value.trim().toLocaleLowerCase();
}
}
