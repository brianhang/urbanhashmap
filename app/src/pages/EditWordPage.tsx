import WordForm, { WordFormSubmission } from '../components/word/WordForm';
import { useHistory, useParams } from 'react-router-dom';

import { AppWord } from '../appTypes';
import Container from '../components/common/Container'
import { WORD_HASH_PREFIX } from './HomePage';
import useAppUserQuery from '../queries/useAppUserQuery';
import { useCallback } from 'react';
import useEditWordMutation from '../mutations/useEditWordMutation';
import useWordQuery from '../queries/useWordQuery';

type Props = {
  word?: AppWord,
};

type Params = {
  id: string,
};

type FormProps = {
  word: AppWord,
  onSubmitted?: (newWord: AppWord) => void,
};

function EditWordForm({ word, onSubmitted }: FormProps) {
  const { isLoading, mutateAsync } = useEditWordMutation();
  const onSubmit = useCallback(async (submission: WordFormSubmission) => {
    const newWord = await mutateAsync({ ...submission, id: word.id });
    if (onSubmitted != null) {
      onSubmitted(newWord);
    }
  }, [mutateAsync, onSubmitted, word.id]);
  return <WordForm
    disabled={isLoading}
    onSubmit={onSubmit}
    submitLabel="Save Word"
    word={word.word}
    definition={word.definition}
    example={word.example}
    editOnly={true}
  />;
}

export default function DefineWordPage(props: Props) {
  const history = useHistory();
  const { id } = useParams<Params>();
  const { data: user, isFetching: isFetchingUser } = useAppUserQuery();
  const { data: word, isFetching: isFetchingWord } = useWordQuery(
    Number.parseInt(id),
  );

  const onWordSubmitted = useCallback((word: AppWord) => {
    history.push({
      pathname: '/',
      search: `?q=${encodeURIComponent(word.word)}`,
      hash: `${WORD_HASH_PREFIX}${word.id}`,
    });
  }, [history]);

  if (isFetchingUser) {
    return null;
  }
  if (user == null) {
    return (
      <Container>
        <p>You must be logged in to edit a word.</p>
      </Container>
    );
  }

  if (isFetchingWord) {
    return (
      <Container>
        <p>Loading word...</p>
      </Container>
    );
  }
  if (word == null) {
    return (
      <Container>
        <p>The word you are looking for could not be found.</p>
      </Container>
    );
  }

  return (
    <Container>
      <EditWordForm onSubmitted={onWordSubmitted} word={word} />
    </Container>
  );
}
