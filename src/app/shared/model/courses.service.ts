import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import {FirebaseListFactoryOpts} from "angularfire2/interfaces";
import { Observable } from 'rxjs/Rx';
import { Course } from './course';
import { Lesson } from './lesson';

@Injectable()
export class CoursesService {

  constructor(private db: AngularFireDatabase ) { }

  findAllCourses(): Observable<Course[]>{
    console.log(this.db.list('courses').flatMap(fbobj => Observable.combineLatest(fbobj)));
    
    return this.db.list('courses').map(Course.fromJsonArray);
  }

 findCourseByUrl(courseUrl:string): Observable<Course> {
        return this.db.list('courses', {
            query: {
                orderByChild: 'url',
                equalTo: courseUrl
            }
        })
        .map(results => results[0]);
  }
  

  findLessonKeysPerCourseUrl(courseUrl:string, query: FirebaseListFactoryOpts={}): Observable<string[]>{
    return this.findCourseByUrl(courseUrl)
               .do(course => console.log("course", course))
               .filter(course => !!course)
               .switchMap(course => this.db.list(`lessonsPerCourse/${course.$key}`, query))
               .map(lspc => lspc.map(lpc =>lpc.$key));
  }

  findLessonsForLessonKeys(lessonKeys$: Observable<string[]>): Observable<Lesson[]>{
    return lessonKeys$
          .map(lspc => lspc.map(lessonKey => this.db.object('lessons/' + lessonKey)))
          .flatMap(fbobj => Observable.combineLatest(fbobj));
  }
  findAllLessonsForCourse(courseUrl:string): Observable<Lesson[]>{
    
    return this.findLessonsForLessonKeys(this.findLessonKeysPerCourseUrl(courseUrl));
    
    /*
    return this.findLessonKeysPerCourseUrl(courseUrl)
              .map(lspc => lspc.map(lessonKey => this.db.object('lessons/' + lessonKey)))
              .flatMap(fbobj => Observable.combineLatest(fbobj));
    */
                         // .do(console.log);
    //courseLessons$.subscribe();
    
    //return Observable.of([]);
    
  }

  loadFirstLessonsPage(courseUrl:string, pageSize: number):Observable<Lesson[]>{

    const firstPageLessonKeys$ = this.findLessonKeysPerCourseUrl(courseUrl,
      {
        query: {
          limitToFirst: pageSize
        }
      }
    );
    //console.log(firstPageLessonKeys$.map(key => key.map(c => c.toString())));
    return this.findLessonsForLessonKeys(firstPageLessonKeys$);
  }

  loadNextPage(courseUrl:string,
               lessonKey:string,
               pageSize: number): Observable<Lesson[]>{
      
    const lessonKeys$ = this.findLessonKeysPerCourseUrl(courseUrl,
      {
        query: {
          orderByKey: true,
          startAt: lessonKey,
          limitToFirst: pageSize + 1
        }
      });
   
    return this.findLessonsForLessonKeys(lessonKeys$)
              .map(lessons => lessons.slice(1, lessons.length));

  }

   loadPreviousPage(courseUrl:string,
               lessonKey:string,
               pageSize: number): Observable<Lesson[]>{
      
    const lessonKeys$ = this.findLessonKeysPerCourseUrl(courseUrl,
      {
        query: {
          orderByKey: true,
          endAt: lessonKey,
          limitToLast: pageSize + 1
        }
      });
   
    return this.findLessonsForLessonKeys(lessonKeys$)
              .map(lessons => lessons.slice(0, lessons.length -1));

  }


}
