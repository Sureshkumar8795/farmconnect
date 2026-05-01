import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBdABpnk7HhUR9lGsF5Kf-GydOAeJ9hOJ4",
  authDomain: "farmconnect-2006.firebaseapp.com",
  projectId: "farmconnect-2006",
  storageBucket: "farmconnect-2006.firebasestorage.app",
  messagingSenderId: "712609427475",
  appId: "1:712609427475:web:f13bc43df48fb910090fe6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);