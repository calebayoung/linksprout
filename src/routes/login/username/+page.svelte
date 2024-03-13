<script lang="ts">
import { doc, getDoc, writeBatch } from 'firebase/firestore'
import { db, user, userData } from '$lib/firebase'
import AuthCheck from '$lib/components/AuthCheck.svelte'
import LoginCardHead from '$lib/components/LoginCardHead.svelte'
import LoadingSpinner from '$lib/components/LoadingSpinner.svelte'

let username = ''
let loading = false
let availabilityChecked = false
let isAvailable = false
let debounceTimer: NodeJS.Timeout

async function queryUsernameExists (): Promise<void> {
  if (username.length < 1) {
    loading = false
    return
  }
  const ref = doc(db, 'usernames', username)
  const exists = await getDoc(ref).then(doc => doc.exists())
  availabilityChecked = true
  isAvailable = !exists
  loading = false
}

async function checkAvailability (): Promise<void> {
  availabilityChecked = false
  isAvailable = false
  loading = true
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => { void queryUsernameExists() }, 500)
}

async function confirmUsername (): Promise<void> {
  if (username === null || $user === null) {
    return
  }
  const batch = writeBatch(db)
  batch.set(doc(db, 'usernames', username), { uid: $user.uid })
  batch.set(doc(db, 'users', $user.uid), {
    username,
    photoUrl: $user?.photoURL ?? null,
    published: true,
    bio: '',
    links: []
  })
  await batch.commit()
}
</script>

<AuthCheck>
  <LoginCardHead icon="fa-user" title="Choose your username"/>
  {#if $userData !== null}
    {#if $userData?.username}
      <div class="flex flex-col justify-center items-center mt-8 space-y-6">
        <p class="text-center">Your username is <strong>@{ $userData.username }</strong></p>
        <p class="text-center">(Usernames cannot be changed.)</p>
        <a href="/login/photo">
          <button
            type="button"
            class="rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
          >
            Upload profile photo
          </button>
        </a>
      </div>
    {:else}
      <form on:submit|preventDefault={confirmUsername} class="max-w-96 mx-auto mt-6" autocomplete="off">
        <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="username"
            id="username"
            bind:value={username}
            on:input={checkAvailability}
            class="block w-full rounded-md border-0 py-1.5 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-lime-600"
            class:text-red-900={availabilityChecked && !isAvailable && username.length > 0}
            class:ring-red-300={availabilityChecked && !isAvailable && username.length > 0}
            class:placeholder:text-red-300={availabilityChecked && !isAvailable && username.length > 0}
            class:focus:ring-red-600={availabilityChecked && !isAvailable && username.length > 0}
            placeholder="link-sprout"
            aria-invalid="true"
            aria-describedby="email-error"
          >
          {#if availabilityChecked && !isAvailable && username.length > 0}
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <i class="fa-regular fa-circle-exclamation text-red-500"></i>
            </div>
          {/if}
          {#if loading}
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <i class="fa-regular fa-loader"></i>
            </div>
          {/if}
          {#if availabilityChecked && isAvailable}
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <i class="fa-regular fa-circle-check text-lime-600"></i>
            </div>
          {/if}
        </div>
        {#if availabilityChecked && !isAvailable && username.length > 0}
          <p class="mt-2 text-sm text-red-600" id="email-error">This username is not available.</p>
        {/if}
        <button
          type="submit"
          class="rounded-md bg-lime-600 disabled:bg-gray-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 disabled:hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 disabled:focus-visible:outline-gray-300 mt-4"
          disabled={!isAvailable}
        >
          Confirm username{username.length > 0 ? ' @' + username : ''}
        </button>
      </form>
    {/if}
  {:else}
    <div class="flex justify-center mt-6">
      <LoadingSpinner/>
    </div>
  {/if}
</AuthCheck>

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
