// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHwRf-fbzSLVutvMNR62u4FcOf8wePu48",
  authDomain: "wise-doctor-6d541.firebaseapp.com",
  databaseURL: "https://wise-doctor-6d541-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wise-doctor-6d541",
  storageBucket: "wise-doctor-6d541.appspot.com",
  messagingSenderId: "369224307971",
  appId: "1:369224307971:web:a3d2796f64f1ed52bbc536",
  measurementId: "G-7182ELP7KX"




  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID


};
let  app

if (!getApps() || getApps().length === 0 ) {
  app = initializeApp(firebaseConfig);
}
else {
  app = firebase.getApp
}

// Initialize Firebase


// initialize auth
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default app;

