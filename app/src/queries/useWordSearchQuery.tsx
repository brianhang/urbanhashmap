import { AppWord } from '../appTypes';
import { useQuery } from 'react-query';

export type Options = {
  query?: string | null,
};

async function fetchWords({ query }: Options) {
  const response = await fetch(`/api/words/${encodeURIComponent(query ?? '')}`);
  const words = await response.json() as AppWord[];
  return words;
}

export default function useWordSearchQuery(options: Options) {
  return useQuery(['words', options], async () => await fetchWords(options));
}
