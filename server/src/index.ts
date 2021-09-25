import Koa from 'koa';
import Router from 'koa-router';
import type User from './models/User';
import bodyParser from 'koa-bodyparser';
import setupDatabase from './db';
import { setupFBLogin } from './login';
import setupRoutes from './routes';

export interface AppReqState {
  user?: User;
}

export type AppRouter = Router<AppReqState, Koa.Context>;

const app = new Koa<AppReqState, {}>();
const router: AppRouter = new Router();

app.use(bodyParser());

setupFBLogin(app, router);
setupRoutes(router);
app.use(router.routes());

setupDatabase();

const port = Number.parseInt(process.env.APP_PORT ?? '') ?? 3000;
app.listen(port);
console.info(`Started web server on port ${port}`);
