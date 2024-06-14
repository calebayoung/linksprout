<script lang="ts">
  import ProfileDropdown from '$lib/components/ProfileDropdown.svelte'
</script>

<main class="max-w-3xl mx-auto my-6 flex flex-col items-center space-y-8 p-10 bg-white drop-shadow sm:rounded-lg">
  <slot/>
</main>
<ProfileDropdown/>
