# aesthetic-ify-v2

## Getting Started

First, install all dependencies:

```bash
bun install
```

Second, run the development server:

```bash
bun run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000) with your browser to see the result.

## Environment Variables

```env
AUTH_SPOTIFY_ID=
AUTH_SPOTIFY_SECRET=
AUTH_REDIRECT_URI=http://127.0.0.1:3000/api/auth/callback/spotify

AUTH_SECRET= # Added by `npx auth`. Read more: https://cli.authjs.dev

AUTH_URL=http://127.0.0.1:3000/
AUTH_REDIRECT_PROXY_URL=http://127.0.0.1:3000/api/auth

NODE_ENV=development
```

You are required to set your own `env` vars.

## Mood-ify

In order to get the most out of aesthetic-ify-v2, you should look into the backend sister project: [mood-ify](https://www.github.com/khandrew1/mood-ify)
