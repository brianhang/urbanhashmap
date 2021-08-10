import * as db from './db';
import * as fs from 'fs/promises';
import * as https from 'https';
import * as login from './login';
import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

login.init(app, router);

router.get('/greeting', async ctx => {
  ctx.body = 'Hello, World!';
});

app.use(router.routes());

db.init();

async function startServer() {
  let key = null;
  let cert = null;
  try {
    [cert, key] = await Promise.all([
      fs.readFile(process.env.TLS_CERT_PATH!),
      fs.readFile(process.env.TLS_KEY_PATH!),
    ]);
  } catch (error) {
    console.error('Failed to load key or cert file:', error);
    return;
  }
  const port = Number.parseInt(process.env.APP_PORT ?? '') ?? 3000;
  const serverOptions = {
    cert,
    key,
  };
  try {
    https.createServer(serverOptions, app.callback()).listen(port);
    console.info(`Started web server on port ${port}`);
  } catch (error) {
    console.error('Failed to start web server:', error);
  }
}

startServer();
