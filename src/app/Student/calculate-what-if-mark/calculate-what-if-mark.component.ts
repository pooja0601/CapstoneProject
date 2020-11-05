import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/_services";
import { User } from "@app/_models";
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { isNullOrUndefined, isUndefined } from 'util';

@Component({
  selector: 'app-calculate-what-if-mark',
  templateUrl: './calculate-what-if-mark.component.html',
  styleUrls: ['./calculate-what-if-mark.component.scss']
})
export class CalculateWhatIfMarkComponent implements OnInit {
  id = this.router.url.split("/")[2];
  currentUser: User;
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

  constructor(fb: FormBuilder, private http: HttpClient, private router: Router, private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar, ) {
    this.profileForm = fb.group({
      IndReport3: ["",],
      IndReport4: ["",],
      IndReport5: ["",],
      IndReport6: ["",],
      IndReport7: ["",],
      IndReport8: ["",],
      IndReport9: ["",],
      IndReport10: ["",],
      IndReport11: ["",],
      IndReport12: ["",],
      IndReport13: ["",],
      GroupProposal5: ["",],
      GroupProgress9: ["",],
      FinalGroup13: ["",],
      Group_Presentation: ["",],
    });
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  IndReport3; IndReport4; IndReport5; IndReport6; IndReport7;
  IndReport8; IndReport9; IndReport10; IndReport11; IndReport12; IndReport13;
  GroupProgress9; FinalGroup13; Group_Presentation; GroupProposal5;
  Project_Proposal_Weight;
  Progress_Report_Weight;
  Final_Report_Weight;
  Presentation_Weight;
  grade1; grade2; grade3; grade4; grade5; grade6; grade7; grade8; grade9; grade10; grade11; grade12; grade13;
  GroupProgress9Grade; FinalGroup13grade; Group_PresentationGrade; GroupProposal5grade;
  ProjectProposasl = 0; ProgressReport = 0; FinalReport = 0; GroupPresentation = 0; FinalTotalMark = 0;

  StudentMarks = null;
  formula;
  dataSource;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  ngOnInit(): void {
    this.http.post("/api/viewFormula", {})
      .subscribe(resp => {
        this.formula = resp;
        //console.log(this.formula);
      });
    console.log(this.id);
    console.log("test1");
    console.log(this.currentUser.id);
    this.http
      .post("/api/getstudentmark", { data: this.currentUser.id })
      .subscribe((resp) => {
        //console.log("test2");
        if (resp) { console.log("No Value!"); }
        else {
          this.StudentMarks = resp;
          this.dataSource = resp;
          console.log(this.StudentMarks[0]);

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

          this.grade3 = this.StudentMarks[0].Individual_report_3;
          this.grade4 = this.StudentMarks[0].Individual_report_4;
          this.grade5 = this.StudentMarks[0].Individual_report_5;
          this.grade6 = this.StudentMarks[0].Individual_report_6;
          this.grade7 = this.StudentMarks[0].Individual_report_7;
          this.grade8 = this.StudentMarks[0].Individual_report_8;
          this.grade9 = this.StudentMarks[0].Individual_report_9;
          this.grade10 = this.StudentMarks[0].Individual_report_10;
          this.grade11 = this.StudentMarks[0].Individual_report_11;
          this.grade12 = this.StudentMarks[0].Individual_report_12;
          this.grade13 = this.StudentMarks[0].Individual_report_13;
          this.GroupProposal5grade = this.StudentMarks[0].Group_Progress_5;
          this.Group_PresentationGrade = this.StudentMarks[0].Group_Presentation;
          this.GroupProgress9Grade = this.StudentMarks[0].Group_Progress_9;
          this.FinalGroup13grade = this.StudentMarks[0].Final_Group_13;
        }

      });


    console.log(this.StudentMarks);

  }

  submitForm() {




    this.IndReport3 = this.profileForm.get("IndReport3").value;
    this.IndReport4 = this.profileForm.get("IndReport4").value;
    this.IndReport5 = this.profileForm.get("IndReport5").value;
    this.IndReport6 = this.profileForm.get("IndReport6").value;
    this.IndReport7 = this.profileForm.get("IndReport7").value;
    this.IndReport8 = this.profileForm.get("IndReport8").value;
    this.IndReport9 = this.profileForm.get("IndReport9").value;
    this.IndReport10 = this.profileForm.get("IndReport10").value;
    this.IndReport11 = this.profileForm.get("IndReport11").value;
    this.IndReport12 = this.profileForm.get("IndReport12").value;
    this.IndReport13 = this.profileForm.get("IndReport13").value;
    this.GroupProposal5 = this.profileForm.get("GroupProposal5").value;
    this.GroupProgress9 = this.profileForm.get("GroupProgress9").value;
    this.FinalGroup13 = this.profileForm.get("FinalGroup13").value;
    this.Group_Presentation = this.profileForm.get("Group_Presentation").value;


    if (this.profileForm.get("IndReport3").value == "") { this.IndReport3 = 0; }
    if (this.profileForm.get("IndReport4").value == "") { this.IndReport4 = 0; }
    if (this.profileForm.get("IndReport5").value == "") { this.IndReport5 = 0; }
    if (this.profileForm.get("IndReport6").value == "") { this.IndReport6 = 0; }
    if (this.profileForm.get("IndReport7").value == "") { this.IndReport7 = 0; }
    if (this.profileForm.get("IndReport8").value == "") { this.IndReport8 = 0; }
    if (this.profileForm.get("IndReport9").value == "") { this.IndReport9 = 0; }
    if (this.profileForm.get("IndReport10").value == "") { this.IndReport10 = 0; }
    if (this.profileForm.get("IndReport11").value == "") { this.IndReport11 = 0; }
    if (this.profileForm.get("IndReport12").value == "") { this.IndReport12 = 0; }
    if (this.profileForm.get("IndReport13").value == "") { this.IndReport13 = 0; }
    if (this.profileForm.get("GroupProposal5").value == "") { this.GroupProposal5 = 0; }
    if (this.profileForm.get("GroupProgress9").value == "") { this.GroupProgress9 = 0; }
    if (this.profileForm.get("FinalGroup13").value == "") { this.FinalGroup13 = 0; }
    if (this.profileForm.get("Group_Presentation").value == "") { this.Group_Presentation = 0; }


    this.Project_Proposal_Weight = this.formula[0]["Project_Proposal_Weight"];
    this.Progress_Report_Weight = this.formula[0]["Progress_Report_Weight"];
    this.Final_Report_Weight = this.formula[0]["Final_Report_Weight"];
    this.Presentation_Weight = this.formula[0]["Presentation_Weight"];

    console.log(this.Project_Proposal_Weight);
    console.log(this.Progress_Report_Weight);
    console.log(this.Final_Report_Weight);
    console.log(this.Presentation_Weight);
    this.ProjectProposasl =
      ((this.IndReport3 +
        this.IndReport4 +
        this.IndReport5) *
        0.01) *
      (this.GroupProposal5 * 0.01) *
      this.Project_Proposal_Weight;
    this.ProgressReport =
      ((this.IndReport6 +
        this.IndReport7 +
        this.IndReport8) *
        0.01) *
      (this.GroupProgress9 * 0.01) *
      this.Progress_Report_Weight;
    this.FinalReport =
      ((this.IndReport9 +
        this.IndReport10 +
        this.IndReport11 +
        this.IndReport12 +
        this.IndReport13) *
        0.01) *
      (this.FinalGroup13 * 0.01) *
      this.Final_Report_Weight;
    this.GroupPresentation =
      (this.Group_Presentation * 0.01) * this.Presentation_Weight;
    this.FinalTotalMark =
      this.ProjectProposasl + this.ProgressReport + this.FinalReport + this.GroupPresentation;
    console.log(this.ProjectProposasl);
    console.log(this.ProgressReport);
    console.log(this.FinalReport);
    console.log(this.GroupPresentation);
    console.log(this.FinalTotalMark);
    //  console.log(this.finalMark);
    //  Marks = finalMark.toString();
    //  console.log(this.formula[0]["Project_Proposal_Weight"])


    //console.log(this.profileForm.get("IndReport3").value);
    //this.http
    //  .post("/api/simulateMark", { data: this.profileForm.value })
    //  .subscribe(resp => {
    //   // this.ngOnInit()
    //    console.log(resp);
    //  });
  }
}
