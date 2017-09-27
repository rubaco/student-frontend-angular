import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.css']
})
export class InstructorFormComponent implements OnInit {

  instructorForm: NgForm;
  @ViewChild('instructorForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  instructor: object;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("instructor", +params['id']))
      .subscribe(instructor => this.instructor = instructor);
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

  saveInstructor(instructor: NgForm){
    if(typeof instructor.value.instructor_id === "number"){
      this.dataService.editRecord("instructor", instructor.value, instructor.value.instructor_id)
          .subscribe(
            instructor => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("instructor", instructor.value)
          .subscribe(
            instructor => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.instructor= {};
    }

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.instructorForm = this.currentForm;
    this.instructorForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.instructorForm.form;

    for (let field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'first_name': '',
    'last_name': '',
    'major_id': '',
    'years_of_experience': '',
    'tenured': ''



  };

  validationMessages = {
 
    'first_name': {
      'required': 'first name is required.',
      'maxlength': 'first name cannot be more than 50 characters long.'
    },

    'last_name': {
      'required': 'last name is required.',
      'maxlength': 'last name cannot be more than 50 characters long.'
    },

    'major_id': {
      'required': 'major id is required.',
      'maxlength': 'major Id cannot be more than 50 characters long.'
    },

    'years_of_experience': {
      'required': 'years of experience is required.',
      'maxlength': 'years of experience cannot be more than 50 characters long.'
    },

    'tenured': {
      'required': 'tenured is required.',
      'maxlength': 'tenured cannot be more than 50 characters long.'
    }

   

  }


}

