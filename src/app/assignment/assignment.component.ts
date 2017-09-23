
import { Component, OnInit,Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css'],
})
export class AssignmentComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  assignments: any[];
  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MdDialog) {}
 
  ngOnInit() { this.getAssignment();
    console.log(this.assignments)
  }
 
  getAssignment() {

    this.dataService.getRecords("assignment")

    
    
      
      .subscribe(
        
        assignments => this.assignments = assignments,
        
        error =>  this.errorMessage = <any>error);
        
  }

  deleteAssignment(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("assignment", id)
          .subscribe(
            assignment => {this.successMessage = "Record(s) deleted succesfully"; this.getAssignment(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}
