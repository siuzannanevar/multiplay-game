import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCgqvchkc-DW7R3vJPk16lUAGqih5FxNO0",
  authDomain: "multiplay-game-34008.firebaseapp.com",
  databaseURL: "https://multiplay-game-34008-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "multiplay-game-34008",
  storageBucket: "multiplay-game-34008.firebasestorage.app",
  messagingSenderId: "11851336495",
  appId: "1:11851336495:web:37fc58b3f4a097657b2fda"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);