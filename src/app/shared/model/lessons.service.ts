import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2/index';
import { Observable } from 'rxjs/Rx';
import { Lesson } from './lesson';


@Injectable()
export class LessonsService {

  constructor(private af: AngularFire) { }

  findAllLessons(): Observable<Lesson[]>{
    return this.af.database.list('lessons')
                .do(console.log)
                .map(Lesson.fromJsonList);
  }

}
