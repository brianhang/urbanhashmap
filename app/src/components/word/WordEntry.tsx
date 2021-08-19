import styles from './WordEntry.module.css';

import { Link, useLocation } from 'react-router-dom';

import { AppWord } from '../../appTypes';
import Container from '../common/Container';
import WordDetails from './WordDetails';
import { useLayoutEffect } from 'react';
import classNames from 'classnames';

type Props = Readonly<{
  word: AppWord;
  id?: string,
}>;

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
      className={classNames({
        [styles.highlight]: hash === `#${id}`,
      })}>
      <Link className={styles.link} to={{ hash: id, pathname, search }} replace>
        <h1>{word.word}</h1>
      </Link>
      <p className={styles.definition}>{word.definition}</p>
      {word.example != null && <p className={styles.example}>{word.example}</p>}
      <WordDetails word={word} />
    </Container>
  )
}
