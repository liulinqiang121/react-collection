
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
require('antd/dist/antd.css')
require('./styles/App.css')
require('./styles/iconfont1/iconfont.css')
import {
  HashRouter,
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import RouterLists from './router/index'
import LoginApp from './components/login/login'
import Message from './components/message'
import { Divider } from 'antd';
// ReactDOM.render(
//   <HashRouter> 
//       <div className="appWrap">
//         <Route exact path="/" component={LoginApp} />
//         <Route path="/message" component={Message} />
//      </div>
//   </HashRouter>,
//   document.getElementById('app')
// );

ReactDOM.render(
  <div className="appWrap">
    {RouterLists}
  </div>,
  document.getElementById('app')
);
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { Input } from 'antd';

// ReactDOM.render(<Input placeholder="Basic usage" defaultValue="llq" />,document.getElementById('app'));