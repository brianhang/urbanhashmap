import './WordDetails.css';

import { AppWord } from '../../appTypes';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import useAppUserQuery from '../../queries/useAppUserQuery';

type Props = Readonly<{
  word: AppWord,
}>;

export default function WordDetails({ word }: Props) {
  const { data: user } = useAppUserQuery();
  const isCreator = user?.id === word.creatorID;
  console.log(Date.parse(word.createdAt), word.createdAt)
  const creationInfo = (
    <div className="word-creator">
      Defined by {word.creator.name}
    </div>
  );

  return (
    <div className="word-options">
      {isCreator && <Link to={`/edit/${word.id}`}><Button size="small">Edit</Button></Link>}
      {creationInfo}
    </div>
  );
}
