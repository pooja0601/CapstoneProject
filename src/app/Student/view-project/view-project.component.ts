import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
import { AuthenticationService } from "@app/_services";
import { User } from "@app/_models";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
  selector: "app-view-project",
  templateUrl: "./view-project.component.html",
  styleUrls: ["./view-project.component.scss"],
})
export class ViewProjectComponent implements OnInit {
  projectId: string;
  mode: string;
  individual: boolean;

  group: boolean;
  currentUser: User;
  projectStored;
  public contactList: FormArray;
  profileForm = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
    functionalities: new FormControl(""),
    mode: new FormControl(""),
    type: new FormControl(""),
    skills: new FormControl(""),
    contactUsers: new FormControl(""),
    contactEmails: new FormControl(""),
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) {
    this.profileForm = fb.group({
      title: [{ value: "", disabled: true }, Validators.required],
      description: [{ value: "", disabled: true }, Validators.required],
      functionalities: [{ value: "", disabled: true }, Validators.required],
      mode: [{ value: "", disabled: true }, Validators.required],
      type: [{ value: "", disabled: true }, Validators.required],
      skills: [{ value: "", disabled: true }, Validators.required],
      contactUsers: [{ value: "", disabled: true }, Validators.required],
      contactEmails: [{ value: "", disabled: true }, Validators.required],
    });
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.projectId = this.activatedRoute.snapshot.paramMap.get("projectId");
    console.log(this.projectId);
    this.mode = this.activatedRoute.snapshot.paramMap.get("mode");
    if (this.mode == "individual") {
      this.http
        .post("/api/student/verifyStudent", {
          studentId: this.currentUser.username,
        })
        .subscribe((data: any[]) => {
          data.length > 0
            ? data[0].status === "Rejected"
              ? (this.individual = true)
              : (this.individual = false)
            : (this.individual = true);
        });
      // this.http.post("/student/verifyStudent", {});
    }
    if (this.mode == "group") {
      this.group = true;
      this.individual = false;
    }
  }

  ngOnInit(): void {
    if (this.projectId !== undefined) {
      this.http
        .post("/api/student/getProject", { data: this.projectId })
        .subscribe((resp) => {
          console.log(resp);
          this.projectStored = resp[0];
          console.log(this.projectStored);
          this.profileForm.get("title").setValue(this.projectStored.title);
          this.profileForm
            .get("description")
            .setValue(this.projectStored.description);
          this.profileForm.get("mode").setValue(this.projectStored.mode);
          this.profileForm
            .get("functionalities")
            .setValue(this.projectStored.functionalities);
          this.profileForm.get("type").setValue(this.projectStored.type);
          this.profileForm
            .get("skills")
            .setValue(this.projectStored.requirementSkills);
          this.profileForm
            .get("contactUsers")
            .setValue(this.projectStored.supervisorNames);
          this.profileForm
            .get("contactEmails")
            .setValue(this.projectStored.supervisorEmails);
        });
    }
  }
  uploadCV() {
    this.router.navigate(["/student/upload-details/project/" + this.projectId]);
  }
}
