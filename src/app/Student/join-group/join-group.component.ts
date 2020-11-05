import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { DialogBoxComponent } from "@app/admin/dialog-box/dialog-box.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-join-group",
  templateUrl: "./join-group.component.html",
  styleUrls: ["./join-group.component.scss"],
})
export class JoinGroupComponent implements OnInit {
  name;
  notDisable;

  groupName = new FormGroup({
    name1: new FormControl(""),
    name2: new FormControl(""),
    name3: new FormControl(""),
    name4: new FormControl(""),
    name5: new FormControl(""),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private fb: FormBuilder,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    console.log(this.data);
    this.name = this.data.user.username;
    // get username from user table

    this.groupName = fb.group({
      name1: [{ value: "", disabled: true }, Validators.required],
      name2: [{ value: "", disabled: true }, Validators.required],
      name3: [{ value: "", disabled: true }, Validators.required],
      name4: [{ value: "", disabled: true }, Validators.required],
      name5: [{ value: "", disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.http
      .post("/api/student/getGroup", {
        projectId: this.data.projectId,
        group_name: this.data.groupName,
      })
      .subscribe((data) => {
        console.log(data);

        // Validation for each student
        if (data[0].student_one === null && this.data.joinBtn) {
          this.notDisable = true;
          this.groupName.get("name1").enable();
          this.groupName.get("name1").setValue(this.name);
        } else {
          this.groupName.get("name1").setValue(data[0].student_one);
          this.groupName.get("name1").disable();
          this.notDisable = false;
          if (data[0].student_two === null && this.data.joinBtn) {
            this.notDisable = true;
            this.groupName.get("name2").enable();
            this.groupName.get("name2").setValue(this.name);
          } else {
            this.notDisable = false;
            this.groupName.get("name2").setValue(data[0].student_two);
            if (data[0].student_three === null && this.data.joinBtn) {
              this.notDisable = true;
              this.groupName.get("name3").enable();
              this.groupName.get("name3").setValue(this.name);
            } else {
              this.notDisable = false;
              this.groupName.get("name3").setValue(data[0].student_three);
              if (data[0].student_four === null && this.data.joinBtn) {
                this.notDisable = true;
                this.groupName.get("name4").enable();
                this.groupName.get("name4").setValue(this.name);
              } else {
                this.notDisable = false;
                this.groupName.get("name4").setValue(data[0].student_four);
                if (data[0].student_five === null && this.data.joinBtn) {
                  this.notDisable = true;
                  this.groupName.get("name5").enable();
                  this.groupName.get("name5").setValue(this.name);
                } else {
                  this.notDisable = false;
                  this.groupName.get("name5").setValue(data[0].student_five);
                }
              }
            }
          }
        }
      });
  }

  submit() {
    if (this.data.leaveBtn) {
      this.http
        .post("/api/student/leaveGroup", {
          name: this.name,
          projectId: this.data.projectId,
          group_name: this.data.groupName,
        })
        .subscribe((data) => {
          // console.log(data);
          this._snackBar.open("Left the group", "Close", {
            duration: 2000,
          });

          this.dialogRef.close({ event: "Left Group" });
        });
    } else {
      if (this.groupName.value.name1 === this.name) {
        this.saveData(this.name, this.data.groupName);
      } else if (this.groupName.value.name2 === this.name) {
        this.saveData(this.name, this.data.groupName);
      } else if (this.groupName.value.name3 === this.name) {
        this.saveData(this.name, this.data.groupName);
      } else if (this.groupName.value.name4 === this.name) {
        this.saveData(this.name, this.data.groupName);
      } else if (this.groupName.value.name5 === this.name) {
        this.saveData(this.name, this.data.groupName);
      }
    }
  }

  saveData(name, groupName) {
    this.http
      .post("/api/student/joinGroup", {
        name,
        groupName,
      })
      .subscribe((data) => {
        console.log(data);
        if (data === "Student already present") {
          this.dialogRef.close({ event: "Not Join" });
        } else {
          this._snackBar.open("Joined group successfully", "Close", {
            duration: 2000,
          });
          this.dialogRef.close({ event: "Join" });
        }
      });
  }
}
