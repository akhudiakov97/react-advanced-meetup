## Getting started

First, install dependencies with "peer dependency" errors disabled:

```bash
npm i --legacy-peer-deps
```

_This is due to experimental version conflicts. React Server Components are still quite new!_

Then, start the Node development server:

```bash
npm run dev
```

This should trigger a build and start your server at http://localhost:3000.

```sh
  page.jsx # server entrypoint.
  _client.jsx # client script that requests and renders your `page.jsx`.
```
