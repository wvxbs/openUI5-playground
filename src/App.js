import React, { Component } from 'react';
import logo from './logo.svg';
import './index.css';
import List from './content/List';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <List />
          <List />
          <List />
        </div>
      </div>
    );
  }
}

export default App;
