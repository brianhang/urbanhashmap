import { useMutation, useQueryClient } from 'react-query';

import { AppWord } from '../appTypes';
import { WordSearchQueryData } from '../queries/useWordSearchQuery';

type ToggleUpvoteData = {
  word: AppWord,
};

async function toggleUpvote({ word }: ToggleUpvoteData) {
  const { id, upvotes } = word;
  const isDelete = (upvotes?.length ?? 0) > 0;
  const response = await fetch(`/api/word/${id}/upvote`, {
    method: isDelete ? 'DELETE' : 'POST',
  });
  if (!response.ok) {
    throw new Error(`Failed to toggle upvote for word ${word.id}`);
  }
  if (isDelete) {
    return [];
  }
  const newUpvote = (await response.json()) as AppWord;
  return [newUpvote];
}

export default function useToggleUpvoteWordMutation() {
  const queryClient = useQueryClient();
  return useMutation(toggleUpvote, {
    onMutate: async ({ word: updatedWord }) => {
      await queryClient.cancelQueries('words');
      const oldWords = queryClient.getQueryData('words');
      queryClient.setQueriesData<WordSearchQueryData>(
        'words',
        words => (words ?? []).map(word => {
          if (word.id !== updatedWord.id) {
            return word;
          }
          const isDelete = (word.upvotes?.length ?? 0) > 0;
          const newUpvotes = isDelete ? [] : [{ id: 0 }];
          return {
            ...word,
            numUpvotes: (word?.numUpvotes ?? 0) + (isDelete ? -1 : 1),
            upvotes: newUpvotes,
          };
        }),
      );
      return { oldWords };
    },
  });
}
