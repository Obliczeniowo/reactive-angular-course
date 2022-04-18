import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CoursesService } from '../services/courses.service';


@Component({
  selector: 'course',
  templateUrl: './search-lessons.component.html',
  styleUrls: ['./search-lessons.component.css']
})
export class SearchLessonsComponent implements OnInit {
  searchResult: Observable<Lesson[]>;

  activeLesson: Lesson;

  constructor(protected courses: CoursesService) {
  }

  ngOnInit() {
  }

  onSearch(search: string) {
    this.searchResult = this.courses.searchLessons(search);
  }

  onBackToSearch() {
    this.activeLesson = null;
  }

  openLesson(lesson: Lesson) {
    this.activeLesson = lesson;
  }

}











