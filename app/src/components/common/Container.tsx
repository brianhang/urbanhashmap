import styles from './Container.module.css';

import React from 'react';
import classNames from 'classnames';

type Props = React.PropsWithChildren<{
  noPadding?: boolean,
  id?: string,
  className?: string,
}>;

export default function Container(props: Props) {
  const classes: { [key: string]: boolean } = {
    [styles.container]: true,
    [styles.padding]: !props.noPadding,
  };
  if (props.className != null) {
    classes[props.className] = true;
  }
  return (
    <div id={props.id} className={classNames(classes)}>
      {props.children}
    </div>
  );
}

