import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { StudentComponent }   from '../student/student.component';
import { StudentFormComponent }   from '../student-form/student-form.component';

import { AssignmentComponent }   from '../assignment/assignment.component';
import { AssignmentFormComponent }   from '../assignment-form/assignment-form.component';

import { GradeComponent }   from '../grade/grade.component';
import { GradeFormComponent }   from '../grade-form/grade-form.component';

import { KlassComponent }   from '../klass/klass.component';
import { KlassFormComponent }   from '../klass-form/klass-form.component';

import { MajorComponent }   from '../major/major.component';
import { MajorFormComponent }   from '../major-form/major-form.component';

import { InstructorComponent }   from '../instructor/instructor.component';
import { InstructorFormComponent }   from '../instructor-form/instructor-form.component';

import { MajorClassComponent }   from '../major-class/major-class.component';
import { MajorClassFormComponent }   from '../major-class-form/major-class-form.component';








import { HomeComponent }   from '../home/home.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'student',  component: StudentComponent },
  { path: 'student/edit/:id', component: StudentFormComponent },
  { path: 'student/add', component: StudentFormComponent },
  { path: 'assignment',  component: AssignmentComponent },
  { path: 'assignment/edit/:id', component: AssignmentFormComponent },
  { path: 'assignment/add', component: AssignmentFormComponent },
  { path: 'grade',  component: GradeComponent },
  { path: 'grade/edit/:id', component: GradeFormComponent },
  { path: 'grade/add', component: GradeFormComponent },
  { path: 'class',  component: KlassComponent },
  { path: 'class/edit/:id', component: KlassFormComponent },
  { path: 'class/add', component: KlassFormComponent },
  { path: 'major',  component: MajorComponent },
  { path: 'major/edit/:id', component: MajorFormComponent },
  { path: 'major/add', component: MajorFormComponent },
  { path: 'instructor',  component: InstructorComponent },
  { path: 'instructor/edit/:id', component: InstructorFormComponent },
  { path: 'instructor/add', component: InstructorFormComponent },
  { path: 'major-class',  component: MajorClassComponent },
  { path: 'major-class/edit/:id', component: MajorClassComponent },
  { path: 'major-class/add', component: MajorClassComponent },
  { path: 'major-class-form',  component: MajorClassFormComponent },
  { path: 'major-class-form/edit/:id', component: MajorClassFormComponent },
  { path: 'major-class-form/add', component: MajorClassFormComponent },
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
