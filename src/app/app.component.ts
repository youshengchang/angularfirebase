import { Component } from '@angular/core';
import { initializeApp, database } from 'firebase';
import { firebaseConfig } from '../environments/firebase.config';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Introduction to AngularFire!';
  courses$: FirebaseListObservable<any>;
  lessons$ : FirebaseListObservable<any>;
  course$ : FirebaseObjectObservable<any>;
  lesson$ : FirebaseObjectObservable<any>;
  firstCourse : any;

  constructor(private af: AngularFire){

    this.courses$ = af.database.list('courses');

    this.courses$.subscribe(console.log);
    this.course$ = af.database.object('courses/-KYWIhjAzp7HNT3B4evg');

    this.course$.subscribe(console.log);

    this.lessons$ = af.database.list('lessons');

    this.lessons$.subscribe(console.log);
    
    this.lesson$ = af.database.object('lessons/-KYWIhjP3hI23QaMqueM');
    this.lesson$.subscribe(console.log);

    this.courses$.map(courses => courses[0]).subscribe(
      course => this.firstCourse = course
    );
    /*
    courses$.subscribe(
      val => console.log(val)
    );
    */
  }

  listPush(){
    this.courses$.push({description: 'TEST NEW COURSE'})
        .then(
          () => console.log('Push is done'),
          console.error
        );
  }

  removeList(){
    this.courses$.remove(this.firstCourse);

  }

  listUpdate(){
    this.courses$.update(this.firstCourse, {description: "Angular 2 HTTP and Services modified!!!"});
  }

  objectUpdate(){
    this.lesson$.update({description: "NEW UPDATED DESCRIPTION"})
          .then(
            () => console.log("Updated the lesson!!!"),
            console.error
          );
  }

  objSet(){
     this.lesson$.set({description: "NEW UPDATED DESCRIPTION"})
          .then(
            () => console.log("Updated the lesson!!!"),
            console.error
          );
  }

  objectRemove(){
    this.lesson$.remove();
    
  }


}
