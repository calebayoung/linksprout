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
  export let currentUserViewing = false

  const dispatch = createEventDispatcher()

  function sortList (event: any): void {
    dispatch('sort', event.detail)
  }

  function showAddLinkForm (): void {
    dispatch('showAddLinkForm')
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
{#if currentUserViewing && links.length < 1}
  <div class="flex flex-col items-center space-y-4 py-6">
    <i class="fa-regular fa-list text-gray-500 mr-2"/>
    <p class="text-xs text-gray-600">No links yet - add new links to start building your profile!</p>
  </div>
{/if}
{#if edit}
  <div class="w-full max-w-96">
    <SortableList list={links} on:sort={sortList} let:item let:index>
      <UserLink {...item} edit={true} />
    </SortableList>
    <div class="w-full max-w-96 p-2">
      <button type="button" on:click={showAddLinkForm} class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 py-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2">
        <i class="fa-regular fa-link fa-lg text-gray-500"></i>
        <span class="block text-sm font-semibold text-gray-500">Add a new link</span>
      </button>
    </div>
  </div>
{:else if links.length > 0}
  <ul class="w-full max-w-96">
    {#each links as link}
      <li class="w-full flex border-2 border-white p-2">
        <UserLink type={link.type} url={link.url} name={link.name} edit={false}/>
      </li>
    {/each}
  </ul>
{/if}
