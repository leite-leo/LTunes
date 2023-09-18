import React from 'react';
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
            <header data-testid="header-component">
              <nav className="navbar navbar-expand-lg background-color: #e3f2fd">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div
                  className="collapse navbar-collapse d-flex justify-content-around"
                  id="navbarNav"
                >
                  <ul className="navbar-nav nav-underline d-flex justify-content-evenly">
                    <li className="nav-item active">
                      <a className="nav-link fs-4" href="/search">Pesquisa</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link fs-4" href="/favorites">Favoritas</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link fs-4" href="/profile">Perfil</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link fs-4" href="/">Sair</a>
                    </li>
                  </ul>
                </div>
              </nav>
              {/* <h5 data-testid="header-user-name">{ name }</h5> */}
            </header>
          </div>)
    );
  }
}

export default Header;
