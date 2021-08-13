import './Input.css';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea(props: Props) {
  return <textarea className="app-input" {...props}>{props.children}</textarea>;
}
