<script lang="ts">
  import { user } from '$lib/firebase'
</script>

{#if $user}
  <slot/>
{:else}
  <p class="text-center">You must be signed in to view this page.</p>
{/if}
