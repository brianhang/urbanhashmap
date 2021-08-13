import { FormEvent, useCallback, useState } from 'react';

import Button from '../common/Button';
import Input from '../common/Input';
import TextArea from '../common/TextArea';

export type WordFormSubmission = {
  word: string,
  definition: string,
  example: string | null,
  setInFlight: (inFlight: boolean) => void,
};

type Props = Readonly<{
  word?: string,
  definition?: string,
  example?: string,
  submitLabel: string,
  onSubmit?: (submission: WordFormSubmission) => void,
  editOnly?: boolean,
}>;

export default function WordForm(props: Props) {
  const [word, setWord] = useState(props.word ?? '');
  const [definition, setDefinition] = useState(props.definition ?? '');
  const [example, setExample] = useState(props.example ?? '');
  const [inFlight, setInFlight] = useState(false);

  const parentOnSubmit = props.onSubmit;
  const onSubmit = useCallback(async (ev: FormEvent) => {
    ev.preventDefault();
    if (parentOnSubmit == null) {
      return;
    }
    parentOnSubmit({
      word,
      definition,
      example,
      setInFlight,
    });
  }, [word, definition, example, setInFlight, parentOnSubmit]);

  return (
    <form onSubmit={onSubmit}>
      <label>
        Enter the word that you would like to define:
        <Input
          name="word"
          type="text"
          required={true}
          minLength={1}
          value={word}
          onChange={e => setWord(e.target.value)}
          disabled={props.editOnly}
        />
      </label>
      <p>
        <label>
          Enter the definition for your word:
          <TextArea
            name="definition"
            required={true}
            minLength={1}
            rows={4}
            value={definition}
            onChange={e => setDefinition(e.target.value)}
          />
        </label>
      </p>
      <p>
        <label>
          Optionally, provide an example of how to use the word:
          <Input
            name="example"
            value={example}
            onChange={e => setExample(e.target.value)}
          />
        </label>
      </p>
      <Button use="primary" type="submit" disabled={inFlight}>{props.submitLabel}</Button>
    </form>
  );
}
