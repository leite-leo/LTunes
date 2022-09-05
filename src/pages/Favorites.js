import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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
    this.setState({
      loading: false,
      favorites: [...favoriteds],
    });
  }

  async removeFavorite(id) {
    const { favorites } = this.state;
    const trackToRemove = favorites.find((track) => track.trackId === id);
    this.setState({ loading: true });
    await removeSong(trackToRemove);
    await this.recoverFavoriteSongs();
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading, favorites } = this.state;
    return (
      <div className="favoritas">
        <Header />
        <h5>Musicas Favoritas:</h5>
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
      </div>
    );
  }
}

export default Favorites;
