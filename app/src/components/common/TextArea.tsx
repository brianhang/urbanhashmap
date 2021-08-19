import styles from './Input.module.css';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea(props: Props) {
  return (
    <textarea className={styles.input} {...props}>
      {props.children}
    </textarea>
  );
}
