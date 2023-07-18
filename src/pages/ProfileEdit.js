import React from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  state = {
    user: [],
    name: '',
    email: '',
    description: '',
    image: '',
    loading: false,
    isDisabled: true,
  };

  componentDidMount() {
    this.callGetUser();
  }

  onInputChange = ({ target }) => {
    const { name, email, description, image } = this.state;
    const obj = {
      name,
      email,
      image,
      description,
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
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      user,
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
      loading: false,
    });
    console.log(user);
  }

  async handleClick() {
    const { user } = this.state;
    const { history } = this.props;
    await updateUser(user);
    history.push('/profile');
  }

  render() {
    const { loading, isDisabled, image, name, email, description } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h3>Editar perfil</h3>
        <form>
          <img src={ image } alt="foto de perfil" width="100px" />
          <label htmlFor="image">
            Foto:
            <input
              type="text"
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
              data-testid="edit-input-email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <textarea
              type="text"
              data-testid="edit-input-description"
              name="description"
              id="description"
              value={ description }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
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

export default ProfileEdit;
