import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    artist: '',
    albumName: '',
    tracks: [],
    loading: false,
    favorites: [],
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.responseFromGetMusics(id);
    this.recoverFavoriteSongs();
  }

  async responseFromGetMusics(id) {
    const data = await getMusics(id);
    this.setState({
      artist: data[0].artistName,
      albumName: data[0].collectionName,
      tracks: data,
    });
  }

  async recoverFavoriteSongs() {
    const { favorites } = this.state;
    this.setState({ loading: true });
    const favoriteds = await getFavoriteSongs();
    console.log('recuperadas do storage', favoriteds);
    this.setState({
      loading: false,
      favorites: [...favoriteds],
    });
    console.log('estado favorites depois do recover do storage', favorites);
  }

  async addFavorite(id) {
    const { tracks, favorites } = this.state;
    const favoritedTrack = tracks.find((track) => track.trackId === id);
    this.setState({ loading: true });
    await addSong(favoritedTrack);
    this.setState({
      loading: false,
      favorites: [...favorites, favoritedTrack],
    });
    console.log('estado favotites depois de adicionar favorita', favorites);
  }

  async removeFavorite(id) {
    const { tracks } = this.state;
    const trackToRemove = tracks.find((track) => track.trackId === id);
    this.setState({ loading: true });
    await removeSong(trackToRemove);
    await this.recoverFavoriteSongs();
    this.setState({
      loading: false,
    });
  }

  render() {
    const { artist, albumName, tracks, loading, favorites } = this.state;
    let fav = false;
    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="album-name">{`Collection Name: ${albumName}`}</h3>
        <h5 data-testid="artist-name">{`Artist Name: ${artist}`}</h5>
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
                  if (favorites.length === 0) {
                    return this.addFavorite(track.trackId);
                  }
                  fav = favorites.some((element) => element.trackId === track.trackId);
                  if (fav) {
                    return this.removeFavorite(track.trackId);
                  }
                  return this.addFavorite(track.trackId);
                } }
              />))) : <Loading />
        }
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  id: propTypes.string,
}.isRequired;
