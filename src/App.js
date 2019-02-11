import React, { Component } from 'react'
import './App.css'

import HomeComponent from './components/HomeComponent';
import CheckOutComponent from './components/CheckOutComponent';

import { HashRouter, Route, Switch} from 'react-router-dom';

import '../node_modules/@fortawesome/fontawesome-free/css/all.css'

class App extends Component {
  render() {
    
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/cart' component={CheckOutComponent}/>
          <Route exact path='/' component={HomeComponent}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App
