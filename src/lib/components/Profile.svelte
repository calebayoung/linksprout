<script lang="ts">
  import Photo from '$lib/components/Photo.svelte'
  import UserLink from '$lib/components/UserLink.svelte'

  export let username: string
  export let photoUrl = '/user.png'
  export let bio = ''
  export let links: any[]
</script>

<p class="text-lime-600 text-center"><i class="fa-regular fa-seedling fa-2xl"></i></p>
<h1 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">@{username}</h1>
<Photo photoUrl="{photoUrl ?? '/user.png'}"/>
{#if bio}
  <p>{bio}</p>
{/if}
<ul class="w-full max-w-96">
  {#each links as link}
    <li class="w-full flex">
      <UserLink/>
    </li>
  {/each}
</ul>
