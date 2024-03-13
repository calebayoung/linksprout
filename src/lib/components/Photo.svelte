<script lang="ts">
export let photoUrl: string
</script>

<picture class="flex max-h-32 max-w-32">
  <img
    src={photoUrl}
    alt="photoUrl"
    class="h-100 w-100 object-center object-cover rounded"
  />
</picture>
