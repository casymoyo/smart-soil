import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBH_C6clXOdEqtU4l8i1qUebonHvCsWK7k",
  authDomain: "smart-soil-analysis.firebaseapp.com",
  databaseURL: "https://smart-soil-analysis-default-rtdb.firebaseio.com",
  projectId: "smart-soil-analysis",
  storageBucket: "smart-soil-analysis.appspot.com",
  messagingSenderId: "387054769963",
  appId: "1:387054769963:web:26bc8d9799ad30e447d76e"
};


const app = initializeApp(firebaseConfig)

export const db = getDatabase(app);