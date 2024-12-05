import { createRoot } from 'react-dom/client';
import { createFromFetch } from 'react-server-dom-webpack/client';

// Map webpack resolution to native ESM. it fixes Uncaught ReferenceError: __webpack_require__ is not defined
window.__webpack_require__ = async (id) => {
  return import(id);
};

const root = createRoot(document.getElementById('root'));

/**
 * Fetch your server component stream from `/rsc`
 * and render results into the root element as they come in.
 */
createFromFetch(fetch('/rsc')).then(comp => {
  root.render(comp);
})
