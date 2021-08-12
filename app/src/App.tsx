import './App.css';

import { AppUserProvider } from './contexts/appUserContext';
import NavBar from './components/page/NavBar';
import WordList from './components/word/WordList';

export type AppUser = {
  id: number,
  name: string,
}

export type AppWord = {
  id: number,
  word: string,
  definition: string,
  creatorID: number,
  example?: string,
}

function App() {
  return (
    <div className="app">
      <AppUserProvider fallback={<span>Loading</span>}>
        <NavBar />
        <WordList />
      </AppUserProvider>
    </div>
  );
}

export default App;
