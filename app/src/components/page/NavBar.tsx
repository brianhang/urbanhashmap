import styles from './NavBar.module.css';

import { Link } from 'react-router-dom';
import useAppUserQuery from '../../queries/useAppUserQuery';

type Props = Readonly<{}>;

export default function NavBar(_props: Props) {
  const { data: user, isLoading: isLoadingUser } = useAppUserQuery();
  return (
    <nav className={styles.navBar}>
      <ul>
        <li><Link className={styles.title} to="/">UrbanHashmap</Link></li>
        {!isLoadingUser && <>
          <li><Link to="/define">Define a Word</Link></li>
          <li>{user != null
            ? <a href="/logout/">Log out from {user.name}</a>
            : <a href="/login/">Log In</a>}
          </li>
        </>}
      </ul>
    </nav>
  )
}
