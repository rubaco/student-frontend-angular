import { Component, OnInit,Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'

@Component({
  selector: 'app-major',
  templateUrl: './major-class.component.html',
  styleUrls: ['./major-class.component.css'],
})
export class MajorClassComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  majors_classes: any[];
  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MdDialog) {}
 
  ngOnInit() { this.getMajorsClasses(); }
 
  getMajorsClasses() {
    this.dataService.getRecords("major_class")
      .subscribe(
        majors_classes => this.majors_classes = majors_classes,
        error =>  this.errorMessage = <any>error);
  }

  deleteMajorClass(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("major_class", id)
          .subscribe(
            major_class => {this.successMessage = "Record(s) deleted succesfully"; this.getMajorsClasses(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}
