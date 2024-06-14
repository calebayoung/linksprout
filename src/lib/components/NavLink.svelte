<script lang="ts">
  export let href: string
</script>

<a href={href} class="flex items-center space-x-2 hover:text-lime-700">
  <p><slot/></p>
  <i class="fa-regular fa-arrow-right"/>
</a>
