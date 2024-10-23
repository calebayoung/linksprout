<script lang="ts">
  import ProfileDropdown from '$lib/components/ProfileDropdown.svelte'
</script>

<div class="py-6">
  <main class="max-w-3xl mx-auto flex flex-col items-center space-y-8 p-10 bg-white drop-shadow sm:rounded-lg">
    <slot/>
  </main>
</div>
<ProfileDropdown/>
