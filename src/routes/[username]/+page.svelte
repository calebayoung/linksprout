<script lang="ts">
  import type { PageData } from './$types'
  import { userData } from '$lib/firebase'
  import Profile from '$lib/components/Profile.svelte'
  import Button from '$lib/components/Button.svelte'

  export let data: PageData
</script>

<svelte:head>
  <title>@{data.username} Links</title>
  <meta name="description" content={data.bio} />
</svelte:head>

<Profile
  username={data.username}
  photoUrl={data.photoUrl}
  bio={data.bio}
  links={data.links}
/>
{#if $userData?.username === data.username}
  <hr class="w-full border-t border-gray-900/10 m-0"/>
  <Button><a href="{data.username}/edit" class="w-full flex justify-center items-center gap-3"><i class="fa-regular fa-pen-to-square"></i><span>Edit links</span></a></Button>
  <Button><a href="{data.username}/bio" class="w-full flex justify-center items-center gap-3"><i class="fa-regular fa-book-user"></i><span>Edit bio</span></a></Button>
{/if}
