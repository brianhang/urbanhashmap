import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { AppUserProvider } from './contexts/appUserContext';
import HomePage from './pages/HomePage';
import NavBar from './components/page/NavBar';
import NotFoundPage from './pages/NotFoundPage';
import SearchBar from './components/page/SearchBar';

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
        <Router>
          <NavBar />
          <SearchBar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </AppUserProvider>
    </div>
  );
}

export default App;
