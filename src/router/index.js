import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import MessageCM from "../components/message";
// 登录
import LoginCM from "../components/login/login";
// 主页
import MainCM from "../components/main";
// 头部
import HeadCM from "../components/head";
// 主题
import ContentCM from "../components/content";
// 案件
import CaseCM from "../components/case/case";
// 还款
import RepayCM from "../components/repay/repayList";
// 报表
import BiPortCM from "../components/bi-repot/bi-report";
// 用户列表
import UserCM from "../components/user/user";
import { Provider, connect } from "react-redux";
import store from "../redux/store";
require("../styles/head.scss");
class RouterList extends Component {
  render() {
    return (    
      <Provider store = {store}>
        <div>
        <div>
          <HeadCM store = {store} />
          <div>
            <div className="my-body">
              <ContentCM  />
              <section className="my-content">{this.props.children}</section>
            </div>
          </div>
        </div>
        </div>
      </Provider>
    );
  }
}
const RouterLists = (
  <HashRouter>
    <div className="appWrap">
      <RouterList>
      <Switch>
          <Route exact path="/login" component={LoginCM} />
        </Switch>
        <Switch>
          <Route path="/index" component={MainCM} />
          <Route path="/message" component={MessageCM} />
          <Route path="/case" component={CaseCM} />
          <Route path="/repay" component={RepayCM} />
          <Route path="/bi-report" component={BiPortCM} />
          <Route path="/user" component={UserCM} />
          <Redirect path="/" exact replace to="/index" />
        </Switch>
      </RouterList>
    </div>
  </HashRouter>
);
export default RouterLists;
