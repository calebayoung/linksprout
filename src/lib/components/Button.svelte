<script lang="ts">
  export let onClick = (): void => {}
</script>

<button on:click={onClick} class="flex w-full max-w-64 mt-10 mb-2 items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent cursor-pointer">
  <span class="w-full text-sm font-semibold leading-6"><slot/></span>
</button>
