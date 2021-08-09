import {Strategy as FacebookStrategy} from 'passport-facebook';
import type Koa from 'koa'
import passport from 'koa-passport';
import session from 'koa-session';

function init(app: Koa) {
  app.keys = ['test'];
  app.use(session(app));

  app.use(passport.initialize());
  app.use(passport.session());
}

export {
  init,
};
