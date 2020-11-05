import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
 
export interface UsersData {
  group_name: string;
  studentOne: string;
  studentTwo: string;
  studentThree: string;
  studentFour: string;
  studentFive: string;
  id: number;
}
 

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-groups-dialog',
  templateUrl: './edit-groups-dialog.component.html',
  styleUrls: ['./edit-groups-dialog.component.scss']
})
export class EditGroupsDialogComponent {


  action:string;
  local_data:any;

  nameFormControl = new FormControl('', [
    Validators.required
    
  ]);

  matcher = new MyErrorStateMatcher();
 
  constructor(
    public dialogRef: MatDialogRef<EditGroupsDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }
 
  doAction(){
    this.nameFormControl.markAsTouched();
    this.dialogRef.close({event:this.action,data:this.local_data});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
 


  
}
