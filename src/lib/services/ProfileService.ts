import { collection, getDoc, getDocs, limit, query, where, doc, setDoc } from 'firebase/firestore'
import { error } from '@sveltejs/kit'
import { db } from '$lib/firebase'
import type { UserData } from '$lib/firebase'

export const getProfile = async (username: string): Promise<UserData> => {
  const collectionRef = collection(db, 'users')
  const q = query(
    collectionRef,
    where('username', '==', username),
    limit(1)
  )
  const snapshot = await getDocs(q)
  const exists = snapshot.docs[0]?.exists()
  const data = snapshot.docs[0]?.data()

  if (!exists) {
    throw error(404, 'Profile not found.') as Error
  }

  if (data.published === false) {
    throw error(403, 'Profile not published.') as Error
  }

  return {
    username: data.username,
    bio: data.bio,
    photoUrl: data.photoUrl,
    published: data.published,
    links: data.links ?? []
  }
}

export const getProfileByUserId = async (userId: string): Promise<UserData> => {
  const docRef = doc(db, 'users', userId)
  const snapshot = await getDoc(docRef)
  const exists = snapshot.exists()
  const data = snapshot.data()

  if (!exists) {
    throw error(404, 'Profile not found.') as Error
  }

  return {
    username: data?.username,
    bio: data?.bio,
    photoUrl: data?.photoUrl,
    published: data?.published,
    links: data?.links ?? []
  }
}

export const createNewProfile = async (userId: string): Promise<void> => {
  await setDoc(doc(db, 'users', userId), {
    published: false
  })
}
