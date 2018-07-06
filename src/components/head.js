import React,{Component} from 'react'
require('../styles/head.scss')
class HeadComponent extends Component {
    constructor(){
      super();
    }
    render () {
      return (
        <header className='my-head'>
          <div className='hd-left'>
            <img src="../images/logo.png" className="logo" /> 
          </div>
          <div className='hd-right'>
           
          </div>
          <div>
            {/* {this.props.children} */}
          </div>
        </header>
      )
    }
}
export default HeadComponent