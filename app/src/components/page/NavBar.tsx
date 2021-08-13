import './NavBar.css';

import { Link } from 'react-router-dom';
import { useAppUser } from '../../contexts/appUserContext';

interface Props { }

export default function NavBar(_props: Props) {
  const user = useAppUser();
  return (
    <nav className="nav-bar">
      <ul>
        <li><Link className="nav-title" to="/">UrbanHashmap</Link></li>
        <li><Link to="/define">Define a Word</Link></li>
        <li>{user != null
          ? <a href="/logout/">Log out from {user.name}</a>
          : <a href="/login/">Log In</a>}
        </li>
      </ul>
    </nav>
  )
}
