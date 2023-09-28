import React from 'react';
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
    artistName: '',
  };

  async handleClick() {
    const { artist } = this.state;
    this.setState({
      loading: true,
      artistName: artist,
    });
    const data = await searchAlbumsAPI(artist);
    this.setState({
      artist: '',
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

  handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleClick(event.target);
    }
  };

  checkInput = () => {
    const { artist } = this.state;
    const min = 2;
    this.setState({ isDisabled: artist.length < min });
  };

  render() {
    const { artist, isDisabled, albuns, loading, showResult, artistName } = this.state;
    return (
      <div data-testid="page-search" className="search-section">
        <section className="search-header-container">
          <Header />
          {loading ? <Loading /> : (
            <div className="search-form mt-md-5">
              <img src="https://iili.io/HLWQofs.jpg" className="login-img" alt="logotipo" />
              <br />
              <br />
              <form className="d-flex flex-column">
                <h5>Pesquise por um artista ou banda:</h5>
                <label htmlFor="name" className="">
                  <input
                    type="text"
                    className="form-control mb-2 mr-sm-2"
                    placeholder=""
                    aria-label="artist"
                    aria-describedby="inputGroup-sizing-default"
                    data-testid="search-artist-input"
                    name="artist"
                    id="artist"
                    value={ artist }
                    onChange={ this.onInputChange }
                    onKeyDown={ this.handleEnterPress }
                  />
                </label>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-testid="search-artist-button"
                  disabled={ isDisabled }
                  onClick={ () => this.handleClick() }
                >
                  Pesquisar
                </button>
              </form>
            </div>
          )}
        </section>
        <section className="albuns">
          { showResult
            && (
              <h2>
                {` ${artistName}`}
              </h2>)}
          <section className="albun-card-section">
            {albuns.length > 0 ? (albuns.map((album, index) => (
              <a
                key={ index }
                className="album-card"
                href={ `/album/${album.collectionId}` }
              >
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <div className="intra-card">
                  <h5>{album.collectionName}</h5>
                  <h6>{album.artistName}</h6>
                </div>
              </a>
            )))
              : null}
          </section>
        </section>
      </div>
    );
  }
}

export default Search;
