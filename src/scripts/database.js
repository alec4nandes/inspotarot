import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { IS_DEVELOPMENT } from "./openai.js";
import config, { devConfig } from "./db-config.js";

// Initialize Firebase
const app = initializeApp(IS_DEVELOPMENT ? devConfig : config),
    auth = getAuth(app),
    db = getFirestore(app);

export { auth, db };
