const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  const proxyMiddlewre = createProxyMiddleware({
    target: 'https://localhost:3001',
    changeOrigin: true,
    secure: false,
  });
  app.use('/greeting', proxyMiddlewre);
  app.use('/auth', proxyMiddlewre);
};
