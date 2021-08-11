import { AppRouter } from '../..';

export default function (router: AppRouter) {
  router.get('/api/user', async ctx => {
    const { user } = ctx.state;
    if (user == null) {
      ctx.throw(404);
      return;
    }
    const { id, name } = user;
    ctx.body = {
      id,
      name,
    };
  });
}
