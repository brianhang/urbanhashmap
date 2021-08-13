import { FindOptions, Op, WhereAttributeHash, WhereOptions } from 'sequelize';

import { AppMiddlewares } from '../../routes';
import { AppRouter } from '../..';
import Word from '../../models/Word';

export default function (router: AppRouter, middlewares: AppMiddlewares) {
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

  router.post('/api/word', async ctx => {
    if (ctx.isUnauthenticated()) {
      ctx.throw(401, 'You must be logged in to define a word!');
    }

    let { word, definition, example } = ctx.request.body;
    word = (new String(word)).trim();
    if (word.length < 1) {
      ctx.throw(400, 'Word cannot be empty');
    }
    definition = (new String(definition)).trim();
    example = (new String(example ?? '')).trim();
    if (definition.length < 1) {
      ctx.throw(400, 'Definition cannot be empty');
    }
    const newWord = await Word.create({
      word,
      definition,
      example,
      creatorID: ctx.state.user!.id,
    });
    ctx.body = newWord;
  });
}
