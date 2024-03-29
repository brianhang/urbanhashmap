import styles from './App.module.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import DefineWordPage from './pages/DefineWordPage';
import EditWordPage from './pages/EditWordPage';
import HomePage from './pages/HomePage';
import NavBar from './components/page/NavBar';
import NotFoundPage from './pages/NotFoundPage';
import SearchBar from './components/page/SearchBar';
import Footer from './components/common/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <div className={styles.app}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
      <Footer />
    </div>
  );
}

export default App;
