import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    user: [],
  };

  componentDidMount() {
    this.callGetUser();
  }

  async callGetUser() {
    const user = await getUser();
    this.setState({
      user,
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/profile/edit');
  };

  render() {
    const { user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <section className="login-page mt-md-5">
          <h2>Perfil</h2>
          <img src={ user.image } alt="foto de perfil" width="75px" height="75px" className="profile-image" />
          <h3 className="mb-2 mr-sm-2">
            { user.name }
          </h3>
          <h3 className="mb-2 mr-sm-2">
            { user.email }
          </h3>
          <h3 className="mb-2 mr-sm-2">
            { user.description }
          </h3>
          <button
            type="button"
            className="btn btn-outline-primary"
            data-testid="login-submit-button"
            onClick={ () => this.handleClick() }
          >
            Editar Perfil
          </button>
        </section>
      </div>
    );
  }
}

export default Profile;
