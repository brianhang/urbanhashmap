import './WordUpvoteButton.css';

import { AppWord } from '../../appTypes';
import Button from '../common/Button';

type Props = Readonly<{
  word: AppWord,
}>;

export default function WordUpvoteButton({ word }: Props) {
  const { numUpvotes = 0, upvotes = [] } = word;
  const hasUserUpvoted = upvotes.length > 0;

  return (
    <Button use={hasUserUpvoted ? 'normal' : 'primary'} size="small">
      <span className="upvote-label">Upvote</span>
      <span className="upvote-num">{numUpvotes}</span>
    </Button>
  );
}
