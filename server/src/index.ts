import * as db from './db';
import * as fs from 'fs/promises';
import * as https from 'https';
import * as login from './login';
import loadRoutes from './routes';
import Koa from 'koa';
import Router from 'koa-router';
import type User from './models/User';

export interface AppReqState {
  user?: User;
}

export type AppRouter = Router<AppReqState, Koa.Context>;

const app = new Koa<AppReqState, {}>();
const router: AppRouter = new Router();

login.init(app, router);

router.get('/api/greeting', async ctx => {
  ctx.body = ctx.state?.user?.name ?? 'Not Logged In';
});

loadRoutes(router);
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
