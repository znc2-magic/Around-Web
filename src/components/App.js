import React from 'react';
import {Header} from './Header';
import {Main} from './Main';
import '../styles/App.css';

class App extends React.Component {
  state = {
    isLoggedIn: false,
  }

  loginHandler = () => {
    this.setState({
      isLoggedIn: true,
    });
  }

  LogoutHandler = () => {
    this.setState({
      isLoggedIn: false,
    });
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Main isLoggedIn={this.state.isLoggedIn} loginHandler={this.loginHandler}/>
      </div>
    );
  }
}

export default App;
