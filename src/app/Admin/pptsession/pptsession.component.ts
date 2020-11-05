import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MaterialModule } from '../../material/material.module';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Moment } from "moment";
import { start } from 'repl';

var moment = require('moment/moment');

@Component({
  selector: 'app-pptsession',
  templateUrl: './pptsession.component.html',
  styleUrls: ['./pptsession.component.scss']
})
export class PptsessionComponent implements OnInit {
  public starttime_collection = [];
  public endtime_collection = [];

  sessionStored;
  id = this.router.url.split("/")[2];
  action = this.router.url.split("/")[3];


  pptForm = new FormGroup({
    session_date: new FormControl(""),
    session_duration: new FormControl(""),
    session_starttime: new FormControl(""),
    session_endtime: new FormControl(""),
    session_location: new FormControl(""),
    group_name: new FormControl("")

  });



  constructor(fb: FormBuilder, private http: HttpClient, private router: Router, private _snackBar: MatSnackBar) {
    this.pptForm = fb.group({
      session_date: ["", Validators.required],
      session_duration: ["", Validators.required],
      session_starttime: ["", Validators.required],
      session_endtime: ["", Validators.required],
      session_location: ["", Validators.required],
      group_name: []
    })

  }
  message;

  // today=new Date();
  ngOnInit(): void {
    this.pptForm.get('session_duration').setValue('30');


    this.updateStartTime();
    

    if (this.id !== undefined) {

      this.http
        .post("/api/getsession", { data: this.id })
        .subscribe((resp) => {
          this.sessionStored = resp;

          this.pptForm.get("session_date").setValue(this.sessionStored.session_date);
          this.pptForm.get("session_starttime").setValue(this.sessionStored.session_time);
          this.pptForm.get("session_endtime").setValue(this.sessionStored.session_time);
          this.pptForm.get("session_location").setValue(this.sessionStored.session_location);
          this.pptForm.get("group_name").setValue(this.sessionStored.group_name);
        });

    }

  }

  updateStartTime() {
    this.starttime_collection = [];
    // console.log('inside update start time')
    var slottime = this.pptForm.value.session_duration
    var starttime = moment().startOf('day').add('9', 'hours')
    var endtime = moment().endOf('day').add('-3', 'hours')
    var duration = moment.duration(endtime.diff(starttime));
    var minutes = parseInt(duration.asMinutes());
    var sloty = minutes / slottime;
    for (var i = 0; i < sloty; i++) {
      var temp = starttime.format('HH:mm')
      this.starttime_collection.push(temp)
      starttime = moment(starttime).add(slottime, 'minutes')
    }
    console.log(this.starttime_collection)
    this.updateEndTime();
  }

  updateEndTime() {
    this.endtime_collection = [];
    var slottime = this.pptForm.value.session_duration
    var starttime = moment().startOf('day').add('9', 'hours')
    var endtime = moment().endOf('day').add('-3', 'hours')
    var duration = moment.duration(endtime.diff(starttime));
    var minutes = parseInt(duration.asMinutes());
    var sloty = minutes / slottime;
    for (var i = 0; i < sloty + 1; i++) {
      var temp = starttime.format('HH:mm')
      this.endtime_collection.push(temp)
      starttime = moment(starttime).add(slottime, 'minutes')
    }
    // console.log(this.endtime_collection)
  }

  session() {
    if (!this.pptForm.valid) {
      this._snackBar.open("Please enter all the fields", "close", {
        duration: 5000,
      })
    } 
    else {
      if (this.id === undefined) {



        var starttime = moment(this.pptForm.value.session_starttime, "HH:mm");
        var endtime = moment(this.pptForm.value.session_endtime, "HH:mm");

        if(endtime<=starttime){
          this._snackBar.open("End time should be greater than Start time ", "close", {
            duration: 5000,
          });
        }
        else{
        var slottime = this.pptForm.value.session_duration

        var duration = moment.duration(endtime.diff(starttime));
        console.log(duration)
        var minutes = parseInt(duration.asMinutes());
        var sloty = minutes / slottime;
        console.log("endtime: " + endtime.format('HH:mm'))
        console.log("minutes: " + minutes)
        console.log("sloty: " + sloty)
        var temp_starttime = starttime
        var temp_endtime = starttime
        for (var i = 0; i < sloty; i++) {
          temp_starttime = temp_endtime
          temp_endtime = moment(temp_endtime).add(slottime, 'minutes')
          // console.log(temp_endtime.format())
          this.pptForm.get("session_starttime").setValue(temp_starttime.format('HH:mm'));
          this.pptForm.get("session_endtime").setValue(temp_endtime.format('HH:mm'));
          this.http
            .post("/api/session", { data: this.pptForm.value })
            .subscribe(resp => {
              console.log(resp);
              this.router.navigate(["/viewsession"])
              this._snackBar.open("Sessions has been created", "close", {
                duration: 5000,
              });
            })
        }
      }
      }

      else {
        this.http
          .post("/api/updatesession", {
            data: this.pptForm.value,
            id: this.id,
          })
          .subscribe((resp) => {
            console.log(resp);
            this.router.navigate(["/viewsession"]);
            this._snackBar.open("Session has been updated", "close", {
              duration: 5000,
            });

          });

      }
    }

  }
}




