import { createSignal } from 'solid-js';
import { hydrate } from 'solid-js/web';
import { useClientRouter } from 'vite-plugin-ssr/client/router';
import Layout from './Layout';

const [route, setRoute] = createSignal(null);
let layoutRendered = false;

useClientRouter({
  render({ Page }) {
    const app = document.getElementById('app');

    setRoute({ Page });

    if (!layoutRendered) {
      hydrate(() => <Layout route={route} />, app);
      layoutRendered = true;
    }
  },
});
