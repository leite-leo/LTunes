import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  state = {
    name: '',
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { name } = await getUser();
    this.setState(
      { name,
        loading: false,
      },
    );
  }

  render() {
    const { name, loading } = this.state;
    return (
      loading ? <Loading />
        : (
          <header data-testid="header-component">
            <h5 data-testid="header-user-name">{ name }</h5>
            <nav>
              <ul>
                <Link to="/search" data-testid="link-to-search">
                  <li>Search</li>
                </Link>
                <Link to="/favorites" data-testid="link-to-favorites">
                  <li>Favorites</li>
                </Link>
                <Link to="/profile" data-testid="link-to-profile">
                  <li>Profile</li>
                </Link>
              </ul>
            </nav>
          </header>)
    );
  }
}

export default Header;
