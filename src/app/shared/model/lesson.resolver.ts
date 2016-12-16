import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Lesson } from './lesson';
import  { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { LessonsService } from './lessons.service';

@Injectable()
export class LessonResolver implements Resolve<Lesson>{

    lesson$: Observable<Lesson>;

    constructor(private lessonsService: LessonsService){

    }
    resolve(route:ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Lesson>{
                
                this.lesson$ = this.lessonsService
                            .findLessonByUrl(route.params['id'])
                            .first();
                console.log("LessonResole(): ", this.lesson$);
                return this.lesson$;
            }
}