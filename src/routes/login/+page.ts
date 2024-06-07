import type { PageLoad } from './$types'

export const load = (async ({ url }) => {
  return {
    action: url.searchParams.get('action')
  }
}) satisfies PageLoad
