// Dependencies
const express = require('express');
const proxy = require('http-proxy-middleware');
const cors = require('cors');

// Config
const { routes } = require('./config/routes.json');

const app = express();
app.use(cors());


routes.map((route) => {
  app.use(route.route,
    proxy({
      target: route.address,
      pathRewrite: (path, req) =>
        path.split('/').slice(2).join('/')
      ,
    }),
  );
});

app.listen(80, () => {
  console.log('Proxy listening on port 80');
});
