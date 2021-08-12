import { useEffect, useState } from 'react';

import { AppWord } from '../../App';
import WordEntry from './WordEntry';

interface Props {
  query?: string,
  creatorID?: number,
}

export default function WordList(_props: Props) {
  const [words, setWords] = useState<AppWord[]>([]);

  useEffect(() => {
    async function fetchWords() {
      const words = await fetch('/api/words');
      setWords(await words.json());
    }
    fetchWords();
  }, [setWords]);

  return <div className="word-list">
    {words.map(word => <WordEntry key={word.id} word={word} />)}
  </div>
}
