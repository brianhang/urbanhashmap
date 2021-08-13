import WordForm, { WordFormSubmission } from '../components/word/WordForm';
import { useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AppWord } from '../appTypes';
import Container from '../components/common/Container'
import { WORD_HASH_PREFIX } from './HomePage';
import { useAppUser } from '../contexts/appUserContext';
import { useEffect } from 'react';

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
  const { id } = word;
  const onSubmit = useCallback(async (submission: WordFormSubmission) => {
    const { setInFlight, definition, example } = submission;
    let newWord = null;
    setInFlight(true);
    try {
      const response = await fetch(`/api/word/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
  }, [onSubmitted, id]);
  return <WordForm
    onSubmit={onSubmit}
    submitLabel="Save Word"
    word={word.word}
    definition={word.definition}
    example={word.example}
    editOnly={true}
  />;
}

export default function DefineWordPage(props: Props) {
  const user = useAppUser();
  const history = useHistory();
  const [loadedWord, setLoadedWord] = useState(props.word);
  const [isFetchingWord, setIsFetchingWord] = useState(true);
  const onWordSubmitted = useCallback((word: AppWord) => {
    history.push({
      pathname: '/',
      search: `?q=${encodeURIComponent(word.word)}`,
      hash: `${WORD_HASH_PREFIX}${word.id}`,
    });
  }, [history]);
  const { id } = useParams<Params>();

  useEffect(() => {
    if (loadedWord != null) {
      setIsFetchingWord(false);
      return;
    }
    let isMounted = true;
    async function fetchWord() {
      try {
        const response = await fetch(`/api/word/${id}`);
        const word = await response.json() as AppWord;
        if (isMounted) {
          setLoadedWord(word);
        }
      } finally {
        if (isMounted) {
          setIsFetchingWord(false);
        }
      }
    }
    fetchWord();
    return () => { isMounted = false; };
  }, [id, loadedWord, setIsFetchingWord, setLoadedWord]);

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
  if (loadedWord == null) {
    return (
      <Container>
        <p>The word you are looking for could not be found.</p>
      </Container>
    );
  }

  return (
    <Container>
      {!isFetchingWord &&
        <EditWordForm onSubmitted={onWordSubmitted} word={loadedWord} />}
    </Container>
  );
}
