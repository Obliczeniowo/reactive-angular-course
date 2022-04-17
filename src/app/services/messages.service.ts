import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable()
export class MessagesService {
  protected errorsSubject: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  errors: Observable<string[]> = this.errorsSubject
    .asObservable()
    .pipe(filter((messages) => messages && messages.length > 0));

  constructor() {}

  showErrors(...errors: string[]) {
    this.errorsSubject.next(errors);
  }
}
