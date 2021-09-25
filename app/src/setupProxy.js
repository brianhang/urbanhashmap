const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  const routes = [
    '/api',
    '/auth',
    '/login',
    '/logout',
  ];
  const proxyMiddleware = createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
    secure: false,
  });
  routes.forEach(route => app.use(route, proxyMiddleware));
};
