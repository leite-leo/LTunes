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
          <div>
            <h5>{ name }</h5>
            <header data-testid="header-component">
              <nav className="header">
                <ul className="header-ul">
                  <Link to="/search" data-testid="link-to-search">
                    <li className="header-li">Pesquisa</li>
                  </Link>
                  <Link to="/favorites" data-testid="link-to-favorites">
                    <li className="header-li">Favoritas</li>
                  </Link>
                  <Link to="/profile" data-testid="link-to-profile">
                    <li className="header-li">Perfil</li>
                  </Link>
                </ul>
              </nav>
            </header>
          </div>)
    );
  }
}

export default Header;
