# Delivery Water Heater, Inc.

San Francisco plumbing and water-heater service website.

## Run locally

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

## Build and deploy

```sh
npm run build
```

The production site is written to `dist/`. Upload that directory to any static web host. No API keys, server process, or host-specific environment variables are required. The build uses relative asset URLs, so it can also be published from a subdirectory.

To check the production build locally, run `npm run preview`.
