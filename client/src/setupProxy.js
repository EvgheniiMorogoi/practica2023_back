import { createProxyMiddleware } from 'http-proxy-middleware';

export default function configureProxy(app) {
  app.use(
    '/api', // the URL prefix you want to proxy
    createProxyMiddleware({
      target: 'http://localhost:5000', // URL of your Node.js server
      changeOrigin: true,
    })
  );
}
