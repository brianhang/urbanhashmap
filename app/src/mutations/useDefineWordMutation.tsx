import { useMutation, useQueryClient } from 'react-query';

import { AppWord } from '../appTypes';

export type NewWordData = {
  word: AppWord['word'],
  definition: AppWord['definition'],
  example?: AppWord['example'] | null,
};

async function defineWord({ word, definition, example }: NewWordData) {
  const response = await fetch('/api/word', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      word,
      definition,
      example,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to define word: ' + JSON.stringify(word));
  }
  const newWord = (await response.json()) as AppWord;
  return newWord;
}

export default function useDefineWordMutation() {
  const queryClient = useQueryClient();
  return useMutation(defineWord, {
    onSuccess: newWord => {
      queryClient.setQueryData(['word', newWord.id], newWord);
      queryClient.invalidateQueries('words');
    },
  });
}
