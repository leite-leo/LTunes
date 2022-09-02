import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    artist: '',
    albumName: '',
    tracks: [],
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.responseFromGetMusics(id);
  }

  async responseFromGetMusics(id) {
    const data = await getMusics(id);
    console.log('antes do splice', data);
    this.setState({
      artist: data[0].artistName,
      albumName: data[0].collectionName,
      tracks: data,
    });
  }

  render() {
    const { artist, albumName, tracks } = this.state;
    console.log('render', tracks);
    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="album-name">{`Collection Name: ${albumName}`}</h3>
        <h5 data-testid="artist-name">{`Artist Name: ${artist}`}</h5>
        {
          tracks.map((track, index) => (
            track.kind === 'song' && <MusicCard
              key={ track.trackName }
              trackName={ track.trackName }
              previewUrl={ track.previewUrl }
              trackNumber={ index }
            />))
        }
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  id: propTypes.string,
}.isRequired;
