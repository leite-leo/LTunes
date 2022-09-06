import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  state = {
    loading: false,
    user: [],
  };

  componentDidMount() {
    this.callGetUser();
  }

  async callGetUser() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      user,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          !loading ? (
            <section className="profile-section">
              <h1>Perfil</h1>
              <img src={ user.image } alt="foto" data-testid="profile-image" />
              <h2>
                { user.name }
              </h2>
              <h3>
                { user.email }
              </h3>
              <h3>
                { user.description }
              </h3>
              <Link to="/profile/edit">Editar perfil</Link>
            </section>
          ) : <Loading />
        }
      </div>
    );
  }
}

export default Profile;
