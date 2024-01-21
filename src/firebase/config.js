import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBG9X4A5-OlgR3d5oCje1fP9Wz0S8pYhIc',
  authDomain: 'blog-791a5.firebaseapp.com',
  projectId: 'blog-791a5',
  storageBucket: 'blog-791a5.appspot.com',
  messagingSenderId: '153293416696',
  appId: '1:153293416696:web:19aa367cb24241733ab30d',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
