import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVDrExMDoVdiv_gjhhCqb5c6PT8ohSJ5M",
  authDomain: "izledim-final.firebaseapp.com",
  databaseURL:
    "https://izledim-final-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "izledim-final",
  storageBucket: "izledim-final.appspot.com",
  messagingSenderId: "930626182729",
  appId: "1:930626182729:web:007d76830e44bd9afda998",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
