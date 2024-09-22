// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { query, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: "the-living-treasure-7c43e.firebaseapp.com",
  projectId: "the-living-treasure-7c43e",
  storageBucket: "the-living-treasure-7c43e.appspot.com",
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSENGER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
  measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const getEventDetails = async () => {
  let arr = [];
  const q = query(collection(db, "EventDetails"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
  });

  return arr;
};

export const getProjectDetails = async () => {
  let arr = [];
  const q = query(collection(db, "ProjectDetails"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
  });

  return arr;
};

export const getHomePageVideo = async () => {
  let arr = [];
  const q = query(collection(db, "HomePage"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
  });

  return arr;
};
