import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import {GEO_OPTIONS} from '../constants';

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

  onSuccessfulLoadGeoLocation = (position) => {
    console.log(position);
    this.setState({
      loadingGeoLocation: false,
      error: '',
    });
  }

  onFailedLoadGeoLocation = () => {
    this.setState({
      loadingGeoLocation: false,
      error: 'Failed to load geolocation',
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