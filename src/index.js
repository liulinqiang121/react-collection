
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, Link, Switch } from 'react-router';
import {
  HashRouter,
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import RouterList from './router/index'
import LoginApp from './components/login/login'
import Message from './components/message'
ReactDOM.render(
  <HashRouter> 
      <div>
        <Route exact path="/" component={LoginApp} />
        <Route path="/message" component={Message} />
     </div>
  </HashRouter>,
  document.getElementById('app')
);