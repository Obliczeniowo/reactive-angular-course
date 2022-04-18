import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, tap, shareReplay, catchError } from 'rxjs/operators';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { LoadingService } from '../services/loading.service';
import { MessagesService } from '../services/messages.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesStorage {
  private coursesSubject: BehaviorSubject<Course[]> = new BehaviorSubject<
    Course[]
  >([]);

  courses: Observable<Course[]> = this.coursesSubject.asObservable();

  constructor(
    protected http: HttpClient,
    protected loading: LoadingService,
    protected messages: MessagesService
  ) {
    this.loadAllCourses();
  }

  loadAllCourses() {
    this.loading
      .showUntilCompleted(
        this.http.get('/api/courses').pipe(
          map((res: { payload: Course[] }) => {
            return res.payload.sort(sortCoursesBySeqNo);
          }),
          catchError((err) => {
            this.messages.showErrors("Can't load courses!");
            return throwError(err);
          }),
          tap((resp) => this.coursesSubject.next(resp))
        )
      )
      .subscribe();
  }

  save(id: string, changes: Partial<Course>): Observable<any> {
    const courses = this.coursesSubject.getValue();

    const index = courses.findIndex((course) => course.id === id);

    const newCourse = {
      ...courses[index],
      ...changes,
    };

    const newCourses = [...courses];

    newCourses[index] = newCourse;

    this.coursesSubject.next(newCourses);

    return this.http.put(`/api/courses/${id}`, changes).pipe(
      catchError((err: any) => {
        this.messages.showErrors('Can\'t save course');

        return throwError(err);
      }),
      shareReplay()
    );
  }

  filterByCategery(category: string): Observable<Course[]> {
    return this.courses.pipe(
      map((courses) =>
        courses
          .filter((course) => course.category === category)
          .sort(sortCoursesBySeqNo)
      )
    );
  }
}
