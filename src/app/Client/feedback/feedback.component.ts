import { logging } from "protractor";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.scss"],
})
export class FeedbackComponent implements OnInit {
  user;
  feedbackForm: FormGroup;
  selectedCat: any[];
  msg: any;
  submitted = false;

  stars: number[] = [1, 2, 3, 4, 5];
  selectedDisplay: number;
  selectedFun: number;
  selectedPerf: number;
  public category: Array<any>;
  url = location.pathname.split("/").slice(-1)[0];
  urlpro = location.pathname.split("/").slice(-2)[0];

  someInput: string;
  displaycomment: string;
  funcomment: string;
  percomment: string;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.category = [
      { id: 1, value: "design" },
      { id: 2, value: "functionality" },
      { id: 3, value: "performance" },
    ];
    this.selectedCat = this.category[0].id;
  }

  ngOnInit() {
    // this.createForm();
    console.log(this.urlpro);
    // this.http
    //   .post("/api/client/getFeedback", { url: this.url })
    //   .subscribe((resp) => {
    //     console.log(resp);
    //   });
  }

  // createForm() {
  //   this.feedbackForm = this.formBuilder.group({
  //     msg: [
  //       "",
  //       [
  //         Validators.required,
  //         Validators.minLength(8),
  //         Validators.maxLength(100),
  //       ],
  //     ],
  //     category: ["", Validators.required],
  //     name: ["", Validators.required],
  //     email: ["", [Validators.required, Validators.email]],
  //   });

  //   /*both will work for set value manually*/
  //   //this.feedbackForm.get('category').setValue(this.selectedCat);
  //   this.feedbackForm.controls["category"].setValue(this.selectedCat);
  // }

  // sendFeedback() {
  //   this.submitted = true;
  //   // stop here if form is invalid
  //   if (this.feedbackForm.invalid) {
  //     return;
  //   } else {
  //     this.msg = "Your feedback is submitted successfully";
  //     console.log(this.feedbackForm.value);
  //   }
  // }
  displayStar(star) {
    this.selectedDisplay = star;
    console.log("Display star", star);
  }
  funStar(star) {
    this.selectedFun = star;
    console.log("functionalities star", star);
  }
  perfStar(star) {
    this.selectedPerf = star;
    console.log("Performance star", star);
  }
  allData = [];
  submit(someInput, displaycomment, funcomment, percomment) {
    // console.log("in here");
    console.log(someInput, displaycomment, funcomment, percomment);
    console.log(this.url);
    this.allData.push(
      this.selectedDisplay,
      displaycomment,
      this.selectedFun,
      funcomment,
      this.selectedPerf,
      percomment,
      someInput
    );
    console.log("add:", this.allData);
    console.log(this.url);
    if (this.url !== "undefined") {
      console.log(this.url);
      this.http
        .post("api/client/sendGroupFeedback", {
          url: this.url,
          data: this.allData,
        })
        .subscribe((data) => {
          console.log(data);
        });
    } else {
      this.http
        .post("/api/client/sendIndFeedback", {
          url: this.urlpro,
          data: this.allData,
        })
        .subscribe((data) => {
          console.log(data);
        });
    }
    //   this.http
    //     .post("/api/client/sendFeedback", { url: this.url, data: this.allData })
    //     .subscribe((data) => {
    //       console.log(data);
    //     });
    // }
  }
}
