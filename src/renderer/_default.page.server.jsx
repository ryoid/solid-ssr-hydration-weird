import { renderToString, generateHydrationScript } from 'solid-js/web';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr';
import Layout from './Layout';

export async function render(pageContext) {
  const { Page } = pageContext;
  const pageHtml = renderToString(() => <Layout route={() => ({Page})} />);
  return escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        ${dangerouslySkipEscape(generateHydrationScript())}
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>
  `;
}
