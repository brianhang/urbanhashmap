import WordList from '../components/word/WordList'
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

type Props = Readonly<{}>;

export const WORD_HASH_PREFIX = 'word-';

export default function HomePage(_props: Props) {
  const { search } = useLocation();
  const urlParams = useMemo(
    () => new URLSearchParams(search),
    [search],
  );

  const wordQuery = decodeURIComponent(urlParams.get('q') ?? '');
  return <WordList query={wordQuery} hashPrefix={WORD_HASH_PREFIX} />;
}
