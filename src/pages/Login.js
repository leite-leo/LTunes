import React from 'react';
import propTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    isDisabled: true,
    name: '',
    loading: false,
  };

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.checkInput);
  };

  checkInput = () => {
    const { name } = this.state;
    const min = 3;
    this.setState({ isDisabled: name.length < min });
  };

  handleClick = async () => {
    const { name } = this.state;
    const { history } = this.props;
    console.log(history);
    this.setState({
      name,
      loading: true });
    await createUser({ name });
    this.setState({ loading: false });
    history.push('/search');
  };

  render() {
    const { isDisabled, name, loading } = this.state;
    return (
      loading ? <Loading /> : (
        <div data-testid="page-login">
          <h1>Login</h1>
          <form>
            <label htmlFor="name">
              Nome
              <input
                type="text"
                data-testid="login-name-input"
                name="name"
                id="name"
                value={ name }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ isDisabled }
              onClick={ () => this.handleClick() }
            >
              Entrar
            </button>
          </form>
        </div>
      )
    );
  }
}

export default Login;

Login.propTypes = {
  history: propTypes.func.isRequired,
};
