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

@Component({
  selector: "app-edit-projects",
  templateUrl: "./edit-projects.component.html",
  styleUrls: ["./edit-projects.component.scss"],
})
export class EditProjectsComponent implements OnInit {
  mySubscription: any;
  projectStored;
  id = this.router.url.split("/")[2];
  groupNumber = 4;
  profileForm = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
    supervisor: new FormControl(""),
    mode: new FormControl(""),
    unitCode: new FormControl(""),
    project_id: new FormControl(""),
    functionalities: new FormControl(""),
    requirementSkills: new FormControl(""),
    supervisorEmails: new FormControl(""),
    type: new FormControl(""),
    groupNo: new FormControl(""),
  });

  constructor(
    fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.profileForm = fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      supervisorNames: ["", Validators.required],
      mode: ["", Validators.required],
      unitCode: ["", Validators.required],
      project_id: ["", Validators.required],
      functionalities: ["", Validators.required],
      requirementSkills: ["", Validators.required],
      supervisorEmails: ["", Validators.required],
      type: ["", Validators.required],
      groupNo: ["", Validators.required],
    });
  }
  error = "";
  success = "";
  projectModeGroup = "";
  projectModeIndividual = "";
  ngOnInit(): void {
    console.log(this.id);
    if (this.id !== undefined) {
      this.http
        .post("/api/getProjectsForEdit", { data: this.id })
        .subscribe((resp) => {
          console.log(resp);
          this.projectStored = resp;
          if (this.projectStored.type != null) {
            var projectType = this.projectStored.type.split(",");
            this.profileForm.get("type").setValue(projectType);
          }

          this.profileForm.get("title").setValue(this.projectStored.title);
          this.profileForm
            .get("description")
            .setValue(this.projectStored.description);
          this.profileForm
            .get("supervisorNames")
            .setValue(this.projectStored.supervisorNames);
          this.profileForm.get("mode").setValue(this.projectStored.mode);
          this.profileForm
            .get("unitCode")
            .setValue(this.projectStored.unitCode);
          this.profileForm
            .get("project_id")
            .setValue(this.projectStored.project_id);
          this.profileForm
            .get("functionalities")
            .setValue(this.projectStored.functionalities);
          this.profileForm
            .get("requirementSkills")
            .setValue(this.projectStored.requirementSkills);
          this.profileForm
            .get("supervisorEmails")
            .setValue(this.projectStored.supervisorEmails);
          this.profileForm.get("groupNo").setValue(this.projectStored.groupNo);
          this.groupNumber = this.projectStored.groupNo;
          if (this.projectStored.mode == "group") {
            this.projectModeGroup = "group";
          } else {
            this.projectModeIndividual = "individual";
          }
          // if (this.projectStored.mode == "individual") {  }
        });
    }
  }

  submitForm() {
    if (
      this.profileForm.get("title").value == "" ||
      this.profileForm.get("description").value == "" ||
      this.profileForm.get("supervisorNames").value == "" ||
      this.profileForm.get("functionalities").value == "" ||
      this.profileForm.get("requirementSkills").value == "" ||
      this.profileForm.get("supervisorEmails").value == ""
    ) {
      this._snackBar.open("Please fill all required fields!!", "Close", {
        duration: 2000,
      });
    }
    //if (this.profileForm.get("description").value == "") {
    //  this._snackBar.open("Please fill all required fields!!", "Close", {
    //    duration: 2000,
    //  });
    //}
    else {
      this.http
        .post("/api/AdminUpdateProject", {
          data: this.profileForm.value,
          id: this.id,
          Pstatus: this.projectStored.status,
        })
        .subscribe(
          (resp) => {
            console.log(resp);
            this._snackBar.open(
              "Project information updated successfully!!",
              "Close",
              {
                duration: 2000,
              }
            );
            //this.success = "Project information updated successfully!!";
            this.ngOnInit();
          },
          (error) => {
            this._snackBar.open("Wrong project id!!", "Close", {
              duration: 2000,
            });
            //this.error = "Please enter another project id!";
            //this.success = "";
            // this.loading = false;
          }
        );

      this.ngOnInit();

      //location.reload();
      // this.router.navigate(["/UpdateProjectStatus"]);
    }
  }

  selectedStatus(status) {
    console.log(status);

    if (status == "Approve") {
      this.http
        .post("/api/approveProject", {
          id: this.id,
          groupNo:
            this.projectStored.groupNo === null
              ? 4
              : this.projectStored.groupNo,
          project_id: this.projectStored.project_id,
          mode: this.projectStored.mode,
        })
        .subscribe((resp) => {
          console.log(resp);
          this.ngOnInit();
        });

      if (this.projectStored.mode == "individual") {
        this._snackBar.open("You approved the project!!", "Close", {
          duration: 2000,
        });
      }
      if (this.projectStored.mode == "group") {
        this._snackBar.open(
          "You approved the project and groups has been created!!",
          "Close",
          {
            duration: 2000,
          }
        );
      }
    } else {
      this.http
        .post("/api/rejectProject", {
          id: this.id,
          project_id: this.projectStored.project_id,
        })
        .subscribe((resp) => {
          console.log(resp);
        });
      this.ngOnInit();

      this._snackBar.open("You rejected the project!!", "Close", {
        duration: 2000,
      });
    }
  }
  closeSAlert() {
    this.success = "";
    //this.error = '';
  }
  closeEAlert() {
    //this.success = '';
    this.error = "";
  }
}
