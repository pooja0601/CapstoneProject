import { MatTabsModule } from "@angular/material/tabs";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { appRoutingModule } from "./app.routing";
import { JwtInterceptor, ErrorInterceptor } from "./_helpers";
import { HomeComponent } from "./home";
import { AdminComponent } from "./admin";
import { LoginComponent } from "./login";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MailSendComponent } from "./admin/mail-send/mail-send.component";
import { AddProjectsComponent } from "./Client/addProjects/addProjects.component";
import { ViewProjectDetailsComponent } from "./Client/view-project-details/view-project-details.component";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { UpdateProjectStatusComponent } from "./admin/update-project-status/update-project-status.component";
import { ShowStudentsMarksComponent } from "./admin/show-students-marks/show-students-marks.component";
import { CalculateStudentMarkComponent } from "./admin/calculate-student-mark/calculate-student-mark.component";
import { FormulaCalculationComponent } from "./admin/formula-calculation/formula-calculation.component";
import { EditProjectsComponent } from "./admin/edit-projects/edit-projects.component";
import { DialogBoxComponent } from "./admin/dialog-box/dialog-box.component";
import { CreateGroupsComponent } from "./admin/create-groups/create-groups.component";
import { AddGroupsComponent } from "./admin/add-groups/add-groups.component";
import { PptsessionComponent } from "./admin/pptsession/pptsession.component";
import { ViewsessionComponent } from "./admin/viewsession/viewsession.component";
import { BookingslotComponent } from "./Student/bookingslot/bookingslot.component";
import { RegisterComponent } from "./register/register.component";
import { FeedbackComponent } from "./Client/feedback/feedback.component";
import { MatListModule } from "@angular/material/list";
import { ReviewStudentComponent } from "./Client/review-student/review-student.component";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { TestComponent } from "./Client/test/test.component";
import { MatStepperModule } from "@angular/material/stepper";
import { MaterialModule } from "./material/material.module";
import { StudentComponent } from "./student/student.component";
import { ClientHomeComponent } from "./Client/client-home/client-home.component";
import { NotificationsComponent } from "./Client/notifications/notifications.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { UploadDetailsComponent } from "./Student/upload-details/upload-details.component";
import { ViewProjectsComponent } from "./Student/view-projects/view-projects.component";
import { ViewIndComponent } from "./Client/view-ind/view-ind.component";
import { ViewProjectComponent } from "./Student/view-project/view-project.component";
import { EditGroupsComponent } from "./admin/edit-groups/edit-groups.component";
import { MatSortModule } from "@angular/material/sort";
import { EditGroupsDialogComponent } from "./admin/edit-groups-dialog/edit-groups-dialog.component";
import { TESTINGComponent } from "./admin/testing/testing.component";
import { StudentShowProjectsComponent } from "./Student/student-show-projects/student-show-projects.component";
import { PublishDialogComponent } from "./admin/publish-dialog/publish-dialog.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { ChartsModule } from "ng2-charts";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ViewGroupsComponent } from "./Student/view-groups/view-groups.component";
import { JoinGroupComponent } from "./Student/join-group/join-group.component";
import { ApprovedStudentsComponent } from "./Client/approved-students/approved-students.component";
import { ViewslotComponent } from "./Student/viewslot/viewslot.component";
import { CalculateWhatIfMarkComponent } from "./Student/calculate-what-if-mark/calculate-what-if-mark.component";
import { ProfileComponent } from "./profile/profile.component";
import { DataAnalysisComponent } from "./Admin/data-analysis/data-analysis.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ResetpasswordComponent } from "./resetpassword/resetpassword.component";
import { AdminFeedbackComponent } from "./Admin/admin-feedback/admin-feedback.component";
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    appRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MaterialModule,
    MatListModule,
    MatDatepickerModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatStepperModule,
    MatInputModule,
    MatSortModule,
    ChartsModule,
    MatSnackBarModule,
    MatGridListModule,
    MDBBootstrapModule.forRoot(),
    MatTabsModule,
  ],
  declarations: [
    AppComponent,
    MailSendComponent,
    AddProjectsComponent,
    ViewProjectDetailsComponent,
    RegisterComponent,
    FeedbackComponent,
    ReviewStudentComponent,
    TestComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    StudentComponent,
    ClientHomeComponent,
    NotificationsComponent,
    UploadDetailsComponent,
    ViewProjectsComponent,
    ViewIndComponent,
    ViewProjectComponent,
    BookingslotComponent,
    PptsessionComponent,
    ViewsessionComponent,
    DialogBoxComponent,
    CreateGroupsComponent,
    AddGroupsComponent,
    ShowStudentsMarksComponent,
    CalculateStudentMarkComponent,
    FormulaCalculationComponent,
    EditProjectsComponent,
    UpdateProjectStatusComponent,
    EditGroupsComponent,
    EditGroupsDialogComponent,
    TESTINGComponent,
    StudentShowProjectsComponent,
    ViewGroupsComponent,
    JoinGroupComponent,
    ApprovedStudentsComponent,
    ViewslotComponent,
    PublishDialogComponent,
    CalculateWhatIfMarkComponent,
    DataAnalysisComponent,
    ProfileComponent,
    ResetpasswordComponent,
    AdminFeedbackComponent,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
