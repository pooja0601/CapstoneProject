import {Component, NgModule, OnInit} from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
//import {IStarRatingOnClickEvent, IStarRatingOnRatingChangeEven, IStarRatingIOnHoverRatingChangeEvent} from "angular-star-rating/src/star-rating-struct";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  constructor() { }
  
  ngOnInit() {
  }
  
  countStar(star) {
    this.selectedValue = star;
    console.log('Value of star', star);
  }
  
  
}
