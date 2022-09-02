import React from 'react';
import { Route, Switch } from 'react-router-dom';
import propTypes from 'prop-types';
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
    const { id } = this.props;
    return (
      <div>
        <p>TrybeTunes</p>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/search" render={ (props) => <Search { ...props } /> } />
          <Route
            exact
            path="/album/:id"
            render={ (props) => <Album { ...props } id={ id } /> }
          />
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
      </div>
    );
  }
}

export default App;

App.propTypes = {
  id: propTypes.string,
}.isRequired;
