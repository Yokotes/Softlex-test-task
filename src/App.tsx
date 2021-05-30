import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './containers/HomePage/HomePage';
import { Provider } from 'react-redux';
import store from './models/store';
import LoginPage from './containers/LoginPage/LoginPage';
import TaskModal from './modals/TaskModal/TaskModal';
import Copyright from './components/Copyright/Copyright';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
          </Switch>
          <TaskModal />
          <Copyright />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;