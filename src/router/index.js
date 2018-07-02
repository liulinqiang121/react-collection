//好了接下来我们直接路由
//打开demo文件下的src文件夹，直接修改 App.js 
import React from 'react'
import axios from 'axios'
import Login from '../components/login'
import App from './components/Main';
import Manage from './components/managePage'
import {BrowserRouter as Router,Route,Link,NavLink,Prompt,Switch} from 'react-router-dom'//导入的方式跟之前有点变化
function RouterList () {
    return 
  <Router>  
    <div>  
        <Route exact path="/login" component={App}/>  
        <Route path="/manage" component={Manage}/>  
    </div>  
</Router>
}
export default RouterList