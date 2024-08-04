# 🌱 LinkSprout

![ESLint Pipeline Status](https://github.com/calebayoung/linksprout/actions/workflows/main.yml/badge.svg)

A basic link-sharing application, modeled after LinkTree.

Built by following the [Fireship SvelteKit Full Course](https://fireship.io/courses/sveltekit/)

## Setup

Ater cloning this repository, you'll need a `.env` file in the root directory with the following Firebase values:

```
FB_PROJECT_ID=""
FB_CLIENT_EMAIL=""
FB_PRIVATE_KEY=""
```

(👆 to find these values: Firebase app settings → Service accounts → Generate new private key)

## Important Commands

Install dependencies:
```bash
npm install
```

Run locally:
```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Build a production version of the app:
```bash
npm run build
```

Preview a production version of the app:
```bash
npm run preview
```

## Relevant Links

[fkit-course Repo](https://github.com/fireship-io/fkit-course/tree/main)

[Live Course Site](https://kung.foo/)

[SvelteKit Full Course](https://fireship.io/courses/sveltekit/)

[Tailwind UI](https://tailwindui.com/)

[Tailwind CSS](https://tailwindcss.com/)

[FontAwesome](https://fontawesome.com/)
