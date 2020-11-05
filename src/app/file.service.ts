import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/_models";
import { AuthenticationService } from "src/app/_services";
@Injectable({
  providedIn: "root",
})
export class FileService {
  currentUser: User;
  projectId;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );

    // this.href.substring(this.href.lastIndexOf('/') + 1)
    this.projectId = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );
  }

  public upload(formData) {
    const SERVER_URL =
      "http://localhost:3000/student/" +
      this.currentUser.username +
      "/project/" +
      this.projectId +
      "/uploadCv";
    return this.http.post<any>(SERVER_URL, formData, {
      reportProgress: true,
      observe: "events",
    });
  }
}
