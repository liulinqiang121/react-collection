//好了接下来我们直接路由
//打开demo文件下的src文件夹，直接修改 App.js 
import React from 'react'
import axios from 'axios'
import Login from '../login'
import {BrowserRouter as Router,Route,Link,NavLink,Prompt,Switch} from 'react-router-dom'//导入的方式跟之前有点变化
const One = () => (
    <div>
        <h2>首页</h2>
    </div>
)

const Two = () => (
    <div>
        <h2>我是第二页</h2>
    </div>
)

const Lists = ({ match }) => (
    <div>
        <h3>{match.params.ListsId}</h3>
    </div>
)

const List = ({ match }) => (
    <div>
        <h2>我是一个列表</h2>
        <ul>
            <li>
                <Link to={`${match.url}/我是第一个哈哈`}>
                    列表下边的第一个
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/我是第二个呵呵`}>
                    列表下边的第二个
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/我是第三个嘿嘿`}>
                    列表下边的第三个
                </Link>
            </li>
        </ul>
        <Route path={`${match.url}/:ListsId`} component={Lists}/>
        <Route exact path={match.url} render={() => (
            <h3>点击上边的列表项此处显示与url地址一样的...</h3>
        )}/>
    </div>
)
// const callbacks = (data) => {
//   console.log("callback consoled");
// }

// const getConfirmation = (message, callback) => {
//   console.log('heyyy');
// const allowTransition = window.confirm(message)
//   callbacks(allowTransition)
// }

const RouterList = () => (
    <switch>
    <Router>
      <Route path='/login' exact component={Login} />
    </Router>
    { <Router  keyLength={12} forceRefresh={false}>
        <div>
            <NavLink to="/abord" activeStyle={{color: 'green'}}>首页</NavLink>
            <br/>
            <NavLink to="/two">第二页</NavLink>
            <br/>
            <NavLink to="/Lists">一个列表</NavLink>
            <br/>
            <Route exact path="/abord" component={One} />
            <Route path="/two" component={Two}/>
            <Route path="/Lists" component={List}/>
        </div>
    </Router>}
    </switch>
)
export default RouterList