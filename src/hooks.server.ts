import type { Handle } from '@sveltejs/kit'
import { adminAuth } from '$lib/server/admin'

export const handle = (async ({ event, resolve }) => {
  const sessionCookie: string = event.cookies.get('__session') ?? ''

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie)
    event.locals.userID = decodedClaims.uid
  } catch (e) {
    event.locals.userID = null
  }
  return await resolve(event)
}) satisfies Handle
