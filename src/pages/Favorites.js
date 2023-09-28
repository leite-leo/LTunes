import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  state = {
    loading: false,
    favorites: [],
  };

  componentDidMount() {
    this.recoverFavoriteSongs();
  }

  async recoverFavoriteSongs() {
    this.setState({ loading: true });
    const favoriteds = await getFavoriteSongs();
    console.log('favoriteds222::', favoriteds);
    this.setState({
      loading: false,
      favorites: favoriteds,
    });
  }

  async removeFavorite(id) {
    const user = await getUser();
    const { favorites } = this.state;
    const updatedFavorites = favorites.filter((track) => track.trackId !== id);
    const userData = {
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
      favoriteSongs: updatedFavorites,
    };
    localStorage.setItem(user.name, JSON.stringify(userData));
    this.setState({ loading: true });
    await this.recoverFavoriteSongs();
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading, favorites } = this.state;
    return (
      <div className="favoritas" data-testid="page-favorites">
        <section className="album-header-container">
          <Header />
          <div className="album-info-container">
            <img src="https://iili.io/HLWQofs.jpg" className="login-img" alt="logotipo" />
            <br />
            <br />
            <div className="album-infos">
              <h5>Minhas Músicas Favoritas</h5>
            </div>
          </div>
        </section>
        <section className="favorite-musics">
          {(
            !loading ? (
              favorites.map((track) => (
                <MusicCard
                  key={ track.trackName }
                  trackName={ track.trackName }
                  previewUrl={ track.previewUrl }
                  trackId={ track.trackId }
                  checked={ favorites.some((song) => song.trackId === track.trackId) }
                  onChange={ () => this.removeFavorite(track.trackId) }
                />
              ))
            ) : <Loading />
          )}
        </section>
      </div>
    );
  }
}

export default Favorites;
