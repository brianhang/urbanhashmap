import './NavBar.css';

import { useAppUser } from '../../contexts/appUserContext';

interface Props { }

export default function NavBar(_props: Props) {
  const user = useAppUser();
  return (
    <nav className="nav-bar">
      <ul>
        <li><a className="nav-title" href="/">UrbanHashmap</a></li>
        <li>{user != null
          ? <a href="/logout/">Log out from {user.name}</a>
          : <a href="/login/">Log In</a>}
        </li>
      </ul>
    </nav>
  )
}
