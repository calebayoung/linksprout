<script lang="ts">
export let photoUrl: string
</script>

<div class="bg-gray-200 rounded">
  <picture class="flex h-32 w-32">
    <img
      src={photoUrl}
      alt="photoUrl"
      class="h-100 w-100 object-center object-cover rounded"
    />
  </picture>
</div>
