import styles from './Button.module.css';

import classNames from 'classnames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  use?: 'normal' | 'primary',
  size?: 'normal' | 'small',
}

export default function Button(props: Props) {
  const { use = 'normal', size = 'normal', ...buttonProps } = props;

  let useClass;
  switch (use) {
    case 'normal':
      useClass = styles.normalUse;
      break;
    case 'primary':
      useClass = styles.primaryUse;
      break;
  }
  let sizeClass;
  switch (size) {
    case 'normal':
      sizeClass = styles.normalSize;
      break;
    case 'small':
      sizeClass = styles.smallSize;
      break;
  }

  return (
    <button
      className={classNames({
        [styles.button]: true,
        [sizeClass]: true,
        [useClass]: true,
      })}
      {...buttonProps}>
      {props.children}
    </button>
  );
}
