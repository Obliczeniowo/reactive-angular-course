import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../services/loading.service';
import { MessagesService } from '../services/messages.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers: [
      LoadingService,
      MessagesService,
    ]
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course: Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        private courses: CoursesService,
        private loading: LoadingService,
        private messages: MessagesService,
        @Inject(MAT_DIALOG_DATA) course: Course,
      ) {
        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription, Validators.required]
        });
    }

    ngAfterViewInit() {

    }

    save() {
      const changes = this.form.value;

      this.loading.showUntilCompleted(
        this.courses.save(this.course.id, changes)
      ).pipe(
        catchError((err: any) => {
          this.messages.showErrors('Can\'t save course');

          return throwError(err);
        })
      ).subscribe((resp) => {
        this.dialogRef.close(resp);
      });
    }

    close() {
        this.dialogRef.close();
    }

}
