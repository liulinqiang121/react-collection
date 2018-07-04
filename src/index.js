
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
require('antd/dist/antd.css')
require('./styles/App.css')
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
      <div className="appWrap">
        <Route exact path="/" component={LoginApp} />
        <Route path="/message" component={Message} />
     </div>
  </HashRouter>,
  document.getElementById('app')
);


// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { Input } from 'antd';

// ReactDOM.render(<Input placeholder="Basic usage" defaultValue="llq" />,document.getElementById('app'));