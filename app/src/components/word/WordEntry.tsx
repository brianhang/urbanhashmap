import { AppWord } from '../../App';

interface Props {
  word: AppWord;
}

export default function WordEntry({ word }: Props) {
  return (
    <div className="word-container">
      <h2 className="word-title">{word.word}</h2>
      <p className="word-definition">{word.definition}</p>
      {word.example != null && <p className="word-example">{word.example}</p>}
    </div>
  )
}
