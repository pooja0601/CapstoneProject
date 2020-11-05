import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  FormArray,
  Validators,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ValueConverter } from "@angular/compiler/src/render3/view/template";
import { MatChipInputEvent } from "@angular/material/chips";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { User, Role } from "../../_models";
import { AuthenticationService } from "@app/_services";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarConfig,
} from "@angular/material/snack-bar";

export interface Fruit {
  name: string;
}
@Component({
  selector: "app-addProjects",
  templateUrl: "./addProjects.component.html",
  styleUrls: ["./addProjects.component.scss"],
})
export class AddProjectsComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [];

  projectStored;
  id = this.router.url.split("/")[2];

  hidden = true;
  viewDisable = false;

  public contactList: FormArray;

  currentUser: User;
  message = "Project successfully proposed";
  actionButtonLabel = "";
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  groupHidden = false;
  profileForm = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
    functionalities: new FormControl(""),
    mode: new FormControl(""),
    groupNo: new FormControl(""),
    type: new FormControl(""),
    contacts: new FormArray([]),
  });
  urlid: string;

  modeSelect(event) {
    console.log(event);
    if (event === "individual") this.groupHidden = false;
    else this.groupHidden = true;
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar
  ) {
    this.profileForm = fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      functionalities: ["", Validators.required],
      mode: [""],
      groupNo: [""],
      type: [""],
      contacts: this.fb.array([this.createContact()]),
    });
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit(): void {
    if (this.id !== undefined) {
      this.urlid = this.router.url.split("/")[1];
      if (this.urlid !== "viewProject") {
        console.log("inside edit project");
        this.hidden = false;
        this.http
          .post("/api/getProjectId", { data: this.id })
          .subscribe((resp) => {
            this.projectStored = resp;
            console.log(this.projectStored);
            let projectType = this.projectStored.type.split(",");
            let supname = [];
            let supmail = [];
            supname = this.projectStored.supervisorNames.split(",");
            supmail = this.projectStored.supervisorEmails.split(",");
            console.log(supmail);
            let contact = [];
            for (let i = 0; i < supname.length; i++) {
              contact.push({ name: supname[i], value: supmail[i] });
              if (i > 0) {
                this.addContact();
              }
            }
            let skill = [];
            skill = this.projectStored.requirementSkills.split(",");
            let reqskills = [];
            for (let i = 0; i < skill.length; i++) {
              reqskills.push({ name: skill[i] });
            }

            console.log(reqskills);
            this.fruits = reqskills;
            this.profileForm.get("title").setValue(this.projectStored.title);
            this.profileForm
              .get("description")
              .setValue(this.projectStored.description);
            this.profileForm.get("mode").setValue(this.projectStored.mode);
            this.profileForm
              .get("functionalities")
              .setValue(this.projectStored.functionalities);
            this.profileForm.get("type").setValue(projectType);
            this.profileForm.get("contacts").setValue(contact);
          });
      } else {
        this.viewDisable = true;
        this.http
          .post("/api/getProjectId", { data: this.id })
          .subscribe((resp) => {
            this.projectStored = resp;
            console.log(this.projectStored);
            //  this.projectStored((v) => {
            //    v["view"]=true;
            //  })
            // this.projectStored["view"] = true;
            let projectType = this.projectStored.type.split(",");
            let supname = [];
            let supmail = [];
            supname = this.projectStored.supervisorNames.split(",");
            supmail = this.projectStored.supervisorEmails.split(",");
            console.log(supmail);
            let contact = [];
            for (let i = 0; i < supname.length; i++) {
              contact.push({ name: supname[i], value: supmail[i] });
              if (i > 0) {
                this.addContact();
              }
            }
            let skill = [];
            skill = this.projectStored.requirementSkills.split(",");
            let reqskills = [];
            for (let i = 0; i < skill.length; i++) {
              reqskills.push({ name: skill[i] });
            }

            console.log(reqskills);
            this.fruits = reqskills;
            this.profileForm.disable();
            this.profileForm.get("title").setValue(this.projectStored.title);
            this.profileForm
              .get("description")
              .setValue(this.projectStored.description);
            this.profileForm.get("mode").setValue(this.projectStored.mode);
            this.profileForm
              .get("functionalities")
              .setValue(this.projectStored.functionalities);
            this.profileForm.get("type").setValue(projectType);
            this.profileForm.get("contacts").setValue(contact);
          });
      }
    }

    this.contactList = this.profileForm.get("contacts") as FormArray;
  }

  createContact(): FormGroup {
    return this.fb.group({
      name: [null, Validators.compose([Validators.required])], // i.e. Home, Office
      value: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
  }

  get contactFormGroup() {
    return this.profileForm.get("contacts") as FormArray;
  }

  addContact() {
    this.contactList.push(this.createContact());
  }

  removeContact(index) {
    this.contactList.removeAt(index);
  }

  changedFieldType(index) {
    let validators = null;
    validators = Validators.compose([Validators.required, Validators.email]);
    this.getContactsFormGroup(index).controls["value"].setValidators(
      validators
    );
    this.getContactsFormGroup(index).controls["value"].updateValueAndValidity();
  }

  getContactsFormGroup(index): FormGroup {
    const formGroup = this.contactList.controls[index] as FormGroup;
    return formGroup;
  }

  submitForm() {
    console.log(this.profileForm.valid);
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;

    console.log(this.currentUser.username);
    if (this.id === undefined) {
      if (this.profileForm.valid) {
        console.log(this.profileForm.value);
        console.log(this.fruits);
        this._snackBar.open(
          this.message,
          this.action ? this.actionButtonLabel : undefined,
          config
        );
        this.http
          .post("/api/createProject", {
            clientId: this.currentUser.username,
            data: this.profileForm.value,
            skills: this.fruits,
          })
          .subscribe((resp) => {
            console.log(resp);
            this.router.navigate(["/viewProjectDetails"]);
          });
      }
    } else {
      this.http
        .post("/api/updateProject", {
          data: this.profileForm.value,
          skills: this.fruits,
          id: this.id,
        })
        .subscribe((resp) => {
          console.log(resp);
        });
      this.router.navigate(["/viewProjectDetails"]);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.fruits.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
}
