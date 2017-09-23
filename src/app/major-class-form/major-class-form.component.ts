import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-major-form',
  templateUrl: './major-class-form.component.html',
  styleUrls: ['./major-class-form.component.css']
})
export class MajorClassFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  major_class: object;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("major_class", +params['id']))
      .subscribe(major_class => this.major_class = major_class);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });

  }

  saveMajorClass(major_class: NgForm){
    if(typeof major_class.value.major_class_id === "number"){
      this.dataService.editRecord("major_class", major_class.value, major_class.value.major_class_id)
          .subscribe(
            major_class => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("major_class", major_class.value)
          .subscribe(
            major_class => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.major_class = {};
    }

  }

}

