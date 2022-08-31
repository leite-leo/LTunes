import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artist: '',
    isDisabled: true,
  };

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.checkInput);
  };

  checkInput = () => {
    const { artist } = this.state;
    const min = 2;
    this.setState({ isDisabled: artist.length < min });
  };

  render() {
    const { artist, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <h1>Search</h1>
        <Header />
        <form>
          <label htmlFor="artist">
            Nome do Artista
            <input
              type="text"
              data-testid="search-artist-input"
              name="artist"
              id="artist"
              value={ artist }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isDisabled }
            onClick={ () => this.onInputChange() }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
