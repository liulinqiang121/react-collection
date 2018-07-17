/**
 * created by liulinqinag 03/07/2018
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// 引入样式和阿里巴巴的图标
require('antd/dist/antd.css')
require('./styles/iconfont1/iconfont.css')
require('./styles/App.scss')
// 使用react-router-dom 
import {
  HashRouter,
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';
// 引入组件
import RouterLists from './router/index'
import LoginApp from './components/login/login'
import Message from './components/message'
import { Divider } from 'antd';
ReactDOM.render(
  <div className="appWrap">
    {RouterLists}
  </div>,
  document.getElementById('app')
)
