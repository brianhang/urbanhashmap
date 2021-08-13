import './SearchBar.css';

import { FormEvent, useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Container from '../common/Container';
import Input from '../common/Input';
import { useEffect } from 'react';

type Props = {}

export default function SearchBar(_props: Props) {
  const [query, setQuery] = useState<string | null>(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    function setQueryFromURL(search: string) {
      const params = new URLSearchParams(search);
      const urlQuery = params.get('q') ?? '';
      if (query !== urlQuery) {
        setQuery(urlQuery);
      }
    }
    const unlisten = history.listen(
      location => setQueryFromURL(location.search),
    );
    if (query == null) {
      setQueryFromURL(location.search);
    }
    return unlisten;
  }, [history, location.search, query, setQuery]);

  const onSubmit = useCallback((ev: FormEvent) => {
    ev.preventDefault();
    const params = new URLSearchParams(location.search);
    const oldQuery = params.get('q') ?? '';
    let newQuery = (query ?? '').trim();
    if (newQuery === oldQuery) {
      return;
    }
    params.set('q', newQuery);
    history.push({ search: params.toString(), pathname: location.pathname });
  }, [history, location.pathname, location.search, query]);

  return (
    <Container noPadding={true}>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder={'Search for a word\u2026'}
          value={query ?? ''}
          onChange={ev => setQuery(ev.target.value)}
        />
      </form>
    </Container>
  );
}
