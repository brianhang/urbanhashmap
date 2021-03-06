import { Profile, Strategy } from 'passport-facebook';

import type { AppRouter } from '.';
import type Koa from 'koa';
import User from './models/User';
import passport from 'koa-passport';
import session from 'koa-session';

const CALLBACK_PATH = '/auth/facebook/callback';

type AppUser = User;

declare global {
  namespace Express {
    interface User extends AppUser { }
  }
}

async function verifyFBLogin(
  _accessToken: string,
  _refreshToken: string,
  profile: Profile,
  done: (error: any, user?: User, info?: any) => void,
): Promise<void> {
  const fbid = profile.id;
  try {
    const [user] = await User.findOrCreate({
      where: {
        fbid,
      },
      defaults: {
        name: profile.displayName,
        fbid,
      },
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
}

export const PASSPORT_STRATEGY = 'facebook';

export function setupFBLogin(app: Koa, router: AppRouter) {
  const { FB_APP_ID, FB_APP_SECRET, FB_CALLBACK_HOST } = process.env;
  passport.use(
    new Strategy(
      {
        clientID: FB_APP_ID!,
        clientSecret: FB_APP_SECRET!,
        callbackURL: `${FB_CALLBACK_HOST!}${CALLBACK_PATH}`,
      },
      verifyFBLogin,
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    let user = null;
    if (typeof (id) === 'number') {
      user = await User.findByPk(id);
    }
    done(null, user);
  })

  app.use(passport.initialize());
  app.use(passport.session());

  app.keys = [process.env.SESSION_SECRET!];
  app.use(session(app));

  router.get('/auth/facebook', passport.authenticate(PASSPORT_STRATEGY));
  router.get(
    CALLBACK_PATH,
    passport.authenticate(PASSPORT_STRATEGY, {
      successRedirect: '/',
      failureRedirect: '/login',
    })
  );
}
