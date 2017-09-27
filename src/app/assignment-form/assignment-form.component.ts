import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css']
})
export class AssignmentFormComponent implements OnInit {

  assignmentForm: NgForm;
  @ViewChild('assignmentForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  assignment: object;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("assignment", +params['id']))
      .subscribe(assignment => this.assignment = assignment);
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

  saveAssignment(assignment: NgForm){
    if(typeof assignment.value.assignment_id === "number"){
      this.dataService.editRecord("assignment", assignment.value, assignment.value.assignment_id)
          .subscribe(
            assignment=> this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("assignment", assignment.value)
          .subscribe(
            student => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.assignment = {};
    }

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.assignmentForm = this.currentForm;
    this.assignmentForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.assignmentForm.form;

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
    'student_id': '',
    'assignment_nbr': '',
    'grade_id': '',
    'class_id': '',

  };

  validationMessages = {
    'student_id': {
      'required': 'Student Id is required.',
      'minlength': 'Student Id must be at least 1 characters long.',
      'maxlength': 'Student Id cannot be more than 11 characters long.'
    },
    'assignment_nbr': {
      'required': 'Assignment nbr is required.',
      'minlength': 'Assignment nbr must be at least 3 characters long.',
      'maxlength': 'Assignment nbrcannot be more than 11 characters long.'
    },
    'grade_id': {
      'required': 'Grade Id is required.',
      'maxlength': 'Grade Id cannot be more than 11 characters long.'
    },
    'class_id':{
    'required': 'Class Id is required.',
    'maxlength': 'Class Id cannot be more than 11 characters long.'
    }
 
  };

}
