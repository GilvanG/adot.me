import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,  } from "firebase/auth";

import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCCkWi44XOcym8s4gWwRZcDznnFHdcaUhw",
  authDomain: "adot-me-39080.firebaseapp.com",
  projectId: "adot-me-39080",
  storageBucket: "adot-me-39080.appspot.com",
  messagingSenderId: "683756219406",
  appId: "1:683756219406:web:4d0f8e25adb5a654ea605f",
  measurementId: "G-HN5F0CWHP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };