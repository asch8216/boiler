import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class Root extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <div>{/* <Link to="/aircrafts">Aircrafts</Link> */}</div>
        {/* <Route exact path="/aircrafts" component={ConnectedAircrafts} /> */}
      </div>
    );
  }
}
