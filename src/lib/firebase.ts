import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { writable } from 'svelte/store';

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

function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser');
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    };
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

export const user = userStore();
