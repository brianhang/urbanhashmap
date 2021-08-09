import * as db from './db';

import Koa from 'koa'
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('/greeting', async ctx => {
  ctx.body = 'Hello, World!';
});

app.use(router.routes());

db.init();

const port = app.env === 'development' ? 3001 : 3000;
app.listen(port);
console.info(`Started web server on port ${port}`);
