import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA3T2E7BiIHA2zeAOCipZshOxME9xptSgY",
    authDomain: "facebook-messenger-clone-dr.firebaseapp.com",
    databaseURL: "https://facebook-messenger-clone-dr.firebaseio.com",
    projectId: "facebook-messenger-clone-dr",
    storageBucket: "facebook-messenger-clone-dr.appspot.com",
    messagingSenderId: "862041627919",
    appId: "1:862041627919:web:f8151b70630f7694baf27a",
    measurementId: "G-BV8B5M3BGZ"
  });

  const db = firebaseApp.firestore();

  export default db;