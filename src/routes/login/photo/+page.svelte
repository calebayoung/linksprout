<script lang="ts">
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { db, storage, user, userData } from '$lib/firebase'
import AuthCheck from '$lib/components/AuthCheck.svelte'
import LoginCardHead from '$lib/components/LoginCardHead.svelte'

let uploadNewPhoto: boolean = false
let file: Blob
let previewUrl: string
let uploading: boolean = false
let uploaded: boolean = false

function chooseToUploadNewPhoto (): void {
  uploadNewPhoto = true
}

function upload (event: any): void {
  file = event.target.files[0]
  previewUrl = URL.createObjectURL(file)
}

async function saveProfilePhoto (): Promise<void> {
  if ($user == null) {
    throw new Error('Trying to save profile photo without user data.')
  }
  uploading = true
  // Get a reference to where we will store the file
  const storageRef = ref(storage, `users/${$user.uid}/profile.png`)
  // Upload the file to the storage reference
  const result = await uploadBytes(storageRef, file)
  // Get the URL of the saved file so we can save it to the user's document
  const url = await getDownloadURL(result.ref)
  // Update the user's document with the URL of the saved file
  await updateDoc(doc(db, 'users', $user.uid), { photoUrl: url })
  uploading = false
  uploaded = true
}
</script>

<AuthCheck>
  <LoginCardHead icon="fa-image" title="Upload a profile photo"/>
  <form class="max-w-96 mx-auto mt-6 flex flex-col items-center space-y-8" autocomplete="off">
    {#if previewUrl != null || $userData?.photoUrl != null}
      <picture class="flex max-h-32 max-w-32">
        <img
          src={previewUrl ?? $userData?.photoUrl}
          alt="photoUrl"
          class="h-100 w-100 object-center object-cover rounded"
        />
      </picture>
    {:else}
      <div class="flex justify-center">
        <span class="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">
          <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      </div>
    {/if}
    {#if !uploadNewPhoto}
      <button
        type="button"
        on:click={chooseToUploadNewPhoto}
        class="rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
      >
        Upload a new profile photo
      </button>
    {:else if previewUrl == null}
      <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-8 py-10">
        <div class="flex flex-col items-center text-center">
          <div class="flex text-sm leading-6 text-gray-600">
            <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-lime-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-lime-600 focus-within:ring-offset-2 hover:text-lime-500">
              <span>Upload a file</span>
              <input id="file-upload" name="file-upload" type="file" class="sr-only" on:change={upload} accept="image/png, image/jpeg, image/gif, image/webp">
            </label>
          </div>
          <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF, or WEBP</p>
        </div>
      </div>
    {:else if !uploaded}
      {#if !uploading}
        <button
          type="button"
          on:click={saveProfilePhoto}
          class="rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
        >
          Save this profile photo
        </button>
      {:else}
        <div class="flex items-center space-x-2">
          <i class="fa-regular fa-loader"/>
          <p class="mb-0">Uploading...</p>
        </div>
      {/if}
    {/if}
    {#if !uploading}
      <a href="/" class="flex items-center space-x-2 hover:text-lime-700">
        <p>Continue</p>
        <i class="fa-regular fa-arrow-right"/>
      </a>
    {/if}
  </form>
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
