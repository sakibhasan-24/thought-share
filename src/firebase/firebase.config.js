// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoh_RmNnU2w2MDbRHvmVPphdGDl8fDZtE",
  authDomain: "thought-share-blog.firebaseapp.com",
  projectId: "thought-share-blog",
  storageBucket: "thought-share-blog.appspot.com",
  messagingSenderId: "120180719367",
  appId: "1:120180719367:web:2a7c30c50054db65278fa2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
