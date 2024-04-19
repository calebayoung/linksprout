<script lang="ts">
  export let onClick = (): void => {}
</script>

<button type="submit" on:click={onClick} class="flex items-center justify-center gap-3 rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 cursor-pointer">
  <span class="w-full text-sm font-semibold leading-6"><slot/></span>
</button>
