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
