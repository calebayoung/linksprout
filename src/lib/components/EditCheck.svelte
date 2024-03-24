<script lang="ts">
  import { userData } from '$lib/firebase'

  export let profileUsername: string
</script>

{#if $userData?.username === profileUsername}
  <slot/>
{:else}
  <p class="text-center">You cannot edit a profile that is not your own.</p>
{/if}
