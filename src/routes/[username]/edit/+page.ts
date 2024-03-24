import type { PageLoad } from './$types'
import { getProfile } from '$lib/services/ProfileService'

export const load = (async ({ params }) => {
  return await getProfile(params.username as string)
}) satisfies PageLoad
