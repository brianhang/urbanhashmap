import './App.css';

import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGreeting() {
      const greeting = await fetch('/greeting');
      setGreeting(await greeting.text());
    }
    fetchGreeting();
  }, [setGreeting]);

  return (
    <div className="App">
      <p>{greeting ?? 'Loading...'}</p>
    </div>
  );
}

export default App;
