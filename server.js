const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const port = process.env.PORT || 3001;
const dev = process.env.NODE_ENV === 'development';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(compression());
  server.use(cookieParser());

  server.get('/sheet/:slug', (req, res) => app.render(req, res, '/sheet', { slug: req.params.slug }));

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }

    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
  });
});
