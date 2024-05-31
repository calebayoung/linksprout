import type { PageServerLoad } from './$types'
import { adminDb } from '$lib/server/admin'
import { error, redirect } from '@sveltejs/kit'

export const load = (async ({ locals, params }) => {
  const uid = locals.userID
  if (uid == null) {
    throw redirect(301, '/login') as Error
  }

  const userDoc = await adminDb.collection('users').doc(uid).get()
  const userData = userDoc.data()
  const username = userData?.username
  const bio = userData?.bio

  if (params.username !== username) {
    throw error(401, 'You cannot edit a bio that is not your own.') as Error
  }

  return {
    bio
  }
}) satisfies PageServerLoad
