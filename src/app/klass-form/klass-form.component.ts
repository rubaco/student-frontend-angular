import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-major-form',
  templateUrl: './klass-form.component.html',
  styleUrls: ['./klass-form.component.css']
})
export class KlassFormComponent implements OnInit {

  klassForm: NgForm;
  @ViewChild('klassForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  klass: object;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("class", +params['id']))
      .subscribe(klass => this.klass = klass);
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

  saveKlass(klass: NgForm){
    if(typeof klass.value.class_id === "number"){
      this.dataService.editRecord("class", klass.value, klass.value.class_id)
          .subscribe(
            klass => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("class", klass.value)
          .subscribe(
            klass => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.klass = {};
    }

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.klassForm = this.currentForm;
    this.klassForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.klassForm.form;

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
    'instructor_id': '',
    'subject': '',
    'course': '',
 
  };

  validationMessages = {
 
    'instructor_id': {
      'required': 'Instructor Id is required.',
      'maxlength': 'Instructor Id cannot be more than 10 characters long.',
    },

    'subject': {
      'maxlength': 'Subject Id cannot be more than 30 characters long.',
    },

    'course': {
      'maxlength': 'Subject Id cannot be more than 30 characters long.',
    }
  };

}

