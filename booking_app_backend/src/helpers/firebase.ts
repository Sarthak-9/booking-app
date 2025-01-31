import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import config from "./config";

const firebaseConfig = config.firebaseConfig;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
