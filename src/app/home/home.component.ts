import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { Observable, throwError } from 'rxjs';
import {
  catchError,
  filter,
  finalize,
  map,
  mergeAll,
  toArray,
} from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../services/loading.service';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  beginnerCourses: Observable<Course[]>;

  advancedCourses: Observable<Course[]>;

  constructor(
    private loading: LoadingService,
    public courses: CoursesService,
    public messages: MessagesService,
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    const courses = this.courses
      .get()
      .pipe(
        map((categories) => categories.sort(sortCoursesBySeqNo)),
        catchError((err: any) => {
          const message = 'Can\'t load courses';
          this.messages.showErrors(message);
          return throwError(err);
        })
      );

    const loadCurses = this.loading.showUntilCompleted(courses);

    this.beginnerCourses = loadCurses.pipe(
      mergeAll(),
      filter((course) => course.category === 'BEGINNER'),
      toArray()
    );

    this.advancedCourses = loadCurses.pipe(
      mergeAll(),
      filter((course) => course.category === 'ADVANCED'),
      toArray()
    );
  }
}
