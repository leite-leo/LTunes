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
          <header data-testid="header-component">
            <h5 data-testid="header-user-name">{ name }</h5>
          </header>)
    );
  }
}

export default Header;
