import { useQuery, useQueryClient } from 'react-query';

import { AppWord } from '../appTypes';

export type Options = {
  query?: string | null,
};

export type WordSearchQueryData = AppWord[];

async function fetchWords({ query }: Options) {
  const response = await fetch(`/api/words/${encodeURIComponent(query ?? '')}`);
  const words = await response.json() as AppWord[];
  words.sort((a, b) => (b.numUpvotes ?? 0) - (a.numUpvotes ?? 0));
  return words;
}

export default function useWordSearchQuery(options: Options) {
  const queryClient = useQueryClient();
  return useQuery<WordSearchQueryData>(
    ['words', options],
    async () => await fetchWords(options),
    {
      onSuccess: words => {
        words.forEach(
          word => queryClient.setQueryData(['word', word.id], word),
        );
      },
    }
  );
}
