<script lang="ts">
  import type { PageData } from './$types'
  import Photo from '$lib/components/Photo.svelte'

  export let data: PageData
</script>

<svelte:head>
  <title>@{data.username} Links</title>
  <meta name="description" content={data.bio} />
</svelte:head>

<main class="max-w-96 mx-auto mt-6 flex flex-col items-center space-y-8 p-10 bg-white shadow sm:rounded-lg">
  <p class="text-lime-600 text-center"><i class="fa-regular fa-seedling fa-2xl"></i></p>
  <h1 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">@{data.username}</h1>
  <Photo photoUrl="{data.photoUrl ?? '/user.png'}"/>
  {#if data.bio}
    <p>{data.bio}</p>
  {/if}
</main>
