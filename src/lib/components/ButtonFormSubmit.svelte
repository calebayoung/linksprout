<script lang="ts">
  export let onClick = (): void => {}
  export let loading = false
</script>

<button type="submit" on:click={onClick} class="flex items-center justify-center gap-3 rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 cursor-pointer static">
  {#if loading}
    <i class="fa-regular fa-loader absolute"/>
    <span class="invisible w-full text-sm font-semibold leading-6"><slot/></span>
  {:else}
    <span class="w-full text-sm font-semibold leading-6"><slot/></span>
  {/if}
</button>

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
