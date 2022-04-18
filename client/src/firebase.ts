import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { config__firebase } from "./config/api/firebase";

const app = initializeApp(config__firebase);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);