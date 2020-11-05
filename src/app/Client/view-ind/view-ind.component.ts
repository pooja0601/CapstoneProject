import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { saveAs } from "file-saver";

@Component({
  selector: "app-view-ind",
  templateUrl: "./view-ind.component.html",
  styleUrls: ["./view-ind.component.scss"],
})
export class ViewIndComponent implements OnInit {
  constructor(private http: HttpClient) {}
  files;

  ngOnInit(): void {
    this.http.post("/api/student/getUploadedFiles", {}).subscribe((data) => {
      console.log(data);
      this.files = data;
    });

    // let file = new Blob(data[0].cv.data, { type: "application/doc" });
    // var fileURL = URL.createObjectURL(file);
    // window.open(fileURL);
  }

  downloadFile(file) {
    const byteArray = new Uint8Array(file.cv.data);

    const a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(
      new Blob([byteArray], { type: "application/doc" })
    );

    console.log(a.href);

    // supply your own fileName here...
    a.download = file.filename;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
