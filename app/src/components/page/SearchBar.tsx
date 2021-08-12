import './SearchBar.css';

import { FormEvent, useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useEffect } from 'react';

type Props = {}

export default function SearchBar(_props: Props) {
  const [query, setQuery] = useState('');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const unlisten = history.listen(location => {
      const params = new URLSearchParams(location.search);
      const urlQuery = params.get('q') ?? '';
      if (query !== urlQuery) {
        setQuery(urlQuery);
      }
    });
    return unlisten;
  }, [history, query]);

  const onSubmit = useCallback((ev: FormEvent) => {
    ev.preventDefault();
    const params = new URLSearchParams(location.search);
    const oldQuery = params.get('q') ?? '';
    let newQuery = query.trim();
    if (newQuery === oldQuery) {
      return;
    }
    params.set('q', newQuery);
    history.push({ search: params.toString(), pathname: location.pathname });
  }, [history, location.pathname, location.search, query]);

  return (
    <div className="search-container">
      <form onSubmit={onSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder={'Search for a word\u2026'}
          value={query}
          onChange={ev => setQuery(ev.target.value)}
        />
      </form>
    </div>
  );
}
