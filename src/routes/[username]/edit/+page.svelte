<script lang="ts">
  import { writable } from 'svelte/store'
  import { invalidate } from '$app/navigation'
  import {
    arrayUnion,
    doc,
    setDoc,
    updateDoc
  } from 'firebase/firestore'
  import type { PageData } from './$types'
  import { db, user } from '$lib/firebase'
  import EditCheck from '$lib/components/EditCheck.svelte'
  import Profile from '$lib/components/Profile.svelte'
  import Button from '$lib/components/Button.svelte'
  import ButtonFormSubmit from '$lib/components/ButtonFormSubmit.svelte'

  export let data: PageData

  let addLinkFormDisplayed = false
  let addLinkFormLoading = false

  const namePlaceholders: Record<string, string> = {
    standard: 'My Website',
    twitter: 'Twitter',
    youtube: 'YouTube',
    tiktok: 'TikTok',
    linkedin: 'LinkedIn',
    github: 'GitHub'
  }

  const urlPlaceholders: Record<string, string> = {
    standard: 'https://mywebsite.io',
    twitter: 'https://twitter.com/handle',
    youtube: 'https://www.youtube.com/@channel',
    tiktok: 'https://www.tiktok.com/@handle',
    linkedin: 'https://linkedin.com/in/profile',
    github: 'https://github.com/handle'
  }

  const formDefaults = {
    type: 'standard',
    name: '',
    url: ''
  }
  const formData = writable(formDefaults)

  function showAddLinkForm (): void {
    addLinkFormDisplayed = true
  }

  function cancelAddLinkForm (): void {
    addLinkFormDisplayed = false
    formData.set(formDefaults)
  }

  async function addLink (): Promise<void> {
    if ($user === null) {
      return
    }
    addLinkFormLoading = true
    const userRef = doc(db, 'users', $user.uid)
    await updateDoc(userRef, {
      links: arrayUnion({
        ...$formData,
        id: Date.now().toString()
      })
    })
    await invalidate('profile:links')
    formData.set({
      type: 'standard',
      name: '',
      url: ''
    })
    addLinkFormDisplayed = false
    addLinkFormLoading = false
  }

  async function sort (event: any): Promise<void> {
    if ($user === null) {
      return
    }
    data.links = event.detail
    const userRef = doc(db, 'users', $user.uid)
    await setDoc(userRef, { links: data.links }, { merge: true })
  }
</script>

<EditCheck profileUsername={data.username}>
  <Profile
    username={data.username}
    photoUrl={data.photoUrl}
    bio={data.bio}
    links={data.links}
    edit={true}
    on:sort={sort}
  />
  <div class="w-full max-w-96">
    <hr class="w-full border-t border-gray-900/10 m-0"/>
  </div>
  {#if addLinkFormDisplayed}
    <form on:submit|preventDefault={addLink} class="w-full max-w-96 space-y-4">
      <div>
        <label for="type" class="block text-sm font-medium leading-6 text-gray-900">Link type & icon</label>
        <div class="mt-2">
          <select bind:value={$formData.type} id="type" name="type" autocomplete="off" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6">
            <option value="standard">Standard</option>
            <option value="twitter">Twitter</option>
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
            <option value="linkedin">LinkedIn</option>
            <option value="github">GitHub</option>
          </select>
        </div>
      </div>
      <div>
        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
        <div class="mt-2">
          <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-600 sm:max-w-md">
            <input bind:value={$formData.name} type="text" name="name" id="name" autocomplete="off" class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder={namePlaceholders[$formData.type]}>
          </div>
        </div>
      </div>
      <div>
        <label for="url" class="block text-sm font-medium leading-6 text-gray-900">URL</label>
        <div class="mt-2">
          <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-600 sm:max-w-md">
            <input bind:value={$formData.url} type="text" name="url" id="url" autocomplete="url" class="block flex-1 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder={urlPlaceholders[$formData.type]}>
          </div>
        </div>
      </div>
      <div class="flex justify-end items-center gap-x-6 pt-2">
        <button on:click={cancelAddLinkForm} type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
        <ButtonFormSubmit loading={addLinkFormLoading}>Save</ButtonFormSubmit>
      </div>
    </form>
  {:else}
    <Button onClick={showAddLinkForm}><i class="fa-regular fa-link mr-3"></i><span>Add a link</span></Button>
    <Button><a href="/{data.username}" class="w-full flex justify-center items-center gap-3"><i class="fa-regular fa-floppy-disk"></i><span>Save changes</span></a></Button>
  {/if}
</EditCheck>
