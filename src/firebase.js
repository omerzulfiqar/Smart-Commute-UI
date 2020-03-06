import firebase from "firebase";

const config = {
    apiKey: "AIzaSyCPSIyH0iyF1cIeIOmOk255_gYoYLUhNbU",
    authDomain: "ri-c1340.firebaseapp.com",
    databaseURL: "https://ri-c1340.firebaseio.com",
    projectId: "ri-c1340",
    storageBucket: "ri-c1340.appspot.com",
    messagingSenderId: "286750671445",
    appId: "1:286750671445:web:7ece0f2ff88dbe42590adc"
};
// Initialize Firebase
const initializedFirebaseApp = firebase.initializeApp(config);
const messaging = initializedFirebaseApp.messaging();


export { messaging };