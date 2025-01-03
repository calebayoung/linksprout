<script lang="ts">
  import { goto } from '$app/navigation'
  import { GoogleAuthProvider, signInWithPopup, signOut, signInAnonymously } from 'firebase/auth'
  import { auth, user } from '$lib/firebase'
  import type { PageData } from './$types'
  import { createNewProfile, getProfileByUserId } from '$lib/services/ProfileService'
  import LoginCardHead from '$lib/components/LoginCardHead.svelte'
  import NavLink from '$lib/components/NavLink.svelte'
  import Button from '$lib/components/Button.svelte'

  export let data: PageData

  async function signInWithGoogle (): Promise<void> {
    const provider = new GoogleAuthProvider()
    const credential = await signInWithPopup(auth, provider)
    const idToken = await credential.user.getIdToken()

    await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ idToken })
    })

    try {
      await getProfileByUserId(credential.user.uid)
    } catch (err: any) {
      if (err.status === 404) {
        await createNewProfile(credential.user.uid)
      } else {
        throw err
      }
    }
  }

  async function signInAnonymous (): Promise<void> {
    const credential = await signInAnonymously(auth)
    const idToken = await credential.user.getIdToken()

    await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ idToken })
    })

    try {
      await getProfileByUserId(credential.user.uid)
    } catch (err: any) {
      if (err.status === 404) {
        await createNewProfile(credential.user.uid)
      } else {
        throw err
      }
    }
  }

  async function signOutSSR (): Promise<void> {
    await fetch('/api/signin', { method: 'DELETE' })
    await signOut(auth)
  }

  if (data.action === 'signOut' && $user !== null) {
    void signOutSSR()
    void goto('/login')
  }
</script>

<div class="w-100 flex flex-col items-center">
  <LoginCardHead/>
  {#if $user}
    <p class="mt-8">Welcome, {$user.displayName ?? 'Anonymous'}</p>
    <p class="mt-4">You are logged in</p>
    <button on:click={signOutSSR} class="flex w-full max-w-64 my-6 items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
      <i class="fa-regular fa-right-to-bracket"></i>
      <span class="text-sm font-semibold leading-6">Log out</span>
    </button>
    <NavLink href="/login/username">Choose username</NavLink>
  {:else}
    <div class="w-full flex flex-col items-center space-y-4">
      <button on:click={signInWithGoogle} class="flex w-full max-w-64 mt-10 mb-2 items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
        <svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
          <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
          <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
          <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
        </svg>
        <span class="text-sm font-semibold leading-6">Continue with Google</span>
      </button>
      <Button onClick={signInAnonymous}>
        <div class="flex justify-center items-center">
          <i class="fa-regular fa-users mr-4"/>
          <span>Log in anonymously</span>
        </div>
      </Button>
    </div>
  {/if}
</div>
