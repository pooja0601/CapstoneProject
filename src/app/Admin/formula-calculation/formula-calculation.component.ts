import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { isNull } from "util";
@Component({
  selector: "app-formula-calculation",
  templateUrl: "./formula-calculation.component.html",
  styleUrls: ["./formula-calculation.component.scss"],
})
export class FormulaCalculationComponent implements OnInit {
  ProjectProposalWeightValue;
  ProgressReportWeightValue;
  FinalReportWeightValue;
  PresentationWeightValue;
  FormulaPlus;
  updateField: boolean;
  validate = true;
  profileForm = new FormGroup({
    ProjectProposalWeight: new FormControl(""),
    ProgressReportWeight: new FormControl(""),
    FinalReportWeight: new FormControl(""),
    PresentationWeight: new FormControl(""),
  });

  constructor(
    fb: FormBuilder,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.profileForm = fb.group({
      ProjectProposalWeight: ["", Validators.required],
      ProgressReportWeight: ["", Validators.required],
      FinalReportWeight: ["", Validators.required],
      PresentationWeight: ["", Validators.required],
    });
    this.updateField = false;
  }
  formula;

  ngOnInit(): void {
    this.http.post("/api/viewFormula", {}).subscribe((resp) => {
      this.formula = resp;
      console.log(this.formula);
    });
    // this.profileForm.get("ProjectProposalWeight").setValue(null);
    // this.profileForm.get("ProgressReportWeight").setValue(null);
    // this.profileForm.get("PresentationWeight").setValue(null);
    // this.profileForm.get("FinalReportWeight").setValue(null);
  }

  submitForm() {
    console.log(this.profileForm.get("ProjectProposalWeight").value);
    if (isNull(this.profileForm.get("ProjectProposalWeight").value)) {
      console.log("Null value");
      this._snackBar.open("Please fill are required fields!!", "Close", {
        duration: 2000,
      });
      this.validate = false;
    }
    this.ProjectProposalWeightValue = this.profileForm.get(
      "ProjectProposalWeight"
    ).value;
    this.ProgressReportWeightValue = this.profileForm.get(
      "ProgressReportWeight"
    ).value;
    this.PresentationWeightValue = this.profileForm.get(
      "PresentationWeight"
    ).value;
    this.FinalReportWeightValue = this.profileForm.get(
      "FinalReportWeight"
    ).value;

    if (
      this.profileForm.get("ProjectProposalWeight").value == 100 ||
      this.profileForm.get("ProgressReportWeight").value == 100 ||
      this.profileForm.get("PresentationWeight").value == 100 ||
      this.profileForm.get("FinalReportWeight").value == 100
    ) {
      this._snackBar.open("Wrong formula!!", "Close", {
        duration: 2000,
      });
      this.validate = false;
    }

    this.FormulaPlus =
      this.ProjectProposalWeightValue +
      this.ProgressReportWeightValue +
      this.PresentationWeightValue +
      this.FinalReportWeightValue;
    if (this.FormulaPlus > 100 || this.FormulaPlus < 100) {
      this._snackBar.open("Weights plural should be equal to 100!!", "Close", {
        duration: 2000,
      });
      this.validate = false;
    }
    if (this.validate === true) {
      this.http
        .post("/api/createFormula", { data: this.profileForm.value })
        .subscribe((resp) => {
          console.log(resp);
          //this.ngOnInit();
        });
      //this.ngOnInit();

      this._snackBar.open("You successfully updated the formula!", "Close", {
        duration: 2000,
      });
      this.ngOnInit();
    }

    this.validate = true;
  }
  updateFields(click) {
    console.log(click);
    if (click.checked) {
      this.updateField = true;
    } else {
      this.updateField = false;
    }
  }
}
