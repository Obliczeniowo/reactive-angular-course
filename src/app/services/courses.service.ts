import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { Lesson } from '../model/lesson';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  get(): Observable<Course[]> {
    return this.http.get('/api/courses').pipe(
      map((res: { payload: Course[] }) => {
        return res.payload.sort(sortCoursesBySeqNo);
      }),
      shareReplay()
    );
  }

  save(id: string, course: Partial<Course>): Observable<any> {
    return this.http.put(`/api/courses/${id}`, course).pipe(shareReplay());
  }

  loadCoursesById(courseId: number): Observable<Course> {
    return this.http
      .get<Course>(`/api/courses/${courseId}`)
      .pipe(shareReplay());
  }

  loadAllCoursesLessons(courseId: number): Observable<Lesson[]> {
    return this.http
      .get('/api/lessons', {
        params: {
          pageSize: 10000,
          courseId: courseId.toString()
        },
      })
      .pipe(
        map((res: { payload: Lesson[] }) => res.payload),
        shareReplay()
      );
  }

  searchLessons(search: string): Observable<Lesson[]> {
    return this.http
      .get('/api/lessons', {
        params: {
          filter: search,
          pageSize: 100,
        },
      })
      .pipe(
        map((res: { payload: Lesson[] }) => res.payload),
        shareReplay()
      );
  }
}
