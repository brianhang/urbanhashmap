import './Input.css';

type Props = {} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: Props) {
  return <input className="app-input" {...props}>{props.children}</input>;
}
