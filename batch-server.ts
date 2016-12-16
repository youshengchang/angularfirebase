import { firebaseConfig } from './src/environments/firebase.config';
import { initializeApp, auth, database } from 'firebase';

var Promise = require('promise');


var Queue = require('firebase-queue');

console.log('Running batch server ...');

initializeApp(firebaseConfig);
auth()
    .signInWithEmailAndPassword('david@infotech.com', 'test123')
    .then(runConsumer)
    .catch(onError);

function onError(err){
    console.error("Could not login", err);
    process.exit();
    
}

function runConsumer(){
    console.log("Running consumer...");

    const lessonsRef = database().ref('lessons');
    const lessonsPerCourseRef = database().ref('lessonsPerCourse');

    const queueRef = database().ref('queue');
    
    const queue = new Queue(queueRef, function(data, progress, resolve, reject){
        console.log('received delete request...', data);
        const deleteLessonPromise = lessonsRef.child(data.lessonId).remove();
        const deleteLessonPerCourePromise =lessonsPerCourseRef.child(`${data.courseId}/${data.lessonId}`).remove();

    Promise.all([deleteLessonPromise, deleteLessonPerCourePromise])
            .then(
                () => {
                    console.log("lesson deleted");
                    resolve();
                }
            )
            .catch(function(){
                console.log("lesson deletion is error");
                reject();
            });
        
    });
}