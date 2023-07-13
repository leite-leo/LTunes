import React from 'react';
import propTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import 'bootstrap/dist/css/bootstrap.css';

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
        <div data-testid="page-login" className="login-page mt-md-5">
          <img src="https://iili.io/HLdDJrx.png" className="login-img" alt="logotipo" />
          <br />
          <br />
          <form className="d-flex flex-column">
            <label htmlFor="name" className="">
              <input
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Usuário"
                aria-label="Name"
                aria-describedby="inputGroup-sizing-default"
                data-testid="login-name-input"
                name="name"
                id="name"
                value={ name }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              type="button"
              className="btn btn-outline-primary"
              data-testid="login-submit-button"
              disabled={ isDisabled }
              onClick={ () => this.handleClick() }
            >
              Login
            </button>
          </form>
        </div>
      )
    );
  }
}

export default Login;

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
