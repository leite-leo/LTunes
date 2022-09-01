import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    artist: '',
    isDisabled: true,
    loading: false,
    albuns: [],
    showResult: false,
  };

  async handleClick() {
    const { artist } = this.state;
    this.setState({
      loading: true,
    });
    console.log(artist);
    const data = await searchAlbumsAPI(artist);
    console.log(data);
    this.setState({
      loading: false,
      albuns: data,
      showResult: true,
    });
  }

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
    const { artist, isDisabled, albuns, loading, showResult } = this.state;
    return (
      <div data-testid="page-search">
        <h1>Search</h1>
        <Header />
        {loading ? <Loading /> : (
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
              type="button"
              data-testid="search-artist-button"
              disabled={ isDisabled }
              onClick={ () => this.handleClick() }
            >
              Pesquisar
            </button>
          </form>
        )}
        <section className="albuns">
          { showResult
            && (
              <h2>
                Resultado de álbuns de:
                {` ${artist}`}
              </h2>)}
          <section className="albun-card-section">
            {albuns.length > 0 ? (albuns.map((album) => (
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
                key={ album.collectionId }
              >
                <div className="album-card">
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  <h4>{ album.collectionName }</h4>
                  <h6>{ album.artistName }</h6>
                </div>
              </Link>
            )))
              : <h3>Nenhum álbum foi encontrado</h3>}
          </section>
        </section>
      </div>
    );
  }
}

export default Search;
