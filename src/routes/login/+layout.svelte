<script lang="ts">
import { page } from '$app/stores'
import AnimatedRoute from '$lib/components/AnimatedRoute.svelte'
import HomeLink from '$lib/components/HomeLink.svelte'
import ProfileDropdown from '$lib/components/ProfileDropdown.svelte'
</script>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-3xl">
    <nav aria-label="Progress">
      <ol role="list" class="space-y-4 md:flex md:space-x-8 md:space-y-0 my-8">
        <li class="md:flex-1">
          <a
            href="/login"
            class="group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 border-lime-600 hover:border-lime-800"
          >
            <span class="text-sm font-medium text-lime-600 group-hover:text-lime-800">
              Step 1
            </span>
            <span class="text-sm font-medium">Log in</span>
          </a>
        </li>
        <li class="md:flex-1">
          <a
            href="/login/username"
            class="group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
            class:border-gray-200={$page.route.id?.match(/username|photo/g) == null}
            class:hover:border-gray-300={$page.route.id?.match(/username|photo/g) == null}
            class:border-lime-600={$page.route.id?.match(/username|photo/g)}
          >
            <span
              class="text-sm font-medium text-lime-600"
              class:text-gray-500={$page.route.id?.match(/username|photo/g) == null}
              class:group-hover:text-gray-700={$page.route.id?.match(/username|photo/g) == null}
              class:text-lime-600={$page.route.id?.match(/username|photo/g)}
              class:group-hover:text-lime-800={$page.route.id?.match(/username|photo/g)}
            >
              Step 2
            </span>
            <span class="text-sm font-medium">Choose username</span>
          </a>
        </li>
        <li class="md:flex-1">
          <a
            href="/login/photo"
            class="group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
            class:border-gray-200={$page.route.id?.match(/photo/g) == null}
            class:hover:border-gray-300={$page.route.id?.match(/photo/g) == null}
            class:border-lime-600={$page.route.id?.match(/photo/g)}
          >
            <span
              class="text-sm font-medium text-gray-500 group-hover:text-gray-700"
              class:text-gray-500={$page.route.id?.match(/photo/g) == null}
              class:group-hover:text-gray-700={$page.route.id?.match(/photo/g) == null}
              class:text-lime-600={$page.route.id?.match(/photo/g)}
              class:group-hover:text-lime-800={$page.route.id?.match(/photo/g)}
            >
              Step 3
            </span>
            <span class="text-sm font-medium">Upload photo</span>
          </a>
        </li>
      </ol>
    </nav>
    <AnimatedRoute>
      <div class="bg-white shadow rounded-lg">
        <div class="px-16 py-10">
          <slot />
        </div>
      </div>
    </AnimatedRoute>
  </div>
</div>
<HomeLink/>
<ProfileDropdown/>
