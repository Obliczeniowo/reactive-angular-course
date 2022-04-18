import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { CoursesStorage } from '../storages/courses.storages';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  beginnerCourses: Observable<Course[]>;

  advancedCourses: Observable<Course[]>;

  constructor(
    public coursesStorage: CoursesStorage,
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.beginnerCourses = this.coursesStorage.filterByCategery('BEGINNER');

    this.advancedCourses = this.coursesStorage.filterByCategery('ADVANCED');
  }
}
