import React from 'react';
import { Route, Switch } from 'react-router-dom';
import propTypes from 'prop-types';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
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
          <Route exact path="/profile" render={ (props) => <Profile { ...props } /> } />
          <Route exact path="/profile/edit" render={ (props) => <ProfileEdit { ...props } /> } />
          <NotFound exact path="*" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;

App.propTypes = {
  id: propTypes.string,
}.isRequired;
