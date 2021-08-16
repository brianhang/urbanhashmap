import './Button.css';

import classNames from 'classnames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  use?: 'normal' | 'primary',
  size?: 'normal' | 'small',
}

export default function Button(props: Props) {
  const { use = 'normal', size = 'normal', ...buttonProps } = props;
  return (
    <button
      className={classNames({
        'app-button': true,
        [`app-button-${size}`]: true,
        [`app-button-${use}`]: true,
      })}
      {...buttonProps}>
      {props.children}
    </button>
  );
}
