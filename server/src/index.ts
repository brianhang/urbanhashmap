import * as db from './db';
import * as login from './login';

import Koa from 'koa'
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('/greeting', async ctx => {
  ctx.body = 'Hello, World!';
});

app.use(router.routes());

db.init();
login.init(app);

const port = app.env === 'development' ? 3001 : 3000;
app.listen(port);
console.info(`Started web server on port ${port}`);
