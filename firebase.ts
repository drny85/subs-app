// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getApp, getApps, initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: 'AIzaSyBm2rXewvnGfXC995-BMeTu4ySeOQMrVzU',
   authDomain: 'students-5bf85.firebaseapp.com',
   projectId: 'students-5bf85',
   storageBucket: 'students-5bf85.appspot.com',
   messagingSenderId: '959214587888',
   appId: '1:959214587888:web:c860cb7cce873e28319735',
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const initFirebase = () => app;
