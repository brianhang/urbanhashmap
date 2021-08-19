import styles from './WordDetails.module.css';

import { AppWord } from '../../appTypes';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import WordUpvoteButton from './WordUpvoteButton';
import useAppUserQuery from '../../queries/useAppUserQuery';

type Props = Readonly<{
  word: AppWord,
}>;

export default function WordDetails({ word }: Props) {
  const { data: user } = useAppUserQuery();
  const isCreator = user?.id === word.creatorID;
  const creationInfo = (
    <div className={styles.creator}>
      Defined by {word.creator.name}
    </div>
  );

  return (
    <div className={styles.options}>
      <div className={styles.actions}>
        <WordUpvoteButton word={word} />
        {isCreator && (
          <Link to={`/edit/${word.id}`}>
            <Button size="small">Edit</Button>
          </Link>
        )}
      </div>
      {creationInfo}
    </div>
  );
}
