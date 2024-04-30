<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Photo from '$lib/components/Photo.svelte'
  import SortableList from '$lib/components/SortableList.svelte'
  import UserLink from '$lib/components/UserLink.svelte'

  export let username: string
  export let photoUrl = '/user.png'
  export let bio = ''
  export let links: any[]
  export let edit = false

  const dispatch = createEventDispatcher()

  function onTrash (event: any): void {
    dispatch('trashLink', {
      id: event.detail.id,
      type: event.detail.type,
      url: event.detail.url,
      name: event.detail.name
    })
  }

  function sortList (event: any): void {
    dispatch('sort', event.detail)
  }
</script>

<p class="text-lime-600 text-center"><i class="fa-regular fa-seedling fa-2xl"></i></p>
<h1 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">@{username}</h1>
<Photo photoUrl="{photoUrl ?? '/user.png'}"/>
{#if bio}
  <p>{bio}</p>
{/if}
{#if edit}
  <SortableList list={links} on:sort={sortList} let:item let:index>
    <UserLink {...item} edit={true} />
  </SortableList>
{:else}
  <ul class="w-full max-w-96 space-y-4">
    {#each links as link}
      <li class="w-full flex">
        <UserLink id={link.id} type={link.type} url={link.url} name={link.name} edit={false} on:trash={onTrash}/>
      </li>
    {/each}
  </ul>
{/if}
