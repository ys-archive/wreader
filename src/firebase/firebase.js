import firebase from 'firebase/app';
import * as FirebaseCore from 'expo-firebase-core';
import { LogBox } from 'react-native';

// Optionally import the services that you want to use
//import "firebase/auth";
// import 'firebase/database';
//import "firebase/firestore";
//import "firebase/functions";
import 'firebase/storage';

// TODO: 테스트 후 삭제
// android
//
// Object {
//   "apiKey": "AIzaSyC2XMgtqeZ-4-VJvG25lh3E8T6qDjNMvs8",
//   "appId": "1:859014956998:android:23db6ffc786633727654c7",
//   "databaseURL": "https://wreader-1f87a-default-rtdb.firebaseio.com",
//   "messagingSenderId": "859014956998",
//   "projectId": "wreader-1f87a",
//   "storageBucket": "wreader-1f87a.appspot.com",
// }
// Running application on Android SDK built for x86.

// ios
//
// Object {
//   "apiKey": "AIzaSyC2fzy7LYbB30SAAwY6YjOzrgf3mG2rPOA",
//   "appId": "1:859014956998:ios:773053e1b7de7eff7654c7",
//   "clientId": "859014956998-9h78k7vt1t6uv475p8m1ab2a7hhkgrhf.apps.googleusercontent.com",
//   "databaseURL": "https://wreader-1f87a-default-rtdb.firebaseio.com",
//   "messagingSenderId": "859014956998",
//   "projectId": "wreader-1f87a",
//   "storageBucket": "wreader-1f87a.appspot.com",
// }
// Running application on ys's 12.

// console.log(FirebaseCore.DEFAULT_APP_NAME);
console.log(FirebaseCore.DEFAULT_APP_OPTIONS);

const {
  appId,
  apiKey,
  databaseURL,
  trackingId,
  messagingSenderId,
  storageBucket,
  projectId,
  authDomain,
  measurementId,
} = FirebaseCore.DEFAULT_APP_OPTIONS;

// Initialize Firebase
firebase.initializeApp(FirebaseCore.DEFAULT_APP_OPTIONS);

LogBox.ignoreLogs([`Setting a timer for a long period`]);
