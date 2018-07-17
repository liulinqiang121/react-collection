
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter,Route,Link,Switch,Redirect} from 'react-router-dom';
import MessageCM from '../components/message'
// 登录
import LoginCM from '../components/login/login';
// 主页
import MainCM from '../components/main'
// 头部
import HeadCM from '../components/head'
// 主题
import ContentCM from '../components/content'
// 案件
import CaseCM from '../components/case'
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
              <Route path="/case" component={CaseCM} />
              <Redirect path="/" exact replace to='/index' />
            </Switch>   
        </RouterList>
        </div>
      </HashRouter>
  )
  export default RouterLists
