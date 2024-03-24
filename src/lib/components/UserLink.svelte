<script lang="ts">
  export let icon = 'fa-link'
  export let url = 'foo'
  export let title = 'Link'
</script>

<a href={url} class="w-full ring-1 ring-gray-300 shadow-sm hover:bg-gray-50 rounded p-4 flex items-center space-x-4">
  <i class="fa-regular {icon}"/>
  <span class="w-full flex justify-center pr-8">{title}</span>
</a>
