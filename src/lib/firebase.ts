import { initializeApp } from 'firebase/app'
import {
  type DocumentData,
  type DocumentReference,
  doc,
  getFirestore,
  onSnapshot
} from 'firebase/firestore'
import { type User, getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import {
  type Invalidator,
  type Readable,
  type Subscriber,
  type Unsubscriber,
  derived,
  writable
} from 'svelte/store'

const firebaseConfig = {
  apiKey: 'AIzaSyDDbahB9NZt8iU3YRlMUXFJWqo09BTJZwQ',
  authDomain: 'linksprout-2cce7.firebaseapp.com',
  projectId: 'linksprout-2cce7',
  storageBucket: 'linksprout-2cce7.appspot.com',
  messagingSenderId: '287552625797',
  appId: '1:287552625797:web:0bafe11044484598095dec'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore()
export const auth = getAuth()
export const storage = getStorage()

interface UserStore {
  subscribe: (
    run: Subscriber<User | null>,
    invalidate?: Invalidator<User | null> | undefined
  ) => Unsubscriber
}

/**
 * Authentication User Store
 * Uses the onAuthStateChanged function to create a Svelte
 * store which is updated anytime the authentication state changes
 * @returns A store with the current Firebase user
 */
function userStore (): UserStore {
  let unsubscribe: () => void

  if (auth == null || globalThis.window == null) {
    console.warn('Auth is not initialized or not in browser')
    const { subscribe } = writable<User | null>(null)
    return {
      subscribe
    }
  }

  // writable is how we create a store
  // First arg: auth?.currentUser is the default value
  //    (or null, using the ?? nullish coalescing operator)
  // Second arg: a callback that contains a set function, which
  //    allows us to change the value of the store
  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user)
    })

    return () => { unsubscribe() }
  })

  return {
    subscribe
  }
}

export const user = userStore()

interface DocStore<T> {
  subscribe: (
    run: Subscriber<T | null>,
    invalidate?: Invalidator<T | null> | undefined
  ) => Unsubscriber
  ref: DocumentReference<DocumentData, DocumentData>
  id: string
}

/**
 * Realtime Document Data Store (Generic)
 * @param {string} path Document path or reference
 * @returns A store with realtime updates on document data
 */
export function docStore<T> (path: string): DocStore<T> {
  let unsubscribe: () => void

  const docRef = doc(db, path)

  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null)
    })

    return () => { unsubscribe() }
  })

  return {
    subscribe,
    ref: docRef,
    id: docRef.id
  }
}

/**
 * User Data Interface
 * Provides type support for the fields
 * we expect to read from the user data store
 */
interface UserData {
  username: string
  bio: string
  photoUrl: string
  published: boolean
  links: any[]
}

/**
 * User Data Store
 * Creates a derived store, combining the
 * authentication user store with the user document
 */
export const userData: Readable<UserData | null> = derived(
  user,
  ($user, set) => {
    if ($user != null) {
      return docStore<UserData>(`users/${$user.uid}`).subscribe(set)
    } else {
      set(null)
    }
  }
)
