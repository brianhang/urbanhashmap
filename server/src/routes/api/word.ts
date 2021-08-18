import { FindOptions, Includeable, Op, Sequelize, WhereAttributeHash } from 'sequelize';
import { fetchWordByIDParam, getValidatedWordParams } from '../../utils/wordUtils';

import { AppRouter } from '../..';
import User from '../../models/User';
import UserWordUpvote from '../../models/UserWordUpvote';
import Word from '../../models/Word';

export default function (router: AppRouter) {
  router.get('/api/words/:query?', async ctx => {
    const options: FindOptions<Word['_attributes']> = {
      where: {},
      order: [
        'word',
        'id',
      ],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(
              '(SELECT COUNT(*) FROM "UserWordUpvotes"' +
              'WHERE "UserWordUpvotes"."wordID" = "Word"."id")',
            ),
            'numUpvotes',
          ],
        ],
      },
    };

    const { user } = ctx.state;
    if (user != null) {
      (options.include as Includeable[]).push({
        model: UserWordUpvote,
        attributes: ['id'],
        where: {
          userID: user.id,
        },
        required: false,
        limit: 1,
      });
    }

    let wordQuery: string | null = ctx.params.query;
    if (wordQuery != null) {
      wordQuery = wordQuery.trim();
      (options.where as WhereAttributeHash<Word['_attributes']>).word = {
        [Op.iLike]: `%${wordQuery}%`,
      };
    }
    ctx.body = await Word.findAll(options);
  });

  router.get('/api/word/:id', async ctx => {
    const word = await fetchWordByIDParam(ctx);
    ctx.body = word;
  });

  router.post('/api/word', async ctx => {
    if (ctx.isUnauthenticated()) {
      ctx.throw(401, 'You must be logged in to define a word!');
    }

    try {
      let { word, definition, example } = getValidatedWordParams(
        ctx.request.body,
      );
      const newWord = await Word.create({
        word,
        definition,
        example,
        creatorID: ctx.state.user!.id,
      });
      ctx.body = newWord;
    } catch (error) {
      ctx.throw(400, error);
    }
  });

  router.patch('/api/word/:id', async ctx => {
    const { user } = ctx.state;
    if (user == null) {
      ctx.throw(401, 'You must be logged in to edit a word!');
      return;
    }
    const foundWord = await fetchWordByIDParam(ctx);
    if (foundWord.creatorID !== user.id) {
      ctx.throw(401, 'You must be the creator of the word to edit it!');
      return;
    }
    let definition: string, example: string | undefined;
    try {
      ({ definition, example } = getValidatedWordParams({
        ...ctx.request.body,
        word: foundWord.word,
      }));
    } catch (error) {
      ctx.throw(400, error);
      return;
    }
    foundWord.setAttributes({
      definition,
      example: example ?? '',
    });
    ctx.body = await foundWord.save();
  });
}
