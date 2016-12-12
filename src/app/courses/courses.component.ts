import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CoursesService } from '../shared/model/courses.service';
import { Course } from '../shared/model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;

  constructor(private coursesServie: CoursesService) { }

  ngOnInit() {
    this.courses$ = this.coursesServie.findAllCourses();
    console.log(this.courses$);
  }

}
