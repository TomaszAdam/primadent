// import firebase from "firebase/app";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwzp6Zp3cV98EjVO81buDmIlwsn-JfL0M",
  authDomain: "primadent-d96de.firebaseapp.com",
  databaseURL: "https://primadent-d96de-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "primadent-d96de",
  storageBucket: "primadent-d96de.appspot.com",
  messagingSenderId: "375690770066",
  appId: "1:375690770066:web:ac1e660985944b14e8584b",
  measurementId: "G-VCL1MJF0NR"
};
export let auth, firestore;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
if (typeof window !== "undefined") {
  auth = firebase.auth();
  firestore = firebase.firestore();
}
