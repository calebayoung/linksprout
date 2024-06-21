<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { signOut } from 'firebase/auth'
  import { auth, userData } from '$lib/firebase'

  let profileDropdownActive = false
  let profileDropdownEntering = false
  let profileDropdownExiting = false
  let profileDropdownInDom = false

  function toggleProfileDropdown (): void {
    if (profileDropdownActive) {
      hideProfileDropdown()
    } else {
      showProfileDropdown()
    }
  }

  function showProfileDropdown (): void {
    profileDropdownInDom = true
    profileDropdownEntering = true
    profileDropdownActive = true
    setTimeout(() => {
      profileDropdownEntering = false
    }, 100)
  }

  function hideProfileDropdown (): void {
    profileDropdownExiting = true
    setTimeout(() => {
      profileDropdownExiting = false
      profileDropdownActive = false
      setTimeout(() => {
        profileDropdownInDom = false
      }, 100)
    }, 100)
  }

  function onBlur (): void {
    hideProfileDropdown()
  }

  async function logOut (): Promise<void> {
    await fetch('/api/signin', { method: 'DELETE' })
    await signOut(auth)
    void goto('/login')
  }
</script>

{#if $userData?.username}
  <div class="absolute top-6 right-10">
    <div>
      <button type="button" on:click={toggleProfileDropdown} on:blur={onBlur} class="relative flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
        <span class="absolute -inset-1.5"></span>
        <span class="sr-only">Open user menu</span>
        <div class="h-8 w-8 flex justify-center items-center">
          <i class="fa-regular fa-xl fa-circle-user text-gray-600"></i>
        </div>
      </button>
    </div>
    {#if profileDropdownInDom}
      <div
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition transform"
        class:ease-out={profileDropdownEntering}
        class:duration-100={profileDropdownEntering}
        class:opacity-0={profileDropdownEntering || !profileDropdownActive}
        class:scale-95={profileDropdownEntering || !profileDropdownActive}
        class:opacity-100={profileDropdownActive && (!profileDropdownEntering || profileDropdownExiting)}
        class:scale-100={profileDropdownActive && (!profileDropdownEntering || profileDropdownExiting)}
        class:ease-in={profileDropdownExiting}
        class:duration-75={profileDropdownExiting}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
      >
        <a href="/{$userData?.username}" class="block px-4 py-2 text-sm text-gray-700" class:bg-gray-100={$page.url.pathname === `/${$userData?.username}`} role="menuitem" tabindex="-1" id="user-menu-item-0">My profile</a>
        <a href="/login" class="block px-4 py-2 text-sm text-gray-700" class:bg-gray-100={$page.url.pathname.includes('login')} role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
        <button on:click={logOut} class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Log out</button>
      </div>
    {/if}
  </div>
{/if}
