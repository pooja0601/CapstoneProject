import { Component } from "@angular/core";
import { first } from "rxjs/operators";

import { User, Role } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html',
styleUrls: ['./home.component.scss']}
)
export class HomeComponent {
  loading = false;
  currentUser: User;
  userFromApi: User;


    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
      }
    
      get isClient() {
        return this.currentUser.role === Role.Client;
      }
    
      get isStudent() {
        return this.currentUser.role === Role.Student;
      }
      
    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

  ngOnInit() {
    this.loading = true;
    this.userService
      .getById(this.currentUser.id)
      .pipe(first())
      .subscribe((user) => {
        this.loading = false;
        this.userFromApi = user;
      });
  }
}
