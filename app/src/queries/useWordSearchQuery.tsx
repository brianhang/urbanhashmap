import { useQuery, useQueryClient } from 'react-query';

import { AppWord } from '../appTypes';

export type Options = {
  query?: string | null,
};

async function fetchWords({ query }: Options) {
  const response = await fetch(`/api/words/${encodeURIComponent(query ?? '')}`);
  const words = await response.json() as AppWord[];
  return words;
}

export default function useWordSearchQuery(options: Options) {
  const queryClient = useQueryClient();
  return useQuery(
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
