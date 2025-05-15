// Import the functions you need from the SDKs you need\

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBj1BDIPiAZvFxg1yPxoLuyj35qGZErXUs",
  authDomain: "semestersimplified-9b710.firebaseapp.com",
  projectId: "semestersimplified-9b710",
  storageBucket: "semestersimplified-9b710.firebasestorage.app",
  messagingSenderId: "1082853937395",
  appId: "1:1082853937395:web:7ba48335c4a78636a0e786",
  measurementId: "G-EMDD1XHM9R"
};

console.log("this is firebase config",firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log("this is app",app);

const storage = getStorage(app);

export { storage };