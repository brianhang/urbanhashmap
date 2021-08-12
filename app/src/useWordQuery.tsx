import { useEffect } from 'react';
import { useState } from 'react';

export type AppWord = {
  id: number,
  word: string,
  definition: string,
  example?: string,
  creatorID: number,
}

export type Options = {
  query?: string | null,
  creatorID?: number | null,
}

export function useWordQuery(options: Options): [AppWord[], boolean] {
  const [words, setWords] = useState<AppWord[]>([]);
  const [inFlight, setInFlight] = useState(false);

  const query = options.query ?? '';

  useEffect(() => {
    setInFlight(true);
    async function fetchWords() {
      try {
        const response = await fetch(`/api/words/${query}`);
        const words = await response.json() as AppWord[];
        setWords(words);
      } finally {
        setInFlight(false);
      }
    }
    fetchWords();
  }, [query, setWords, setInFlight]);

  return [words, inFlight];
}
