import { Component, OnInit,Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'

@Component({
  selector: 'app-student',
  templateUrl: './student-class.component.html',
  styleUrls: ['./student-class.component.css'],
})
export class StudentClassComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  students_classes: any[];
  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MdDialog) {}
 
  ngOnInit() { this.getStudentsClasses(); }
 
  getStudentsClasses() {
    this.dataService.getRecords("student_class")
      .subscribe(
        students_classes => this.students_classes = students_classes,
        error =>  this.errorMessage = <any>error);
  }

  deleteStudentClass(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("student_class", id)
          .subscribe(
            student => {this.successMessage = "Record(s) deleted succesfully"; this.getStudentsClasses(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}
