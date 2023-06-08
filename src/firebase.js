// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfxzKrt1uW5sufntY-O50UdMyLo3l_RQ8",
  authDomain: "udemy-e9cd0.firebaseapp.com",
  projectId: "udemy-e9cd0",
  storageBucket: "udemy-e9cd0.appspot.com",
  messagingSenderId: "693079290897",
  appId: "1:693079290897:web:c05856c755e0cfcad36db0",
  measurementId: "G-E2HWC6LRVD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
