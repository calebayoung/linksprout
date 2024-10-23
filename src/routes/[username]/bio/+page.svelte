<script lang="ts">
  import { enhance } from '$app/forms'
  import { page } from '$app/stores'
  import type { PageData } from './$types'
  import { userData } from '$lib/firebase'
  import ButtonFormSubmit from '$lib/components/ButtonFormSubmit.svelte'

  export let data: PageData

  let newBio: string = data.bio

  let formLoading = false
  let saveSuccess = false
</script>

<p class="text-lime-600 text-center"><i class="fa-regular fa-seedling fa-2xl"></i></p>
<h1 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Edit Bio</h1>
<p>Your current bio: {data.bio}</p>
{#if $page.form?.problem}
<div class="w-full max-w-96 rounded-md bg-red-50 p-4">
  <div class="flex">
    <div class="flex-shrink-0">
      <i class="fa-solid fa-circle-xmark text-red-400"/>
    </div>
    <div class="ml-3">
      <h3 class="text-sm font-medium text-red-800">There was an error with your bio.</h3>
      <div class="mt-2 text-sm text-red-700">
        <p>{$page.form?.problem}</p>
      </div>
    </div>
  </div>
</div>
{/if}
{#if saveSuccess}
<div class="w-full max-w-96 rounded-md bg-lime-50 p-4">
  <div class="flex items-center">
    <div class="flex-shrink-0">
      <i class="fa-solid fa-circle-check text-lime-400"/>
    </div>
    <div class="ml-3">
      <h3 class="text-sm font-medium text-lime-800">Bio updated</h3>
    </div>
  </div>
</div>
{/if}
<div class="w-full max-w-96">
  <hr class="w-full border-t border-gray-900/10 m-0"/>
</div>
<form
  method="POST"
  class="w-full max-w-96 space-y-4"
  use:enhance={({ formElement, formData, action, cancel, submitter }) => {
    formLoading = true
    saveSuccess = false
    return ({ result, update }) => {
      void update()
      if (result?.status !== 400) {
        saveSuccess = true
      }
      formLoading = false
    }
  }}
>
  <div>
    <label for="bio" class="block text-sm font-medium leading-6 text-gray-900">Bio</label>
    <div class="mt-2">
      <textarea rows="4" name="bio" id="bio" bind:value={newBio} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"></textarea>
    </div>
  </div>
  <div>
    <ButtonFormSubmit loading={formLoading}>Save</ButtonFormSubmit>
  </div>
</form>
<div class="w-full max-w-96">
  <a href="/{$userData?.username}" class="flex items-center space-x-2 hover:text-lime-700">
    <i class="fa-regular fa-arrow-left"/>
    <p>Back to profile</p>
  </a>
</div>
