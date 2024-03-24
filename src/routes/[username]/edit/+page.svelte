<script lang="ts">
  import type { PageData } from './$types'
  import EditCheck from '$lib/components/EditCheck.svelte'
  import Profile from '$lib/components/Profile.svelte'
  import Button from '$lib/components/Button.svelte'

  export let data: PageData
</script>

<EditCheck profileUsername={data.username}>
  <Profile
    username={data.username}
    photoUrl={data.photoUrl}
    bio={data.bio}
    links={data.links}
  />
  <Button>Add a link</Button>
</EditCheck>
