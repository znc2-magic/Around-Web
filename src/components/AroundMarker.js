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
    return (
      <Marker
        position={{ lat: this.props.post.location.lat, lng: this.props.post.location.lon }}
        onClick={this.onToggleOpen}
        key={this.props.post.url}
      >
        {this.state.isOpen ? <InfoWindow onCloseClick={this.onToggleOpen}>
          <div>{this.props.post.message}</div>
        </InfoWindow> : null}
      </Marker>
    )
  }
}