/* eslint-disable no-console */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getToken, getMessaging } from "firebase/messaging";

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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestPermission = () => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      })
        .then((token: string) => {
          console.log(`푸시 토큰 발급 완료: ${token}`);
        })
        .catch((error: unknown) => {
          console.log(`푸시 토큰 가져오는 중에 에러 발생, ${error}`);
        });
    } else if (permission === "denied") {
      console.log("푸시 권한 차단");
    }
  });
};
