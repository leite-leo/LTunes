import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import 'bootstrap/dist/css/bootstrap.css';

class ProfileEdit extends React.Component {
  state = {
    user: [],
    name: '',
    email: '',
    description: '',
    favoriteSongs: [],
    image: '',
    isDisabled: true,
  };

  componentDidMount() {
    this.callGetUser();
  }

  async handleClick() {
    const { user } = this.state;
    const { history } = this.props;
    await updateUser(user);
    history.push('/profile');
  }

  onInputChange = ({ target }) => {
    const { name, email, description, image, favoriteSongs } = this.state;
    const obj = {
      name,
      email,
      image,
      description,
      favoriteSongs,
    };
    this.setState({
      [target.name]: target.value,
      user: obj,
    }, this.checkInput);
  };

  checkInput = () => {
    const { name, email, description, image } = this.state;
    const min = 1;
    if (image.length >= min
      && name.length >= min
      && email.length >= min
      && description.length >= min) {
      this.setState({ isDisabled: false });
    }
  };

  async callGetUser() {
    const user = await getUser();
    this.setState({
      user,
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
      favoriteSongs: user.favoriteSongs,
    });
    console.log(user);
  }

  render() {
    const { isDisabled, image, name, email, description } = this.state;
    return (
      <div data-testid="page-profile-edit" className="login-page mt-md-5">
        <Header />
        <h3 className="login-page mt-md-5">Editar perfil</h3>
        <form className="d-flex flex-column">
          <div className="d-flex flex-column align-items-center">
            <img src={ image } alt="foto de perfil" width="75px" height="75px" className="profile-image" />
            <label htmlFor="image">
              Foto:
              <input
                type="text"
                className="form-control mb-2 mr-sm-2"
                aria-describedby="inputGroup-sizing-default"
                data-testid="edit-input-image"
                name="image"
                id="image"
                value={ image }
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                className="form-control mb-2 mr-sm-2"
                aria-describedby="inputGroup-sizing-default"
                data-testid="edit-input-name"
                name="name"
                id="name"
                value={ name }
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                className="form-control mb-2 mr-sm-2"
                aria-describedby="inputGroup-sizing-default"
                data-testid="edit-input-email"
                name="email"
                id="email"
                value={ email }
                onChange={ this.onInputChange }
              />
            </label>
          </div>
          <label htmlFor="description">
            Descrição:
            <textarea
              type="text"
              className="form-control mb-3 mr-sm-3"
              aria-describedby="inputGroup-sizing-default"
              data-testid="edit-input-description"
              name="description"
              id="description"
              value={ description }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            className="btn btn-outline-primary"
            data-testid="edit-button-save"
            disabled={ isDisabled }
            onClick={ () => this.handleClick() }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
