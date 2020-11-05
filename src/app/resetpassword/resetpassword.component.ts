import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { User, Role } from "../_models";
import { AuthenticationService } from "@app/_services";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  currentUser: User;

  pwdForm = new FormGroup({
    currentpassword: new FormControl("", Validators.required),
    newpassword: new FormControl("", Validators.required),
    confirmnewpassword: new FormControl("", Validators.required)
  });
  constructor( fb:FormBuilder, 
    private http: HttpClient, 
    private router: Router, 
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    console.log(this.currentUser.username);
    
  }
message;
  ngOnInit(): void {
  }
  
  confirmpwd(){
    if(!this.pwdForm.valid){
      this._snackBar.open("Please enter all the fields", "close", {
        duration: 5000,
    });
    return;
  }
    else{
    this.http
    .post("/api/resetpassword", {data: this.pwdForm.value, username: this.currentUser.username })
    .subscribe((resp) => {
      console.log(resp)
      this.message=resp;
      if(this.message["message"] == 'Your new password has been updated successfully'){
        this._snackBar.open(this.message["message"], "close", {
          duration: 5000,
        });
        this.router.navigate(["/profile"])
      }
      else{
            this._snackBar.open(this.message["message"], "close", {
              duration: 5000,
            });
            this.ngOnInit();
  }

})

    }

  }
}
