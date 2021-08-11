import * as fs from 'fs/promises';
import * as https from 'https';

import Koa from 'koa';
import Router from 'koa-router';
import type User from './models/User';
import setupDatabase from './db';
import setupFBLogin from './login';
import setupRoutes from './routes';

export interface AppReqState {
  user?: User;
}

export type AppRouter = Router<AppReqState, Koa.Context>;

const app = new Koa<AppReqState, {}>();
const router: AppRouter = new Router();

setupFBLogin(app, router);
setupRoutes(router);
app.use(router.routes());

setupDatabase();

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
