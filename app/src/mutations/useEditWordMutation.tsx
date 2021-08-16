import { useMutation, useQueryClient } from 'react-query';

import { AppWord } from '../appTypes';

export type EditWordData = {
  id: AppWord['id'],
  definition?: AppWord['definition'] | null,
  example?: AppWord['example'] | null,
};

async function editWord({ id, definition, example }: EditWordData) {
  const response = await fetch(`/api/word/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      definition,
      example,
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to edit word ${id}`);
  }
  const newWord = (await response.json()) as AppWord;
  return newWord;
}

export default function useEditWordMutation() {
  const queryClient = useQueryClient();
  return useMutation(editWord, {
    onSuccess: newWord => {
      queryClient.setQueryData(['word', newWord.id], newWord);
      queryClient.invalidateQueries('words');
    },
  });
}
