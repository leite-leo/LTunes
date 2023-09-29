import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import Navbar from './Navbar'; // Subcomponente para a barra de navegação

class Header extends React.Component {
  state = {
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    await getUser();
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    return (
      loading ? (
        <Loading />
      ) : (
        <div>
          <header data-testid="header-component">
            <Navbar />
          </header>
        </div>
      )
    );
  }
}

export default Header;
