import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9IE2aZ04NBIBaMVkq-KDpjHHUqTg4n5U",
  authDomain: "neosync-cloud.firebaseapp.com",
  projectId: "neosync-cloud",
  storageBucket: "neosync-cloud.appspot.com",
  messagingSenderId: "448926343676",
  appId: "1:448926343676:web:112a50478b675bb5b11279",
  measurementId: "G-L519QPLLZS",
};

let app;

try {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
} catch (error) {
  app = initializeApp(firebaseConfig);
}

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
