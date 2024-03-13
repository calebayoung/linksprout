<script lang="ts">
export let text = 'Loading...'
</script>

<div class="flex items-center space-x-2">
  <i class="fa-regular fa-loader"/>
  <p class="mb-0">{text}</p>
</div>

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
