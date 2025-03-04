import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARmwRPMu_kUrNS3WZprTe7rh1jPyjgDfk",
  authDomain: "netflix-clone-4a702.firebaseapp.com",
  projectId: "netflix-clone-4a702",
  storageBucket: "netflix-clone-4a702.firebasestorage.app",
  messagingSenderId: "462512867985",
  appId: "1:462512867985:web:063cfd7efbb5d21099cd30",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db;
