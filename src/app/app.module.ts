import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { firebaseConfig } from '../environments/firebase.config';
import { AngularFireModule } from 'angularfire2/index';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { HomeComponent } from './home/home.component';

import { LessonsService } from './shared/model/lessons.service';
import { CoursesService } from './shared/model/courses.service';

import { LessonsListComponent } from './lessons-list/lessons-list.component';

import { routerConfig } from './router.config';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LessonsListComponent,
    TopMenuComponent,
    CoursesComponent,
    CourseDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routerConfig)
  ],
  providers: [LessonsService, CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
