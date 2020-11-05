import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  email = new FormControl(null, [Validators.email, Validators.required]);
  password = new FormControl(null, [Validators.required,Validators.minLength(8),]);

  registerForm = new FormGroup({
    firstName: new FormControl(null,Validators.required),
    lastName: new FormControl(null,Validators.required),
    email: new FormControl(null,[Validators.email,Validators.required]),
    username: new FormControl(null,Validators.required),
    password: new FormControl(null, [Validators.required,Validators.minLength(8),]),
    confirmpassword: new FormControl(null,Validators.required)
  });

  constructor( private http: HttpClient, private _router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {} 

  getuserErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a valid email id';
    }
  }

  getpwdErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Password length should be 8';
    }
  }

  message;

  register(){
    if(!this.registerForm.valid){
      console.log('Invalid Form'); 
      this._snackBar.open('Please fill all the fields', 'close',
        {
          duration: 5000,
        });
    }
      else{
    this.http
      .post("/api/register", { data: this.registerForm.value })
      .subscribe(resp => {
        console.log(resp);
        this.message = resp;
          if (this.message['message'] == 'Sucessfully Registered!') {
            this._router.navigate(['/login']);
            this._snackBar.open(this.message['message'], 'close', {
              duration: 5000,
            });
          }else{
            this._snackBar.open(this.message['message'], 'close', {
              duration: 5000,
            });
            this.ngOnInit();
          }
      });

      }
  }

}
