import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBEPNkvVq2zwu7P7PFQv46RfSXtm7fiFM8",
  authDomain: "gallary-87555.firebaseapp.com",
  projectId: "gallary-87555",
  storageBucket: "gallary-87555.appspot.com",
  messagingSenderId: "708953960118",
  appId: "1:708953960118:web:3064c96837365a45e34017",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage();
