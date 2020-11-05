import { TestComponent } from "./Client/test/test.component";
import { DataAnalysisComponent } from "./Admin/data-analysis/data-analysis.component";
import { FeedbackComponent } from "./Client/feedback/feedback.component";
import { ReviewStudentComponent } from "./Client/review-student/review-student.component";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home";
import { AdminComponent } from "./admin";
import { LoginComponent } from "./login";
import { AuthGuard } from "./_helpers";
import { Role } from "./_models";

import { AddProjectsComponent } from "./Client/addProjects/addProjects.component";
import { ViewProjectDetailsComponent } from "./Client/view-project-details/view-project-details.component";
import { MailSendComponent } from "./admin/mail-send/mail-send.component";
import { RegisterComponent } from "./register/register.component";
import { CreateGroupsComponent } from "./admin/create-groups/create-groups.component";
import { AddGroupsComponent } from "./admin/add-groups/add-groups.component";

import { StudentComponent } from "./student/student.component";
import { UploadDetailsComponent } from "./Student/upload-details/upload-details.component";
import { ViewIndComponent } from "./Client/view-ind/view-ind.component";
import { ViewProjectsComponent } from "./Student/view-projects/view-projects.component";
import { ViewProjectComponent } from "./Student/view-project/view-project.component";
import { BookingslotComponent } from "./Student/bookingslot/bookingslot.component";
import { ViewslotComponent } from "./Student/viewslot/viewslot.component";
import { ViewsessionComponent } from "./admin/viewsession/viewsession.component";
import { PptsessionComponent } from "./admin/pptsession/pptsession.component";
import { CalculateStudentMarkComponent } from "./admin/calculate-student-mark/calculate-student-mark.component";
import { EditProjectsComponent } from "./admin/edit-projects/edit-projects.component";
import { FormulaCalculationComponent } from "./admin/formula-calculation/formula-calculation.component";
import { UpdateProjectStatusComponent } from "./admin/update-project-status/update-project-status.component";
import { EditGroupsComponent } from "./admin/edit-groups/edit-groups.component";
import { ViewGroupsComponent } from "./Student/view-groups/view-groups.component";
import { NotificationsComponent } from "./Client/notifications/notifications.component";

import { TESTINGComponent } from "./admin/testing/testing.component";
import { StudentShowProjectsComponent } from "./Student/student-show-projects/student-show-projects.component";
import { ShowStudentsMarksComponent } from "./admin/show-students-marks/show-students-marks.component";
import { ApprovedStudentsComponent } from "./Client/approved-students/approved-students.component";
import { CalculateWhatIfMarkComponent } from "./Student/calculate-what-if-mark/calculate-what-if-mark.component";
import { ProfileComponent } from "./profile/profile.component";
import { ResetpasswordComponent } from "./resetpassword/resetpassword.component";
import { AdminFeedbackComponent } from "./Admin/admin-feedback/admin-feedback.component";
const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "addGroup",
    component: AddGroupsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "createGroup",
    component: CreateGroupsComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: "createGroup/:id",
    component: CreateGroupsComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: "editGroups",
    component: EditGroupsComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: "mailSend",
    component: MailSendComponent,
    //canActivate: [AuthGuard],
  },

  {
    path: "dataAnalysis",
    component: DataAnalysisComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "addProject",
    component: AddProjectsComponent,
    //canActivate: [AuthGuard],
  },
  {
    component: UpdateProjectStatusComponent,
    path: "UpdateProjectStatus",
    //canActivate: [AuthGuard]
  },
  {
    path: "addProject/:id",
    component: AddProjectsComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: "viewProject/:id",
    component: AddProjectsComponent,
  },
  {
    path: "approvedStudents",
    component: ApprovedStudentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "test",
    component: TestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "pptsession",
    component: PptsessionComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: "session/:id/:action",
    component: PptsessionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "Formula",
    component: FormulaCalculationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "CalculateWhatIfMarkComponent",
    component: CalculateWhatIfMarkComponent,
  },
  {
    path: "CalculateStudentMark/:id",
    component: CalculateStudentMarkComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   component: RosaViewProjectsComponent,
  //   path: "StudentsViewprojects",
  //   // canActivate: [AuthGuard]
  // },
  {
    path: "StudentsViewprojects",
    component: StudentShowProjectsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "editProject/:id",
    component: EditProjectsComponent,
    //canActivate: [AuthGuard]
  },

  {
    path: "viewProjectDetails",
    component: ViewProjectDetailsComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: "viewsession",
    component: ViewsessionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "bookingslot",
    component: BookingslotComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: "viewProjectDetails",
    component: ViewProjectDetailsComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: "viewslot",
    component: ViewslotComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "student/projectDetails",
    component: ViewProjectsComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: "student/upload-details/project/:projectId",
    component: UploadDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "reviewStudent",
    component: ReviewStudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "reviewStudent/:id",
    component: ReviewStudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "student/project/:projectId/mode/:mode",
    component: ViewProjectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "feedback/:pid/:gid",
    component: FeedbackComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "adminFeedback",
    component: AdminFeedbackComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "setProjectId",
    component: TESTINGComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: "ViewStudentsMarks",
    component: ShowStudentsMarksComponent,
  },

  {
    path: "student/view/groups",
    component: ViewGroupsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "notifications",
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "resetpassword",
    component: ResetpasswordComponent,
    canActivate: [AuthGuard],
  },

  // otherwise redirect to home
  { path: "**", redirectTo: "" },
];

export const appRoutingModule = RouterModule.forRoot(routes);
