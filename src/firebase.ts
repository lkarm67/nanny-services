import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = { 

  apiKey: "AIzaSyD716IyOmVRI1ygnsMtyzv3f2sHB8xcpGQ", 

  authDomain: "nanny-app-592ca.firebaseapp.com", 

  projectId: "nanny-app-592ca", 

  storageBucket: "nanny-app-592ca.firebasestorage.app", 

  messagingSenderId: "1091584778793", 

  appId: "1:1091584778793:web:e2b366e38064466186f238", 
};    

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);

















