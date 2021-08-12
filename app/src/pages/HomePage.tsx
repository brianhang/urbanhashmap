import WordList from '../components/word/WordList'
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

type Props = {}


export default function (_props: Props) {
  const location = useLocation();
  const urlParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const wordQuery = urlParams.get('q') ?? '';
  return <WordList query={wordQuery} />;
}
