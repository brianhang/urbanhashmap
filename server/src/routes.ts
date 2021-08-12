import { AppRouter } from '.';
import { IMiddleware } from 'koa-router';
import { PASSPORT_STRATEGY } from './login';
import loadLoginRoutes from './routes/login';
import loadUserAPIRoutes from './routes/api/user';
import loadWordAPIRoutes from './routes/api/word';
import passport from 'koa-passport';

type RouterLoader = (router: AppRouter, middlewares: AppMiddlewares) => void;

export type AppMiddlewares = {
  authenticate: IMiddleware,
}

export default function (router: AppRouter) {
  const routes: RouterLoader[] = [
    loadLoginRoutes,
    loadUserAPIRoutes,
    loadWordAPIRoutes,
  ];
  const middlewares = {
    authenticate: passport.authenticate(PASSPORT_STRATEGY),
  };
  routes.forEach(loader => loader(router, middlewares));
}
