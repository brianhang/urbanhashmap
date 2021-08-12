import { FormEvent, useCallback, useState } from 'react';

import { AppWord } from './App';

interface Props {
  onSubmitted?: (newWord: AppWord) => void,
};

export default function DefineWordForm({ onSubmitted }: Props) {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [inFlight, setInFlight] = useState(false);

  const onSubmit = useCallback(async (ev: FormEvent) => {
    ev.preventDefault();
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
        }),
      });
      console.log(response);
      const newWord = (await response.json()) as AppWord;
      console.log(newWord);
      if (onSubmitted != null) {
        onSubmitted(newWord);
      }
    } finally {
      setInFlight(false);
    }
  }, [definition, onSubmitted, setInFlight, word]);

  return (
    <form onSubmit={onSubmit}>
      <label>
        Word:
        <input
          name="word"
          type="text"
          required={true}
          minLength={1}
          value={word}
          onChange={e => setWord(e.target.value)}
        />
      </label>
      <label>
        Definition:
        <input
          name="definition"
          type="text"
          required={true}
          minLength={1}
          value={definition}
          onChange={e => setDefinition(e.target.value)}
        />
      </label>
      <button type="submit" disabled={inFlight}>Add Word</button>
    </form>
  )
}
