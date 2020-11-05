import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { MatTable } from "@angular/material/table";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { DialogBoxComponent } from "../dialog-box/dialog-box.component";
import { MatDialog } from "@angular/material/dialog";
import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ElementRef,
} from "@angular/core";
//import { DeleteProjectConfirmationDialogService } from '../delete-project-confirmation-dialog/delete-project-confirmation-dialog.service';
export interface UsersData {
  id: number;
  title: string;
  supervisorNames: string;
  unitCode: string;
  status: string;
  // student_four: string;
  // student_five: string;
}
@Component({
  selector: "app-update-project-status",
  templateUrl: "./update-project-status.component.html",
  styleUrls: ["./update-project-status.component.scss"],
})
export class UpdateProjectStatusComponent implements OnInit {
  profileForm = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
    supervisor: new FormControl(""),
    id: new FormControl(""),
  });
  constructor(
    fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog //private confirmationDialogService: DeleteProjectConfirmationDialogService
  ) {
    this.profileForm = fb.group({
      title: ["", Validators.required],
      supervisor: ["", Validators.required],
      id: ["", Validators.required],
    });
  }

  view;
  displayedColumns: string[] = [
    "id",
    "title",
    "supervisorNames",
    "ProjectMode",
    "unitCode",
    "status",
    "actions",
  ];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild("deleteAPIDialog") deleteAPIDialog: TemplateRef<any>;
  @ViewChild("DuplicateAPIDialog") DuplicateAPIDialog: TemplateRef<any>;

  dataSource;
  apidata: any[];
  validate = "false";
  projectStored;
  icon = false;
  //cloning = true;
  ngOnInit(): void {
    this.http
      .post<UsersData[]>("/api/AdminViewProjects", {})
      .subscribe((resp: UsersData[]) => {
        console.log(resp);
        this.view = resp;
        // console.log('view:', this.view)
        this.dataSource = new MatTableDataSource(this.view);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  submit(id) {
    let dialogRef = this.dialog.open(this.deleteAPIDialog);
    dialogRef.afterClosed().subscribe((result) => {
      // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
      if (result !== undefined) {
        if (result === "yes") {
          // TODO: Replace the following line with your code.

          this.http
            .post("/api/admindeleteproject", {
              id: id,
            })
            .subscribe((resp) => {
              console.log(resp);
              this.ngOnInit();
            });

          this._snackBar.open("project has been deleted!!!", "close", {
            duration: 2000,
          });
        } else if (result === "no") {
        }
      }
    });
  }

  edit(id) {
    console.log(id);
    this.router.navigate(["/editProject/" + id]);
  }

  clone(id, mode, project_id, unitCode) {
    let dialogRef = this.dialog.open(this.DuplicateAPIDialog);
    dialogRef.afterClosed().subscribe((result) => {
      // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
      if (result !== undefined) {
        if (result === "yes") {
          // TODO: Replace the following line with your code.

          if (mode == "individual" && project_id == null && unitCode == null) {
            this.http
              .post("/api/CloneProject", {
                id: id,
              })
              .subscribe((resp) => {
                console.log(resp);
                this.ngOnInit();
              });
            this._snackBar.open("Project has been duplicated!!", "Close", {
              duration: 2000,
            });
            //this.ngOnInit();
          } else {
            this._snackBar.open(
              "This project can't be duplicated since it might be a group project or has project id and unit code specified!!",
              "Close",
              {
                duration: 3000,
              }
            );
          }
          console.log(id);
          this.ngOnInit();
        } else if (result === "no") {
        }
      }
    });
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
}
