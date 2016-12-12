
import {AuthMethods, AuthProviders} from "angularfire2";

export const firebaseConfig = {
    apiKey: "AIzaSyDMlzXDn6tsnh0h1IV69RbyCjYIov-q1Fs",
    authDomain: "final-project-recording-b19ae.firebaseapp.com",
    databaseURL: "https://final-project-recording-b19ae.firebaseio.com",
    storageBucket: "final-project-recording-b19ae.appspot.com",
    messagingSenderId: "841100139804"
};



export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};