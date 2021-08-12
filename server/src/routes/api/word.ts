import { FindOptions, Op, WhereAttributeHash, WhereOptions } from 'sequelize';

import { AppMiddlewares } from '../../routes';
import { AppRouter } from '../..';
import Word from '../../models/Word';

export default function (router: AppRouter, middlewares: AppMiddlewares) {
  router.get('/api/words/:query?', async ctx => {
    const options = { where: {} as WhereAttributeHash<Word['_attributes']> };

    let wordQuery: string | null = ctx.params.query;
    if (wordQuery != null) {
      wordQuery = wordQuery.trim();
      options.where.word = { [Op.iLike]: wordQuery };
    }
    ctx.body = await Word.findAll(options);
  });

  router.post('/api/word', async ctx => {
    if (ctx.isUnauthenticated()) {
      ctx.throw(401, 'You must be logged in to define a word!');
    }
    console.log(ctx.request.body);
    let { word, definition } = ctx.request.body;
    word = (word as string).trim();
    if (word.length < 1) {
      ctx.throw(400, 'Word cannot be empty');
    }
    definition = (definition as string).trim();
    if (definition.length < 1) {
      ctx.throw(400, 'Definition cannot be empty');
    }
    const newWord = await Word.create({
      word,
      definition,
      creatorID: ctx.state.user!.id,
    });
    ctx.body = newWord;
  });
}
