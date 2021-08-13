import { AppReqState, AppRouter } from '../..';
import { Op, WhereAttributeHash } from 'sequelize';

import { ParameterizedContext } from 'koa';
import Word from '../../models/Word';
import { getValidatedWordParams } from '../../utils/wordUtils';

export default function (router: AppRouter) {
  async function fetchWordByIDParam(ctx: ParameterizedContext<AppReqState>) {
    const { id } = ctx.params;
    const wordID = Number.parseInt(id);
    if (isNaN(wordID) || wordID <= 0) {
      ctx.throw(400, `"${id}" is not a valid word ID!`);
    }
    const foundWord = await Word.findByPk(wordID);
    if (foundWord == null) {
      console.log(wordID);
      ctx.throw(404);
    }
    return foundWord;
  }

  router.get('/api/words/:query?', async ctx => {
    const options = {
      where: {} as WhereAttributeHash<Word['_attributes']>,
      order: [
        'word',
        'id',
      ],
    };

    let wordQuery: string | null = ctx.params.query;
    if (wordQuery != null) {
      wordQuery = wordQuery.trim();
      options.where.word = { [Op.iLike]: `%${wordQuery}%` };
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
      example,
    });
    ctx.body = await foundWord.save();
  });
}
