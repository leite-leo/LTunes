import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes</p>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/search" render={ (props) => <Search { ...props } /> } />
            <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
            <Route
              exact
              path="/favorites"
              render={ (props) => (
                <Favorites { ...props } />
              ) }
            />
            <Profile exact path="/profile" Component={ Profile } />
            <ProfileEdit exact path="/profile/edit" Component={ ProfileEdit } />
            <NotFound exact path="*" Component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
