
import React from 'react';
import { hashHistory } from 'react-router'
import { Row, Col,Button} from 'antd';
import axios from 'axios'
require('../styles/case.scss')
class CaseComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      overviewData: {}
    }
  }
  componentWillMount(){
    let username = localStorage.getItem('username');
    if(!username) {
      props.history.push('/login');
      return false;
    }
    axios.post("/homePage/getBaseData",{}).then((res) =>{
      this.setState({overviewData:res.data})
      this.state.overviewData= res.data;// 这样是起不了作用的,
  })
  }
  render() {
    return (
     <div>
      <div className="content-body">
        <div className="bd-top">
          <div className="md clearfix">
            <div className="md-left">
               <h5>案件管理</h5>
            </div>
            <div className="md-right">
                <Button size="default" type="primary">人工分案</Button>
                <Button size="default" type="primary" >人工调案</Button>
                <Button size="default" type="primary">按搜索批量分案</Button>
            </div>
          </div>
        </div>
        <div className="bd-main">
          
        </div>
      </div>
    </div>
    );
  }
}
export default CaseComponent
