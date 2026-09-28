import { createServer as createHttpServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createServer as createViteServer } from 'vite';
import { handleWorkMetadataRequest } from './server/work-meta.js';

const port = Number(process.env.PORT ?? 5173);
const indexHtmlPath = new URL('./index.html', import.meta.url);

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

const server = createHttpServer(async (req, res) => {
  if (req.url?.startsWith('/api/work-metadata')) {
    await handleWorkMetadataRequest(req, res);
    return;
  }

  if (req.method === 'GET' && !req.url?.includes('.')) {
    const template = await readFile(indexHtmlPath, 'utf8');
    const html = await vite.transformIndexHtml(req.url ?? '/', template);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
    return;
  }

  vite.middlewares(req, res, (err) => {
    if (err) {
      res.statusCode = 500;
      res.end(err.message);
      return;
    }

    res.statusCode = 404;
    res.end('Not found');
  });
});

server.listen(port, () => {
  console.log(`Dev server running at http://localhost:${port}`);
});
