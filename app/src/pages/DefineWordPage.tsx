import WordForm, { WordFormSubmission } from '../components/word/WordForm';

import { AppWord } from '../appTypes';
import Container from '../components/common/Container'
import { WORD_HASH_PREFIX } from './HomePage';
import useAppUserQuery from '../queries/useAppUserQuery';
import { useCallback } from 'react';
import useDefineWordMutation from '../mutations/useDefineWordMutation';
import { useHistory } from 'react-router-dom';

type Props = {}

type FormProps = {
  onSubmitted?: (newWord: AppWord) => void,
};

function DefineWordForm({ onSubmitted }: FormProps) {
  const { isLoading, mutateAsync } = useDefineWordMutation();
  const onSubmit = useCallback(async (submission: WordFormSubmission) => {
    const newWord = await mutateAsync(submission);
    if (onSubmitted != null) {
      onSubmitted(newWord);
    }
  }, [mutateAsync, onSubmitted]);
  return <WordForm
    disabled={isLoading}
    onSubmit={onSubmit}
    submitLabel="Add Word"
  />;
}

export default function DefineWordPage(props: Props) {
  const { data: user } = useAppUserQuery();
  const history = useHistory();
  const onWordSubmitted = useCallback((word: AppWord) => {
    history.push({
      pathname: '/',
      search: `?q=${word.word}`,
      hash: `${WORD_HASH_PREFIX}${word.id}`,
    });
  }, [history]);

  if (user == null) {
    return (
      <Container>
        <p>You must be logged in to define a word.</p>
      </Container>
    );
  }

  return (
    <Container>
      <DefineWordForm onSubmitted={onWordSubmitted} />
    </Container>
  );
}
