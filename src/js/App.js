import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';

import Home from './components/Home';
import Signup from './components/Signup';
import Game from './components/Game';

render((
  <Router history={hashHistory}>
    <Route path='/' component={Home} />
    <Route path='/signup' component={Signup} />
    <Route path='/app' component={Game} />
    <Route path="*" component={Home} />
  </Router>
), document.getElementById('app'));
