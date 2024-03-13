import type { PageLoad } from './$types'
import { db } from '$lib/firebase'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { error } from '@sveltejs/kit'

export const load = (async ({ params }) => {
  const collectionRef = collection(db, 'users')
  const q = query(
    collectionRef,
    where('username', '==', params.username),
    limit(1)
  )
  const snapshot = await getDocs(q)
  const exists = snapshot.docs[0]?.exists()
  const data = snapshot.docs[0]?.data()

  if (!exists) {
    throw error(404, 'User not found.') as Error
  }

  if (data.published === false) {
    throw error(403, 'Profile not published.') as Error
  }

  return {
    username: data.username,
    photoUrl: data.photoUrl,
    bio: data.bio,
    links: data.links ?? []
  }
}) satisfies PageLoad
