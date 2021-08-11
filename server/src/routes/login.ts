import { AppRouter } from '..';

export default function (router: AppRouter) {
  router.get('/login', async ctx => {
    ctx.redirect('/auth/facebook');
  });

  router.get('/logout', async ctx => {
    ctx.logout();
    ctx.redirect('/');
  })
}
