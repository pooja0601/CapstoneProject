import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-data-analysis",
  templateUrl: "./data-analysis.component.html",
  styleUrls: ["./data-analysis.component.scss"],
})
export class DataAnalysisComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
      ],
    },
  };
  public studentChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
      ],
    },
  };
  public barChartLabels = [];
  public barChartType = "bar";
  public barChartLegend = true;
  public barChartData = [{ data: [], label: "Client Projects" }];

  public studentChartLabels = [];
  public studentChartType = "bar";
  public studentChartLegend = true;
  public studentChartData = [{ data: [], label: "Enrolled students" }];

  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType: string = "doughnut";
  public pieChartColors: Array<any> = [
    {
      backgroundColor: [
        "rgba(255,0,0,0.3)",
        "rgba(0,0,255,0.3)",
        "rgba(0,255,0,0.3)",
        "rgba(255,255,0,0.3)",
      ],
      // borderColor: [
      //   "rgba(135,206,250,1)",
      //   "rgba(106,90,205,1)",
      //   "rgba(148,159,177,1)",
      // ],
    },
  ];
  public slotChartLabels: string[] = [];
  public slotChartData: number[] = [];
  public slotChartType: string = "doughnut";
  public slotChartColors: Array<any> = [
    {
      backgroundColor: [
        "rgba(255,0,0,0.3)",
        "rgba(0,0,255,0.3)",
        // "rgba(0,255,0,0.3)",
        // "rgba(255,255,0,0.3)",
      ],
      // borderColor: [
      //   "rgba(135,206,250,1)",
      //   "rgba(106,90,205,1)",
      //   "rgba(148,159,177,1)",
      // ],
    },
  ];

  constructor(private http: HttpClient) {}
  values;
  statusValues;
  studentValues;
  bookslots;

  ngOnInit(): void {
    this.http.post("/api/admin/getProjectTypes", {}).subscribe((resp) => {
      this.values = resp;
      this.values.forEach((element) => {
        this.doughnutChartLabels.push(element.type);
        this.doughnutChartData.push(element.count);
      });
    });
    this.http.post("/api/admin/getStatus", {}).subscribe((resp) => {
      this.statusValues = resp;
      this.statusValues.forEach((element) => {
        this.barChartLabels.push(element.status);
        this.barChartData[0].data.push(element.count);
      });
    });
    this.http.post("/api/admin/getStudents", {}).subscribe((resp) => {
      this.studentValues = resp;
      this.studentValues.forEach((element) => {
        this.studentChartLabels.push(element.course);
        this.studentChartData[0].data.push(element.count);
      });
    });
    this.http.post("/api/admin/getSlots", {}).subscribe((resp) => {
      console.log(resp);
      this.bookslots = resp;
      this.slotChartData.push(this.bookslots[0][0].bookedslots);
      this.slotChartData.push(this.bookslots[1][0].emptyslots);
      this.slotChartLabels.push("bookedslots", "emptyslots");
    });
  }
}
