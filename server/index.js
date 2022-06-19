const express = require('express');
const { createPageRenderer } = require('vite-plugin-ssr');
const vite = require('vite');

const root = `${__dirname}/..`;

startServer();

async function startServer() {
  const app = express();
  const viteDevServer = await vite.createServer({
    root,
    server: { middlewareMode: 'ssr' },
  });
  app.use(viteDevServer.middlewares);

  const renderPage = createPageRenderer({ viteDevServer, root });
  app.get('*', async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const pageContextInit = { url };
      const pageContext = await renderPage(pageContextInit);
      const { httpResponse } = pageContext;
      if (!httpResponse) return next();
      const { body, statusCode, contentType } = httpResponse;
      res.status(statusCode).type(contentType).send(body);
    } catch (e) {
      next(e);
    }
  });

  app.listen(3000);
  console.log(`Server running at http://localhost:${3000}`);
}
