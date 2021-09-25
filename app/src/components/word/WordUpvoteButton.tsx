import styles from './WordUpvoteButton.module.css';

import { MouseEvent, useCallback } from 'react';

import { AppWord } from '../../appTypes';
import Button from '../common/Button';
import useToggleUpvoteWordMutation from '../../mutations/useToggleUpvoteWordMutation';
import useAppUserQuery from '../../queries/useAppUserQuery';

type Props = Readonly<{
  word: AppWord,
}>;

export default function WordUpvoteButton({ word }: Props) {
  const { data: user } = useAppUserQuery();
  const { isLoading, mutate } = useToggleUpvoteWordMutation();
  const { numUpvotes = 0, upvotes = [] } = word;
  const hasUserUpvoted = upvotes.length > 0;

  const onClick = useCallback((ev: MouseEvent) => {
    ev.preventDefault();
    if (user != null) {
      mutate({ word });
    }
  }, [mutate, user, word]);

  const notLoggedIn = user == null;
  return (
    <Button
      use={hasUserUpvoted ? 'normal' : 'primary'}
      size="small"
      onClick={onClick}
      title={notLoggedIn ? 'Please log in to upvote this word' : undefined}
      style={{cursor: notLoggedIn ? 'not-allowed' : 'pointer'}}
      disabled={notLoggedIn || isLoading}>
      <span className={styles.label}>Upvote</span>
      <span className={styles.num}>{numUpvotes}</span>
    </Button>
  );
}
