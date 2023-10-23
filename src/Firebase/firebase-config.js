// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDXa5HfB9-nzxFF0-3I7m37vTBI-xcZxUg',
  authDomain: 'dummy-48868.firebaseapp.com',
  projectId: 'dummy-48868',
  storageBucket: 'dummy-48868.appspot.com',
  messagingSenderId: '27700090544',
  appId: '1:27700090544:web:b256df0fd2e52ca565cd75',
  measurementId: 'G-9MTJQH2YGL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db};
