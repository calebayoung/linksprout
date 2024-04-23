import type { PageLoad } from './$types'
import { getProfile } from '$lib/services/ProfileService'

export const load = (async ({ params, depends }) => {
  depends('profile:links')
  return await getProfile(params.username)
}) satisfies PageLoad
