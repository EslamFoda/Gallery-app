import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB9d3gUdclsltXSKqMqTYq4eHQl5A_r044",
  authDomain: "project-77aff.firebaseapp.com",
  projectId: "project-77aff",
  storageBucket: "project-77aff.appspot.com",
  messagingSenderId: "34422984714",
  appId: "1:34422984714:web:f8099d219d9d9138fa8ff3"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const projectAuth = firebase.auth()
const storage = firebase.storage()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export {db,projectAuth,storage,timestamp}
