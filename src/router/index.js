
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter,Route,Link,Switch,Redirect} from 'react-router-dom';
import MessageCM from '../components/message'
import LoginCM from '../components/login/login';
import MainCM from '../components/main'
import HeadCM from '../components/head'
import ContentCM from '../components/content'
require('../styles/head.scss')
class RouterList extends Component {
    render() {
      return (
        <div>
         <HeadCM />
        <div>
        <div className="my-body">
          <ContentCM />
          <section className="my-content">
            {this.props.children}
          </section>
         </div>
        </div>
        </div>
      );
    }
  }
  const RouterLists = (
      <HashRouter>
       <div className="appWrap"> 
        <RouterList>
            <Switch>
              <Route path="/index" component={MainCM} />
              <Route path="/message" component={MessageCM} />
              <Route exact path="/login"  component={LoginCM} />
              <Redirect path="/" exact replace to='/index' />
            </Switch>   
        </RouterList>
        </div>
      </HashRouter>
  )
  export default RouterLists
