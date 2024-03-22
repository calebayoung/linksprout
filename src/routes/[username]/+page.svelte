<script lang="ts">
  import type { PageData } from './$types'
  import Photo from '$lib/components/Photo.svelte'
  import UserLink from '$lib/components/UserLink.svelte'

  export let data: PageData
</script>

<svelte:head>
  <title>@{data.username} Links</title>
  <meta name="description" content={data.bio} />
</svelte:head>

<p class="text-lime-600 text-center"><i class="fa-regular fa-seedling fa-2xl"></i></p>
<h1 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">@{data.username}</h1>
<Photo photoUrl="{data.photoUrl ?? '/user.png'}"/>
{#if data.bio}
  <p>{data.bio}</p>
{/if}
<ul class="w-full max-w-96">
  {#each data.links as link}
    <li class="w-full flex">
      <UserLink/>
    </li>
  {/each}
</ul>
