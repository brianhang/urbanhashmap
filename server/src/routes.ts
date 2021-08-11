import { AppRouter } from '.';
import loadLoginRoutes from './routes/login';
import loadUserAPIRoutes from './routes/api/user';

type RouterLoader = (router: AppRouter) => void;

export default function (router: AppRouter) {
  const routes: RouterLoader[] = [
    loadLoginRoutes,
    loadUserAPIRoutes,
  ];
  routes.forEach(loader => loader(router));
}
