import React from 'react';
import $ from 'jquery';
import { Tabs, Button, Spin } from 'antd';
import {API_ROOT, GEO_OPTIONS, TOKEN_KEY, POS_KEY, AUTH_PREFIX} from '../constants';

const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;

export class Home extends React.Component {
  state = {
    loadingGeoLocation: false,
    error: '',
  }

  componentDidMount() {
    this.setState( {
      loadingGeoLocation: true,
      error: '',
    });
    this.getGeoLocation();
  }

  getGeoLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        this.onSuccessfulLoadGeoLocation, this.onFailedLoadGeoLocation, GEO_OPTIONS
      );
    } else {
      this.setState({
        error: 'Your browser does not support geolocation!',
      });
    }
  }

  onSuccessfulLoadGeoLocation = (position) => {
    console.log(position);
    this.setState({
      loadingGeoLocation: false,
      error: '',
    });
    const {latitude, longitude} = position.coords;
    localStorage.setItem(POS_KEY, JSON.stringify({lat: latitude, lon: longitude,}));
    this.loadNearbyPosts();
  }

  onFailedLoadGeoLocation = () => {
    this.setState({
      loadingGeoLocation: false,
      error: 'Failed to load geolocation',
    });
  }

  getGalleryPanelContent = () => {
    if (this.state.error) {
      return <div>{this.state.error}</div>
    } else if (this.state.loadingGeoLocation) {
      return <Spin tip="Loading geo location..."/>;
    } else {
      return null;
    }

    //return this.state.loadingGeoLocation ? <span>Loading geo location</span> : null;
  }

  loadNearbyPosts = () => {
    const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
    $.ajax({
      url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20`,
      method: 'GET',
      headers: {
        Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
      },
    }).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
        <Tabs tabBarExtraContent={operations} className="main-tabs">
          <TabPane tab="Posts" key="1">{this.getGalleryPanelContent()}</TabPane>
          <TabPane tab="Map" key="2">Content of tab 2</TabPane>
        </Tabs>
    );
  }
}