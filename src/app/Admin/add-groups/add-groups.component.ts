import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms'

@Component({
  selector: 'app-add-groups',
  templateUrl: './add-groups.component.html',
  styleUrls: ['./add-groups.component.scss']
})
export class AddGroupsComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, ) { 
    
  }

  proj;
  ngOnInit(): void {

    this.http.post("/api/getGroupProjects",{}).subscribe(resp =>{
      console.log(resp);
    this.proj =resp;
    console.log('view:',this.proj)
    });

  }

  submit(id) {
    console.log(id);
    this.router.navigate(['/createGroup/'+id]);    
  }

}
