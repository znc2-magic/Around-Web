import React from 'react';
import {Marker, InfoWindow} from 'react-google-maps';

export class AroundMarker extends React.Component {
  state = {
    isOpen: false,
  }

  onToggleOpen = () => {
    this.setState((prevState) => ({isOpen: !prevState.isOpen}));
  }

  render() {
    const post = this.props.post;
    const {user, message, location, url} = post;
    const {lat, lon} = location;

    return (
      <Marker
        position={{ lat: lat, lng: lon }}
        onMouseOver={this.onToggleOpen}
        onMouseOut={this.onToggleOpen}
      >
        {this.state.isOpen ? <InfoWindow>
          <div>
            <img className='around-marker-image' src={url} alt={message} />
            <p className='aaa'>{`${user}: ${message}`}</p>
          </div>
        </InfoWindow> : null}
      </Marker>
    )
  }
}