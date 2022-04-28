// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//firebase
//account: funreadlearning@gmail.com
//pwd: bDq7wiZ:5hfnWGH

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY21oC4LKuCIWECgM7kpQ0_IWgPW4MpZo",
  authDomain: "funread-15660.firebaseapp.com",
  projectId: "funread-15660",
  storageBucket: "funread-15660.appspot.com",
  messagingSenderId: "483511521096",
  appId: "1:483511521096:web:1131b88e19ae8db61bad7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);