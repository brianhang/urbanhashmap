import WordForm, { WordFormSubmission } from '../components/word/WordForm';

import { AppWord } from '../appTypes';
import Container from '../components/common/Container'
import { WORD_HASH_PREFIX } from './HomePage';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

type Props = {}

type FormProps = {
  onSubmitted?: (newWord: AppWord) => void,
};

function DefineWordForm({ onSubmitted }: FormProps) {
  const onSubmit = useCallback(async (submission: WordFormSubmission) => {
    const { setInFlight, word, definition, example } = submission;
    let newWord = null;
    setInFlight(true);
    try {
      const response = await fetch('/api/word', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word,
          definition,
          example,
        }),
      });
      newWord = (await response.json()) as AppWord;
    } finally {
      setInFlight(false);
    }
    if (onSubmitted != null) {
      onSubmitted(newWord);
    }
  }, [onSubmitted]);
  return <WordForm onSubmit={onSubmit} submitLabel="Add Word" />;
}

export default function DefineWordPage(props: Props) {
  const history = useHistory();
  const onWordSubmitted = useCallback((word: AppWord) => {
    history.push({
      pathname: '/',
      search: `?q=${word.word}`,
      hash: `${WORD_HASH_PREFIX}${word.id}`,
    });
  }, [history])

  return (
    <Container>
      <DefineWordForm onSubmitted={onWordSubmitted} />
    </Container>
  );
}
