import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getUser } from '../services/userAPI';
import { getFavoriteSongs,
  removeSong, simulateRequest } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    artist: '',
    albumName: '',
    albumImage: '',
    tracks: [],
    loading: false,
  };

  componentDidMount() {
    this.setState(
      async (prevState) => {
        const { match: { params: { id } } } = this.props;
        const user = await getUser();
        this.setState({
          ...prevState,
          [user.name]: user,
          userName: user.name,
          description: user.description,
          email: user.email,
          image: user.image,
          favorites: user.favoriteSongs,
        });
        this.responseFromGetMusics(id);
        this.recoverFavoriteSongs();
      },
    );
  }

  addFavorite = (id) => {
    this.setState(
      (prevState) => {
        const favoritedTrack = prevState.tracks.find((track) => track.trackId === id);
        const updatedFavorites = [...prevState.favorites, favoritedTrack];
        const userData = {
          name: prevState.userName,
          email: prevState.email,
          image: prevState.image,
          description: prevState.description,
          favoriteSongs: updatedFavorites,
        };
        localStorage.setItem(prevState.userName, JSON.stringify(userData));
        return { favorites: updatedFavorites };
      },
      () => {
        simulateRequest('OK')();
      },
    );
  };

  removeFavorite = async (track) => {
    await removeSong(track);
    this.setState(
      (prevState) => {
        const updatedFavorites = prevState.favorites
          .filter((song) => song.trackId !== track.trackId);
        const userData = {
          name: prevState.userName,
          email: prevState.email,
          image: prevState.image,
          description: prevState.description,
          favoriteSongs: updatedFavorites,
        };
        localStorage.setItem(prevState.userName, JSON.stringify(userData));
        return { favorites: updatedFavorites };
      },
      () => {
        // Após o setState ser concluído com sucesso, chame recoverFavoriteSongs
        this.recoverFavoriteSongs();
      },
    );
  };

  async responseFromGetMusics(id) {
    const data = await getMusics(id);
    this.setState({
      artist: data[0].artistName,
      albumName: data[0].collectionName,
      tracks: data,
      albumImage: data[0].artworkUrl100,
      loading: false,
    });
  }

  async recoverFavoriteSongs() {
    const { favorites } = this.state;
    this.setState({ loading: true });
    if (favorites !== undefined) {
      const favoriteds = await getFavoriteSongs();
      this.setState({
        favorites: [...favoriteds],
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { artist, albumName, albumImage, tracks, loading, favorites } = this.state;
    let fav = false;
    return (
      <div data-testid="page-album">
        <section className="album-header-container">
          <Header />
          <br />
          <br />
          <div className="album-info-container">
            <img src={ albumImage } alt={ albumName.collectionName } />
            <br />
            <br />
            <div className="album-infos">
              <h3 data-testid="album-name">{`  Álbum: ${albumName}`}</h3>
              <h5 data-testid="artist-name">{`  Artista: ${artist}`}</h5>
            </div>
          </div>
        </section>
        <section className="album-musics">
          {
            !loading ? (
              tracks.map((track) => (
                track.kind === 'song' && <MusicCard
                  key={ track.trackName }
                  trackName={ track.trackName }
                  previewUrl={ track.previewUrl }
                  trackId={ track.trackId }
                  checked={ favorites.some((song) => song.trackId === track.trackId) }
                  onChange={ () => {
                    fav = favorites.some((element) => element.trackId === track.trackId);
                    if (fav) {
                      return this.removeFavorite(track);
                    }
                    return this.addFavorite(track.trackId);
                  } }
                />))) : <Loading />
          }
        </section>
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  id: propTypes.string,
}.isRequired;
