import WordList from '../components/word/WordList'
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

type Props = {}

export const WORD_HASH_PREFIX = 'word-';

export default function HomePage(_props: Props) {
  const location = useLocation();
  const urlParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const wordQuery = decodeURIComponent(urlParams.get('q') ?? '');
  return <WordList query={wordQuery} hashPrefix={WORD_HASH_PREFIX} />;
}
