
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, Link, Switch } from 'react-router';
import {
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import LoginApp from '../components/login/login'
import Message from '../components/message'

class RouterList extends Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/">Login</Link></li>
          <li><Link to="/message">Message</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}
const RouterLists = (
    <BrowserRouter> 
      <RouterList>
          <div>
          <Switch>
            <Route exact path="/" component={LoginApp} />
            <Route path="/message" component={Message} />
         </Switch>
         </div>
      </RouterList>
    </BrowserRouter>
)
export default RouterList