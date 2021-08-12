import WordEntry from './WordEntry';
import { useWordQuery } from '../../useWordQuery';

interface Props {
  query?: string | null,
  creatorID?: number | null,
}

export default function WordList({ query, creatorID }: Props) {
  const [words, _inFlight] = useWordQuery({ query, creatorID });

  return <div className="word-list">
    {words.length > 0
      ? words.map(word => <WordEntry key={word.id} word={word} />)
      : <p>No words found.</p>}
  </div>
}
