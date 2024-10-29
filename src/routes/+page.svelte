<script lang="ts">
  import { user, userData } from '$lib/firebase'

  console.log($user)
</script>

<div class="bg-white">
  <header class="absolute inset-x-0 top-0 z-50 mx-auto max-w-7xl">
    <nav class="flex items-center justify-between p-6" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="/" class="-m-1.5 p-1.5">
          <span class="sr-only">LinkSprout</span>
          <p class="text-lime-600 text-center"><i class="fa-regular fa-seedling fa-2xl"></i></p>
        </a>
      </div>
      <div class="hidden lg:flex lg:gap-x-12"></div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        {#if $user != null && $userData}
          <a href="/{$userData.username}" class="text-sm font-semibold leading-6 text-gray-900">Your profile<span aria-hidden="true"><i class="fa-regular fa-arrow-right ml-2"></i></span></a>
        {:else}
          <a href="/login" class="text-sm font-semibold leading-6 text-gray-900">Log in<span aria-hidden="true"><i class="fa-regular fa-arrow-right ml-2"></i></span></a>
        {/if}
      </div>
    </nav>
  </header>
  <div class="relative isolate pt-18">
    <svg class="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
      <defs>
        <pattern id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
          <path d="M100 200V.5M.5 .5H200" fill="none" />
        </pattern>
      </defs>
      <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
        <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" stroke-width="0" />
      </svg>
      <rect width="100%" height="100%" stroke-width="0" fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
    </svg>
    <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
      <div class="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
        <h1 class="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">LinkSprout</h1>
        <p class="mt-6 text-lg leading-8 text-gray-600"> A <a href="https://linktr.ee/" class="underline text-lime-600" target="_blank">Linktree</a> clone with client + server authentication, front-end stores, file uploads, server-side rendering, and more ✨<br/><br/>Based on <a href="https://fireship.io/courses/sveltekit/" class="underline text-lime-600" target="_blank">Fireship's SvelteKit Full Course.</a> Built with <a href="https://svelte.dev/" class="underline text-lime-600" target="_blank">SvelteKit</a>, <a href="https://www.typescriptlang.org/" class="underline text-lime-600" target="_blank">TypeScript</a>, <a href="https://firebase.google.com/" class="underline text-lime-600" target="_blank">Firebase</a>, <a href="https://tailwindcss.com/" class="underline text-lime-600" target="_blank">Tailwind CSS</a>, <a href="https://tailwindui.com/" class="underline text-lime-600" target="_blank">Tailwind UI</a>, and <a href="https://fontawesome.com/" class="underline text-lime-600" target="_blank">FontAwesome</a>.</p>
        <div class="mt-10 flex items-center gap-x-6">
          <a href="/login" class="rounded-md bg-lime-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">Get started</a>
          <a href="/ethan-reynolds" class="text-sm font-semibold leading-6 text-gray-900">Demo page<span aria-hidden="true"><i class="fa-regular fa-arrow-right ml-2"></i></span></a>
        </div>
      </div>
      <div class="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
        <svg viewBox="0 0 366 729" role="img" class="mx-auto w-[22.875rem] max-w-full drop-shadow-xl">
          <title>App screenshot</title>
          <defs>
            <clipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
              <rect width="316" height="684" rx="36" />
            </clipPath>
          </defs>
          <path fill="#4B5563" d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z" />
          <path fill="#343E4E" d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z" />
          <foreignObject class="bg-gray-50" width="316" height="684" transform="translate(24 24)" clip-path="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)">
            <img src="project-screenshot-iphone.jpeg" alt="" />
          </foreignObject>
        </svg>
      </div>
    </div>
  </div>
</div>
<div class="bg-white pb-24 sm:pb-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:text-center">
      <h2 class="text-base font-semibold leading-7 text-lime-600">#sideproject</h2>
      <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">🚀 Building something cool & having fun 😎</p>
      <p class="mt-6 text-lg leading-8 text-gray-600">Shoutout to <a href="https://www.youtube.com/c/fireship" target="_blank" class="text-lime-600 underline">Fireship</a> for providing this course 👏 It's a healthy size (small enough to be finished) and covers interesting features.</p>
    </div>
    <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
      <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        <div class="relative pl-16">
          <dt class="text-base font-semibold leading-7 text-gray-900">
            <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-lime-600">
              <i class="fa-regular fa-fire fa-lg text-white">
            </div>
            Firebase back-end
          </dt>
          <dd class="mt-2 text-base leading-7 text-gray-600">Firestore Database (including rules 📏), user authentication through Google, and file storage for user profile images.</dd>
        </div>
        <div class="relative pl-16">
          <dt class="text-base font-semibold leading-7 text-gray-900">
            <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-lime-600">
              <i class="fa-regular fa-toggle-large-on fa-lg text-white">
            </div>
            Custom UI & UX
          </dt>
          <dd class="mt-2 text-base leading-7 text-gray-600">Animated routes, drag & drop, reusable components, loading states, and more. No project is too small to not try for pixel-perfect 🕺</dd>
        </div>
        <div class="relative pl-16">
          <dt class="text-base font-semibold leading-7 text-gray-900">
            <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-lime-600">
              <i class="fa-regular fa-handshake-simple fa-lg text-white">
            </div>
            Tailwind CSS & Tailwind UI
          </dt>
          <dd class="mt-2 text-base leading-7 text-gray-600">I'm not a designer, but I really like working with good designs 🎨 Tailwind CSS & Tailwind UI are my go-tos for side projects.</dd>
        </div>
        <div class="relative pl-16">
          <dt class="text-base font-semibold leading-7 text-gray-900">
            <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-lime-600">
              <i class="fa-regular fa-link fa-lg text-white">
            </div>
            Svelte & SvelteKit
          </dt>
          <dd class="mt-2 text-base leading-7 text-gray-600">I'm a Vue.js developer by day and a Svelte enthusiast by night 🦸‍♂️ Big fan of stores and hooks.</dd>
        </div>
      </dl>
    </div>
  </div>
</div>
<footer class="bg-white">
  <div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
    <div class="flex justify-center space-x-6 md:order-2">
      <a href="https://www.linkedin.com/in/caleb-young-32b9ba169" class="text-gray-400 hover:text-gray-500">
        <span class="sr-only">LinkedIn</span>
        <i class="fa-brands fa-linkedin fa-lg"/>
      </a>
      <a href="https://github.com/calebayoung" class="text-gray-400 hover:text-gray-500">
        <span class="sr-only">GitHub</span>
        <i class="fa-brands fa-github fa-lg"/>
      </a>
    </div>
    <div class="mt-8 md:order-1 md:mt-0">
      <p class="text-center text-xs leading-5 text-gray-500">Built for fun by Caleb Young.</p>
    </div>
  </div>
</footer>
