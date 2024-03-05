import React from 'react';

class Navbar extends React.Component {
  state = {
    isOpen: false,
  };

  toggleMenu = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { isOpen } = this.state;

    return (
      <nav className="navbar">
        <button
          className="navbar-toggler"
          type="button"
          onClick={ this.toggleMenu }
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className={ `navbar-collapse d-flex justify-content-around ${
            isOpen ? 'flex' : ''
          }` }
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
    );
  }
}

export default Navbar;
