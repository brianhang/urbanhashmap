import { AppRouter } from '../..';
import UserWordUpvote from '../../models/UserWordUpvote';
import { fetchWordByIDParam } from '../../utils/wordUtils';

export default function loadUpvoteRoutes(router: AppRouter) {
  router.post('/api/word/:id/upvote', async ctx => {
    if (ctx.isUnauthenticated()) {
      ctx.throw(401, 'You must be logged in to define a word!');
    }
    const user = ctx.state.user!;
    const word = await fetchWordByIDParam(ctx);
    const upvoteAttributes = {
      userID: user.id as number,
      wordID: word.id as number,
    };
    const [upvote] = await UserWordUpvote.findOrCreate({
      where: upvoteAttributes,
      defaults: upvoteAttributes,
    });
    ctx.body = upvote;
  });

  router.delete('/api/word/:id/upvote', async ctx => {
    if (ctx.isUnauthenticated()) {
      ctx.throw(401, 'You must be logged in to define a word!');
    }
    const user = ctx.state.user!;
    const { id } = ctx.params;
    const wordID = Number.parseInt(id);
    if (isNaN(wordID) || wordID < 1) {
      ctx.throw(401, `"${id}" is not a valid word ID!`);
    }
    const deleted = await UserWordUpvote.destroy({
      where: {
        userID: user.id,
        wordID,
      },
    });
    ctx.body = { deleted };
  });
}
