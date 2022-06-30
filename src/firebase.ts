import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAipgWd3gw5bpAfpFM0nZf2HNybPZZTrJ0',
  authDomain: 'my-portfolio-storage-3b178.firebaseapp.com',
  databaseURL: 'https://my-portfolio-storage-3b178.firebaseio.com',
  projectId: 'my-portfolio-storage-3b178',
  storageBucket: 'my-portfolio-storage-3b178.appspot.com',
  messagingSenderId: '232441622350',
  appId: '1:232441622350:web:658ec59ef3be3b46bcb81f',
  measurementId: 'G-X8XYG54PVR',
};
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
// dbに未定義の値をセットしようとする際に発生するエラーを無視する。
db.settings({ ignoreUndefinedProperties: true });

export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();
