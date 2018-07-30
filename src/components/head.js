import React,{Component} from 'react'
import {Button,Icon,Avatar,Divider  } from 'antd'
import axios from 'axios'
import { isAbsolute } from "path";
//import Redux from '../redux/redux'
import {createStore} from 'redux'
import {Provider,connect} from 'react-redux'
import store from '../redux/store'
require('../styles/head.scss')
class HeadComponent extends Component {
    constructor(){
      super();
      this.state = {
        text: '退出',
        color: '#7265e6',
        username: ''
      }
    }
    componentWillMount = () =>{
     store.subscribe( () => {
      let state = store.getState();
      let username = state.username
      this.setState({'username': username});
     })

    }
    componentDidUpdate = () => {
     // console.log(this.state.username)
    }
    logout = (e) => {
      e.preventDefault();
      axios.post("/user/logout",{}).then((res) =>{
        if(res.data.code == 0){
            localStorage.removeItem('username');
            this.context.router.history.push("/login");
        }else{
            message.error('系统异常')
        }
      })
    }
    render () {
      return (
        <header className='my-head'>
          <div className='hd-left'>
            <img src="../images/logo.png" className="logo" /> 
          </div>
          <div className='hd-right'  >
          <Avatar icon="user"  style={{ backgroundColor: this.state.color,display:'inline-block'}} />
          &nbsp;{this.state.username}
          <Divider  type="vertical" />
           <Icon type="logout" size="small" onClick={this.logout} />
          </div>
        </header>
      )
    }
}
HeadComponent.contextTypes = {
  router: React.PropTypes.object
}


export default HeadComponent