<script lang="ts">
  import { flip } from 'svelte/animate'
  import { createEventDispatcher } from 'svelte'

  interface NodeDataset {
    id: string
    index: string
  }

  export let list: any[]
  let isOver: string | boolean = false

  const dispatch = createEventDispatcher()

  function getDraggedParent (node: any): NodeDataset {
    if (node.dataset.index === undefined) {
      return getDraggedParent(node.parentNode)
    } else {
      return { ...node.dataset }
    }
  }

  function onDragStart (e: DragEvent): void {
    const dragged = getDraggedParent(e.target)
    e.dataTransfer?.setData('source', dragged?.index.toString())
  }

  function onDragOver (e: DragEvent): void {
    const dragged = getDraggedParent(e.target)
    isOver = dragged?.id ?? false
  }

  function onDragLeave (e: DragEvent): void {
    const dragged = getDraggedParent(e.target)
    isOver === dragged.id && (isOver = false)
  }

  function onDrop (e: DragEvent): void {
    isOver = false
    const dragged = getDraggedParent(e.target)
    reorder({
      from: e.dataTransfer?.getData('source'),
      to: dragged.index
    })
  }

  const reorder = ({ from, to }: any): void => {
    const newList = [...list]
    newList[from] = [newList[to], (newList[to] = newList[from])][0]

    dispatch('sort', newList)
  }
</script>

{#if list.length}
  <ul class="w-full max-w-96">
    <!-- Keyed Each Block: Allows Svelte to track a unique ID for each item, -->
    <!-- allowing it to render efficiently as we sort it. -->
    {#each list as item, index (item.id)}
      <li
        class="w-full flex border-2 border-dashed p-2"
        class:border-white={item.id !== isOver}
        class:border-gray-300={item.id === isOver}
        data-index={index}
        data-id={item.id}
        draggable="true"
        on:dragstart={onDragStart}
        on:dragover|preventDefault={onDragOver}
        on:dragleave={onDragLeave}
        on:drop|preventDefault={onDrop}
        animate:flip={{ duration: 300 }}
      >
        <!-- Slot Props -->
        <slot {item} {index}/>
      </li>
    {/each}
  </ul>
{:else}
  <p>No links - add one below.</p>
{/if}
