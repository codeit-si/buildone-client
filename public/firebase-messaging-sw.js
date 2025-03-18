/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js",
);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4pbXgH3J1C8ls0SrgDNfY67VQpyR5lrE",
  projectId: "buildone-29678",
  messagingSenderId: "284541477955",
  appId: "1:284541477955:web:a9ec38ed041a6e2773a0f6",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
