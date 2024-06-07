import type { PageServerLoad, Actions } from './$types'
import { adminDb } from '$lib/server/admin'
import { error, fail, redirect } from '@sveltejs/kit'

export const load = (async ({ locals, params }) => {
  const uid = locals.userID
  if (uid == null) {
    throw redirect(301, '/login?action=signOut') as Error
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

export const actions = {
  default: async ({ locals, request, params }) => {
    const uid = locals.userID ?? ''
    const data = await request.formData()
    const bio = data.get('bio') as string

    const userRef = adminDb.collection('users').doc(uid)
    const userDoc = await userRef.get()
    const userData = userDoc.data()
    const username = userData?.username

    if (params.username !== username) {
      throw error(401, 'You cannot edit a bio that is not your own.') as Error
    }
    if (bio.length > 260) {
      return fail(400, { problem: 'Bio must be less than 260 characters.' })
    }

    await userRef.update({
      bio
    })

    return {
      bio
    }
  }
} satisfies Actions
