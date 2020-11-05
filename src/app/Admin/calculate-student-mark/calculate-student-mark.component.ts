import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-calculate-student-mark',
  templateUrl: './calculate-student-mark.component.html',
  styleUrls: ['./calculate-student-mark.component.scss']
})
export class CalculateStudentMarkComponent implements OnInit {
  id = this.router.url.split("/")[2];
  profileForm = new FormGroup({
    IndReport3: new FormControl(""),
    IndReport4: new FormControl(""),
    IndReport5: new FormControl(""),
    IndReport6: new FormControl(""),
    IndReport7: new FormControl(""),
    IndReport8: new FormControl(""),
    IndReport9: new FormControl(""),
    IndReport10: new FormControl(""),
    IndReport11: new FormControl(""),
    IndReport12: new FormControl(""),
    IndReport13: new FormControl(""),
    GroupProposal5: new FormControl(""),
    GroupProgress9: new FormControl(""),
    FinalGroup13: new FormControl(""),
    Group_Presentation: new FormControl(""),
  });

  profileForm2 = new FormGroup({
    Student_Id: new FormControl(""),

  });

  constructor(fb: FormBuilder, private http: HttpClient, private router: Router, private _snackBar: MatSnackBar
  ) {
    this.profileForm = fb.group({
      IndReport3: ["", ],
      IndReport4: ["", ],
      IndReport5: ["",],
      IndReport6: ["", ],
      IndReport7: ["", ],
      IndReport8: ["", ],
      IndReport9: ["", ],
      IndReport10: ["", ],
      IndReport11: ["", ],
      IndReport12: ["", ],
      IndReport13: ["", ],
      GroupProposal5: ["",],
      GroupProgress9: ["", ],
      FinalGroup13: ["", ],
      Group_Presentation: ["", ],
    });
    this.profileForm2 = fb.group({
      Student_Id: ["",],
    });
  }
  StudentMarks;
  formula;
  ngOnInit(): void {
    console.log(this.id);
    console.log("test1");
    if (this.id !== undefined) {
      this.http
        .post("/api/getstudentmark", { data: this.id })
        .subscribe((resp) => {
          console.log("test2");
          this.StudentMarks = resp;
          console.log(this.StudentMarks[0].Individual_report_3);
          this.profileForm.get("IndReport3").setValue(this.StudentMarks[0].Individual_report_3);
          this.profileForm
            .get("IndReport4")
            .setValue(this.StudentMarks[0].Individual_report_4);
          this.profileForm
            .get("IndReport5")
            .setValue(this.StudentMarks[0].Individual_report_5);
          this.profileForm.get("IndReport6").setValue(this.StudentMarks[0].Individual_report_6);
          this.profileForm.get("IndReport7").setValue(this.StudentMarks[0].Individual_report_7);
          this.profileForm.get("IndReport8").setValue(this.StudentMarks[0].Individual_report_8);
          this.profileForm.get("IndReport9").setValue(this.StudentMarks[0].Individual_report_9);
          this.profileForm.get("IndReport10").setValue(this.StudentMarks[0].Individual_report_10);
          this.profileForm.get("IndReport11").setValue(this.StudentMarks[0].Individual_report_11);
          this.profileForm.get("IndReport12").setValue(this.StudentMarks[0].Individual_report_12);
          this.profileForm.get("IndReport13").setValue(this.StudentMarks[0].Individual_report_13);
          this.profileForm.get("GroupProposal5").setValue(this.StudentMarks[0].Group_Progress_5);
          this.profileForm.get("GroupProgress9").setValue(this.StudentMarks[0].Group_Progress_9);
          this.profileForm.get("FinalGroup13").setValue(this.StudentMarks[0].Final_Group_13);
          this.profileForm.get("Group_Presentation").setValue(this.StudentMarks[0].Group_Presentation);

        });

    }
    console.log(this.StudentMarks);

  }

  submitForm() {
    console.log(this.profileForm.value);
    this.http
      .post("/api/calculateMark", { data: this.profileForm.value, id: this.StudentMarks[0].Student_id })
      .subscribe(resp => {
        this.ngOnInit()
        console.log(resp);
      });
    this._snackBar.open("You successfullly updated student marks!", "Close", {
      duration: 2000,
    });
    this.ngOnInit();
  }

}
