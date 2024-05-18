import type { PageServerLoad } from './$types'
import { adminAuth, adminDb } from '$lib/server/admin'
import { error } from '@sveltejs/kit'

export const load = (async ({ cookies }) => {
  const sessionCookie = cookies.get('__session')

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie as string)
    const userDoc = await adminDb.collection('users').doc(decodedClaims.uid).get()
    const userData = userDoc.data()

    return {
      bio: userData?.bio
    }
  } catch (e) {
    throw error(401, 'Unauthorized request') as Error
  }
}) satisfies PageServerLoad
