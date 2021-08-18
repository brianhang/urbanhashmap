import './WordUpvoteButton.css';

import { MouseEvent, useCallback } from 'react';

import { AppWord } from '../../appTypes';
import Button from '../common/Button';
import useToggleUpvoteWordMutation from '../../mutations/useToggleUpvoteWordMutation';

type Props = Readonly<{
  word: AppWord,
}>;

export default function WordUpvoteButton({ word }: Props) {
  const { isLoading, mutate } = useToggleUpvoteWordMutation();
  const { numUpvotes = 0, upvotes = [] } = word;
  const hasUserUpvoted = upvotes.length > 0;

  const onClick = useCallback((ev: MouseEvent) => {
    ev.preventDefault();
    mutate({ word });
  }, [mutate, word]);

  return (
    <Button
      use={hasUserUpvoted ? 'normal' : 'primary'}
      size="small"
      onClick={onClick}
      disabled={isLoading}>
      <span className="upvote-label">Upvote</span>
      <span className="upvote-num">{numUpvotes}</span>
    </Button>
  );
}
