import React, { Component }from 'react';
import PropTypes from 'prop-types';
import GridGallery from 'react-grid-gallery';

export class Gallery extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        srcset: PropTypes.array,
        caption: PropTypes.string,
        thumbnailWidth: PropTypes.number.isRequired,
        thumbnailHeight: PropTypes.number.isRequired
      })
    ).isRequired
  }

  render() {
    const images = this.props.images.map((image) => {
      return {
        ...image,
        customOverlay: (
          <div className='caption-style'>
            <div>{`${image.user}: ${image.caption}`}</div>
          </div>
        ),
      };
    });

    return (
      <div className='wrapper-style'>
        <GridGallery
          backdropClosesModal
          images={images}
          enableImageSelection={false}/>
      </div>
    );
  }
}


