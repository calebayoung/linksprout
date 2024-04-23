<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let id = ''
  export let type = 'standard'
  export let url = 'foo'
  export let name = 'Link'
  export let edit = false
  export let loading = false

  const dispatch = createEventDispatcher()
  function onTrash (): void {
    loading = true
    dispatch('trash', {
      id,
      type,
      url,
      name
    })
  }

  const typeIconMap: Record<string, string> = {
    standard: 'fa-regular fa-link',
    twitter: 'fa-brands fa-x-twitter',
    youtube: 'fa-brands fa-youtube',
    tiktok: 'fa-brands fa-tiktok',
    linkedin: 'fa-brands fa-linkedin',
    github: 'fa-brands fa-github'
  }
</script>

<a href={url} class="group/link w-full ring-1 ring-gray-300 shadow-sm hover:bg-gray-50 rounded p-4 flex items-center">
  <i class="{typeIconMap[type] ?? 'fa-regular fa-link'} text-gray-600"/>
  <span class="w-full flex justify-center pr-8 ml-10">{name}</span>
  {#if loading}
    <div class="flex justify-center items-center rounded bg-red-500">
      <i class="fa-regular fa-loader text-white p-2"/>
    </div>
  {:else if edit}
    <button on:click|preventDefault={onTrash} class="group/trash flex justify-center items-center rounded invisible group-hover/link:visible hover:bg-red-500 m-0">
      <i class="fa-regular fa-trash-can text-red-400 group-hover/trash:text-white p-2"/>
    </button>
  {:else}
    <div class="p-4"/>
  {/if}
</a>

<style>
.fa-loader {
  animation-name: spin;
  animation-duration: 1500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
}
</style>
