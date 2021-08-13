import WordEntry from './WordEntry';
import { useWordQuery } from '../../useWordQuery';

interface Props {
  query?: string | null,
  creatorID?: number | null,
  hashPrefix?: string,
}

export default function WordList({ query, creatorID, hashPrefix }: Props) {
  const [words] = useWordQuery({ query, creatorID });

  return <div className="word-list">
    {words.length > 0
      ? words.map(word => <WordEntry
        id={hashPrefix != null ? `${hashPrefix}${word.id}` : undefined}
        key={word.id}
        word={word}
      />)
      : <p>No words found.</p>}
  </div>
}
