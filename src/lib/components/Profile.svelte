<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Photo from '$lib/components/Photo.svelte'
  import SortableList from '$lib/components/SortableList.svelte'
  import UserLink from '$lib/components/UserLink.svelte'

  export let username: string
  export let photoUrl: string
  export let bio = ''
  export let links: any[]
  export let edit = false

  const dispatch = createEventDispatcher()

  function sortList (event: any): void {
    dispatch('sort', event.detail)
  }
</script>

<a href="/">
<span class="sr-only">LinkSprout</span>
  <p class="text-lime-600 text-center"><i class="fa-regular fa-seedling fa-2xl"></i></p>
</a>
<h1 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">@{username}</h1>
<Photo photoUrl="{photoUrl}"/>
{#if bio}
  <p class="text-center max-w-96">{bio}</p>
{/if}
{#if edit}
  <SortableList list={links} on:sort={sortList} let:item let:index>
    <UserLink {...item} edit={true} />
  </SortableList>
{:else}
  <ul class="w-full max-w-96">
    {#each links as link}
      <li class="w-full flex border-2 border-white p-2">
        <UserLink type={link.type} url={link.url} name={link.name} edit={false}/>
      </li>
    {/each}
  </ul>
{/if}
