import './App.css';

import { useEffect } from 'react';
import { useState } from 'react';

type AppUser = {
  id: number,
  name: string,
}

function App() {
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const greeting = await fetch('/api/user');
      setUser(await greeting.json());
    }
    fetchUser();
  }, [setUser]);

  return (
    <div className="App">
      {
        user != null
          ? (
            <div>
              <h1>{user.name}</h1>
              <a href="/logout">Logout</a>
            </div>
          )
          : <a href="/login">Login with Facebook</a>
      }
    </div>
  );
}

export default App;
