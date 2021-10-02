import firebase from 'firebase/app';
import * as FirebaseCore from 'expo-firebase-core';
import { LogBox } from 'react-native';

// Optionally import the services that you want to use
//import "firebase/auth";
import 'firebase/database';
//import "firebase/firestore";
//import "firebase/functions";
import 'firebase/storage';

// console.log(FirebaseCore.DEFAULT_APP_NAME);
// console.log(FirebaseCore.DEFAULT_APP_OPTIONS);

// const {
//   appId,
//   apiKey,
//   databaseURL,
//   trackingId,
//   messagingSenderId,
//   storageBucket,
//   projectId,
//   authDomain,
//   measurementId,
// } = FirebaseCore.DEFAULT_APP_OPTIONS;

// Initialize Firebase
firebase.initializeApp(FirebaseCore.DEFAULT_APP_OPTIONS);

LogBox.ignoreLogs([`Setting a timer for a long period`]);
