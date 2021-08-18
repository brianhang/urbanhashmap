import { AppReqState } from '..';
import { ParameterizedContext } from 'koa';
import Word from '../models/Word';

export function getValidatedWordParams(params: {
  word?: any,
  definition?: any,
  example?: any,
}) {
  const word = (new String(params.word ?? '')).trim();
  if (word === '') {
    throw new Error('The given word cannot be empty');
  }

  const definition = (new String(params.definition ?? '')).trim();
  if (definition === '') {
    throw new Error('The given definition cannot be empty');
  }


  let example: string | undefined = (new String(params.example ?? ''))
    .trim();
  if (example === '') {
    example = undefined;
  }

  return {
    word,
    definition,
    example,
  };
}

export async function fetchWordByIDParam(ctx: ParameterizedContext<AppReqState>) {
  const { id } = ctx.params;
  const wordID = Number.parseInt(id);
  if (isNaN(wordID) || wordID <= 0) {
    ctx.throw(400, `"${id}" is not a valid word ID!`);
  }
  const foundWord = await Word.findByPk(wordID);
  if (foundWord == null) {
    ctx.throw(404);
  }
  return foundWord;
}
