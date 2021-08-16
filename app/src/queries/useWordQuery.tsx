import { AppWord } from '../appTypes';
import { useQuery } from 'react-query';

async function fetchWordByID(id: number) {
  const response = await fetch(`/api/word/${id}`);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const word = await response.json() as AppWord | null;
  return word;
}

export default function useWordQuery(id: number) {
  return useQuery(['word', id], async () => await fetchWordByID(id), {
    retry: false,
  });
}
