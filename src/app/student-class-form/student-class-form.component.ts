import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-student-class-form',
  templateUrl: './student-class-form.component.html',
  styleUrls: ['./student-class-form.component.css']
})
export class StudentClassFormComponent implements OnInit {

  studentClassForm: NgForm;
  @ViewChild('studentClassForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  student_class: object;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("student_class", +params['id']))
      .subscribe(student_class => this.student_class = student_class);
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

  saveStudentClass(student_class: NgForm){
    if(typeof student_class.value.student_class_id === "number"){
      this.dataService.editRecord("student_class", student_class.value, student_class.value.student_class_id)
          .subscribe(
            student_class => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("student_class", student_class.value)
          .subscribe(
            student_class => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.student_class = {};
    }

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.studentClassForm = this.currentForm;
    this.studentClassForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.studentClassForm.form;

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
    'class_id': ''


  };

  validationMessages = {
 
    'student_id': {
      'required': 'Grade Id is required.',
      'maxlength': 'Grade Id cannot be more than 50 characters long.'
    },

    'class_id': {
      'required': 'Grade Id is required.',
      'maxlength': 'Grade Id cannot be more than 50 characters long.'
    }


  }

}

