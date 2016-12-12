import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from '../shared/model/lesson';
import { Course } from '../shared/model/course';
import { CoursesService } from '../shared/model/courses.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  lessons$: Observable<Lesson[]>;
  course$: Observable<Course>;
  courseUrl: string;
  lessons: Lesson[];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService) { }

  ngOnInit() {
    this.courseUrl = this.route.snapshot.params['id'];
    //console.log("courseUrl: " + this.courseUrl);
    this.course$ = this.coursesService.findCourseByUrl(this.courseUrl);
    //this.lessons$ = this.coursesService.findAllLessonsForCourse(courseUrl);
    this.lessons$ = this.coursesService.loadFirstLessonsPage(this.courseUrl, 3);
    this.lessons$.subscribe(lessons => this.lessons = lessons);
  }

  next() {
    console.log("courseUrl: ", this.courseUrl);
    console.log("key: ", this.lessons[this.lessons.length - 1].$key);
    this.lessons$ = this.coursesService.loadNextPage(
      this.courseUrl,
      this.lessons[this.lessons.length - 1].$key,
      3
    );
    this.lessons$.subscribe(lessons => this.lessons = lessons);
    console.log("lessons: ", this.lessons);
  }

  previous() {
     this.lessons$ = this.coursesService.loadPreviousPage(
      this.courseUrl,
      this.lessons[0].$key,
      3
    );
    this.lessons$.subscribe(lessons => this.lessons = lessons);
  }

}
