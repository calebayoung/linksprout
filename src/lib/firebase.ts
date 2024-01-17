import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDDbahB9NZt8iU3YRlMUXFJWqo09BTJZwQ',
  authDomain: 'linksprout-2cce7.firebaseapp.com',
  projectId: 'linksprout-2cce7',
  storageBucket: 'linksprout-2cce7.appspot.com',
  messagingSenderId: '287552625797',
  appId: '1:287552625797:web:0bafe11044484598095dec'
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
