import './WordEntry.css';

import { Link, useLocation } from 'react-router-dom';

import { AppWord } from '../../appTypes';
import Container from '../common/Container';
import WordDetails from './WordDetails';
import { useLayoutEffect } from 'react';

interface Props {
  word: AppWord;
  id?: string,
}

export default function WordEntry({ word, id }: Props) {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash === '') {
      return;
    }
    const timeout = setTimeout(() => {
      const id = hash.substr(1);
      const element = document.getElementById(id);
      if (element != null) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 0);
    return () => clearTimeout(timeout);
  }, [hash]);

  return (
    <Container
      id={id}
      className={hash === `#${id}` ? 'word-highlight' : undefined}>
      <Link className="word-link" to={{ hash: id, pathname, search }} replace>
        <h1>{word.word}</h1>
      </Link>
      <p className="word-definition">{word.definition}</p>
      {word.example != null && <p className="word-example">{word.example}</p>}
      <WordDetails word={word} />
    </Container>
  )
}
