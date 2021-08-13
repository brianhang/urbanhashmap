import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { AppUserProvider } from './contexts/appUserContext';
import DefineWordPage from './pages/DefineWordPage';
import EditWordPage from './pages/EditWordPage';
import HomePage from './pages/HomePage';
import NavBar from './components/page/NavBar';
import NotFoundPage from './pages/NotFoundPage';
import SearchBar from './components/page/SearchBar';

function App() {
  return (
    <div className="app">
      <AppUserProvider fallback={<span>Loading</span>}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/define">
              <DefineWordPage />
            </Route>
            <Route path="/edit/:id">
              <EditWordPage />
            </Route>
            <Route exact path="/">
              <SearchBar />
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
