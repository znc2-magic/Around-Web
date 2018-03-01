import React from 'react';
import {POS_KEY} from '../constants';
import {AroundMarker} from './AroundMarker';

import {withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps';

class AroundMap extends React.Component {


  render() {
    const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));

    return(
      <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: lat, lng: lon }}
      >
        {
          this.props.posts.map((post) =>
            <AroundMarker post={post} key={post.url}/>
            // {/*<Marker*/}
            //   {/*position={{ lat: post.location.lat, lng: post.location.lon }}*/}
            //   {/*onClick={this.onToggleOpen}*/}
            //   {/*key={post.url}*/}
            // {/*>*/}
            //   {/*{this.state.isOpen ? <InfoWindow onCloseClick={this.onToggleOpen}>*/}
            //     {/*<div>{post.message}</div>*/}
            //   {/*</InfoWindow> : null}*/}
            // {/*</Marker>*/}
          )
        }
      </GoogleMap>
    );
  }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));