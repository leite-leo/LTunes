import React from 'react';
import { Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes</p>
        <Switch>
          <Login exact path="/" Component={ Login } />
          <Search exact path="/search" Component={ Search } />
          <Album exact path="/album/:id" Component={ Album } />
          <Favorites exact path="/favorites" Component={ Favorites } />
          <Profile exact path="/profile" Component={ Profile } />
          <ProfileEdit exact path="/profile/edit" Component={ ProfileEdit } />
          <NotFound exact path="*" Component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
