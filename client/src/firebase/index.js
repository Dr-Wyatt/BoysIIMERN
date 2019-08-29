import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/database';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDrJDzMRXIKC2Iliq0SdmTrE9JS5iWJXA4",
    authDomain: "likely-db.firebaseapp.com",
    databaseURL: "https://likely-db.firebaseio.com",
    projectId: "likely-db",
    storageBucket: "likely-db.appspot.com",
    messagingSenderId: "354125794434",
    appId: "1:354125794434:web:73fa16565ee81a8e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage().ref();
  const database = firebase.database().ref();

  export {
    storage, database, firebase as default
  }