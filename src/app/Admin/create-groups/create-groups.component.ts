import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

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

//const ELEMENT_DATA: UsersData[] = [ {id: 5, project_name: "CS68", group_name:"cs68-3", student_one: "", student_two: "", student_three: "", student_four: "", student_five: ""}];


@Component({
  selector: 'app-create-groups',
  templateUrl: './create-groups.component.html',
  styleUrls: ['./create-groups.component.scss']
})
export class CreateGroupsComponent implements OnInit {

  view;
  //currr_id: number;
  currr_id = this.router.url.split("/")[2];
  displayedColumns: string[] = [ 'project_id', 'group_name', 'student_one','student_two','student_three','student_four','student_five','action'];
  //dataSource = ELEMENT_DATA;
  dataSource;
 


  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    //console.log('pid:',this.currr_id)
    this.http.post("/api/getProjectGroups", { project_id: this.currr_id }).subscribe((resp) => {
      console.log(resp);

      this.view = resp;

      this.dataSource = resp;

    });



  }

  getProj(){
    this.http.post("/api/getAllGroups",{}).subscribe((resp) =>{
      console.log(resp);
    this.view =resp;
    console.log('view:',this.view)
    console.log('id:',this.currr_id)
    //this.dataSource = resp;
    });
  }


  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '550px',
      data:obj
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }
 
  addRowData(row_obj){
    
    var d = new Date();
    console.log('id_new:',this.currr_id);
    console.log('gn:', row_obj.group_name);
    this.dataSource.push({
      //id:d.getTime(),
      project_id:this.currr_id,
      group_name:row_obj.group_name,
      student_one:row_obj.student_one,
      student_two:row_obj.student_two,
      student_three:row_obj.student_three,
      student_four:row_obj.student_four,
      student_five:row_obj.student_five
    });
    this.table.renderRows();
    console.log('gname:', row_obj.group_name);
    this.http.post("/api/addGroupName",{
      //id:d.getTime(),
      project_id:this.currr_id,
      group_name:row_obj.group_name,
      //student_one:row_obj.student_one,
      //student_two:row_obj.student_two,
      //student_three:row_obj.student_three,
      //student_four:row_obj.student_four,
      //student_five:row_obj.student_five
    }).subscribe((resp) =>{
      console.log(resp);
    this.view =resp;
    console.log('view:',this.view)
    console.log('id:',this.currr_id)

    });
    //this.ngOnInit()
    location.reload();
  }

  updateRowData(row_obj){

    this.dataSource = this.dataSource.filter((value,key)=>{
      console.log('upgname:', row_obj.group_name);
      console.log('upid:', row_obj.id);
      if(value.id == row_obj.id){
        value.group_name = row_obj.group_name;
        this.http.post("/api/updateGroupName",{
          id:row_obj.id,
          group_name:row_obj.group_name,
        }).subscribe((resp) =>{
          console.log(resp);
        this.view =resp;
        console.log('view:',this.view)
        console.log('id:',this.currr_id)   
        });
      }
      return true;
    });
    //this.ngOnInit()
    location.reload();
  }


  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
    this.http
    .post("/api/deleteGroupName", {
      id : row_obj.id
    })
    .subscribe((resp) => {
      console.log(resp);
    });
    //this.ngOnInit()
    location.reload();
  }
}


