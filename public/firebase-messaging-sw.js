/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

import { FIREBASE_CONFIG } from "@/constants/firebase";

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
  apiKey: FIREBASE_CONFIG.API_KEY,
  projectId: FIREBASE_CONFIG.PROJECT_ID,
  messagingSenderId: FIREBASE_CONFIG.MESSAGING_SENDER_ID,
  appId: FIREBASE_CONFIG.APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
