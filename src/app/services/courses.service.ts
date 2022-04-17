import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share, shareReplay } from 'rxjs/operators';
import { Course, sortCoursesBySeqNo } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  beginnerCourses: Course[];

  advancedCourses: Course[];

  constructor(private http: HttpClient) { }

  get(): Observable<Course[]> {
    return this.http.get('/api/courses')
    .pipe(
      map((res: { payload: Course[] }) => {
        return res.payload.sort(sortCoursesBySeqNo);
      }),
      shareReplay()
    );
  }

  save(id: string, course: Partial<Course>): Observable<any> {
    return this.http.put(`/api/courses/${id}`, course).pipe(
      shareReplay()
    );
  }
}
