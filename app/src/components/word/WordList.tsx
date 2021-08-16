import WordEntry from './WordEntry';
import useWordSearchQuery from '../../queries/useWordSearchQuery';

interface Props {
  query?: string | null,
  creatorID?: number | null,
  hashPrefix?: string,
}

export default function WordList({ query, hashPrefix }: Props) {
  const { data: words, isLoading, isError } = useWordSearchQuery({ query });

  if (isError) {
    return <div>Something went wrong! Please try refreshing the page.</div>;
  }
  if (isLoading || words == null) {
    return <div>Loading{'\u2026'}</div>;
  }

  return (
    <div className="word-list">
      {words.length > 0
        ? words.map(word => <WordEntry
          id={hashPrefix != null ? `${hashPrefix}${word.id}` : undefined}
          key={word.id}
          word={word}
        />)
        : <p>No words found.</p>}
    </div>
  );
}
