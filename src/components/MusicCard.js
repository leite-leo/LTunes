import React from 'react';
import propTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, onChange, checked } = this.props;
    return (
      <div>
        <h4>{ trackName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor="favorite">
          <input
            id="favorite"
            type="checkbox"
            name="favorite"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ onChange }
            checked={ checked }
          />
          Favorita
        </label>
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  trackName: propTypes.string,
  previewUrl: propTypes.string,
  index: propTypes.number,
}.isRequired;
