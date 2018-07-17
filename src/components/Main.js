
import React from 'react';
import { hashHistory } from 'react-router'
import { Row, Col } from 'antd';
import axios from 'axios'
require('../styles/main.scss')
class MainComponent extends React.Component {
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
      <div className="dashboard">
      <div className="content-body main-content">
        <div className="bd-top">
          <div className="md clearfix">
            <div className="md-left">
              <h5>本年度总览</h5>
            </div>
            <div className="md-right">
            </div>
          </div>
        </div>
        <div className="bd-main">
          <Row>
            <Col span={6}>
              <div className="overview-item line">
                <div className="item-left">
                  <i className="iconfont icon-weianjinger home-icon"></i>
                </div>
                <div className="item-right">
                  <p className="right-count color-commitMoney">{this.state.overviewData.yearData == undefined ? '--':this.state.overviewData.yearData.commitMoney}</p>
                  <p className="right-unit">委案金额/万元</p>
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className="overview-item line">
                <div className="item-left">
                  <i className="iconfont icon-huishoujiner home-icon"></i>
                </div>
                <div className="item-right">
                  <p className="right-count color-repayMoney">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.yearData.repayMoney}</p>
                  <p className="right-unit">回收金额/万元</p>
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className="overview-item line">
                <div className="item-left">
                  <i className="iconfont icon-weianshuliang home-icon"></i>
                </div>
                <div className="item-right">
                  <p className="right-count color-commitCount">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.yearData.commitCaseCount}</p>
                  <p className="right-unit">委案数量/件</p>
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className="overview-item">
                <div className="item-left">
                  <i className="iconfont icon-huishoushuliang home-icon"></i>
                </div>
                <div className="item-right">
                  <p className="right-count color-repayCount">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.yearData.repayCaseCount}</p>
                  <p className="right-unit">回收数量/件</p>
                </div>
              </div>
            </Col>
  
          </Row>
        </div>
      </div>
      <div className="content-body main-content">
        <div className="bd-top">
          <div className="md clearfix">
            <div className="md-left">
              <h5>月度回收分析</h5>
            </div>
            <div className="md-right">
            </div>
          </div>
        </div>
        <div className="bd-main">
          <Row>
            <Col span={6}>
              <div className="month-item">
                <p className="item-title">委案金额/万元</p>
                <Row>
                  <Col span={12}>
                    <div className="item-content">
                      <p className="content-title">本月：</p>
                      <p className="content-count color-commitMoney">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.monthData[0].commitMoney}</p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="item-content">
                      <p className="content-title">上月：</p>
                      <p className="content-count color-commitMoney">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.monthData[1].commitMoney}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={6}>
              <div className="month-item">
                <p className="item-title">回收金额/万元</p>
                <Row>
                  <Col span={12}>
                    <div className="item-content">
                      <p className="content-title">本月：</p>
                      <p className="content-count color-repayMoney">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.monthData[0].repayMoney}</p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="item-content">
                      <p className="content-title">上月：</p>
                      <p className="content-count color-repayMoney">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.monthData[1].repayMoney}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={6}>
              <div className="month-item">
                <p className="item-title">委案数量</p>
                <Row>
                  <Col span={12}>
                    <div className="item-content">
                      <p className="content-title">本月：</p>
                      <p className="content-count color-commitCount">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.monthData[0].commitCaseCount}</p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="item-content">
                      <p className="content-title">上月：</p>
                      <p className="content-count color-commitCount">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.monthData[1].commitCaseCount}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={6}>
              <div className="month-item">
                <p className="item-title">回收数量</p>
                <Row>
                  <Col span={12}>
                    <div className="item-content">
                      <p className="content-title">本月：</p>
                      <p className="content-count color-repayCount">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.monthData[0].repayCaseCount}</p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="item-content">
                      <p className="content-title">上月：</p>
                      <p className="content-count color-repayCount">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.monthData[1].repayCaseCount}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="content-body main-content">
        <div className="bd-top">
          <div className="md clearfix">
            <div className="md-left">
              <h5>季度回收分析</h5>
            </div>
            <div className="md-right">
            </div>
          </div>
        </div>
        <div className="bd-main">
          <Row>
            <Col span={6}>
              <div className="month-item">
                <p className="item-title">委案金额/万元</p>
                <Row>
                  <Col span={12}>
                    <div className="item-content">
                      <p className="content-title">本季度：</p>
                      <p className="content-count color-commitMoney">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.quarterData[0].commitMoney}</p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="item-content">
                      <p className="content-title">上季度：</p>
                      <p className="content-count color-commitMoney">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.quarterData[1].commitMoney}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={6}>
              <div className="month-item">
                <p className="item-title">回收金额/万元</p>
                <Row>
                  <Col span={12}>
                    <div className="item-content">
                      <p className="content-title">本季度：</p>
                      <p className="content-count color-repayMoney">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.quarterData[0].repayMoney}</p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="item-content">
                      <p className="content-title">上季度：</p>
                      <p className="content-count color-repayMoney">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.quarterData[1].repayMoney}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={6}>
              <div className="month-item">
                <p className="item-title">委案数量</p>
                <Row>
                  <Col span={12}>
                    <div className="item-content">
                      <p className="content-title">本季度：</p>
                      <p className="content-count color-commitCount">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.quarterData[0].commitCaseCount}</p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="item-content">
                      <p className="content-title">上季度：</p>
                      <p className="content-count color-commitCount">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.quarterData[1].commitCaseCount}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={6}>
              <div className="month-item">
                <p className="item-title">回收数量</p>
                <Row>
                  <Col span={12}>
                    <div className="item-content">
                      <p className="content-title">本季度：</p>
                      <p className="content-count color-repayCount">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.quarterData[0].repayCaseCount}</p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="item-content">
                      <p className="content-title">上季度：</p>
                      <p className="content-count color-repayCount">{this.state.overviewData.yearData == undefined?'--':this.state.overviewData.quarterData[1].repayCaseCount}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
  
  
          </Row>
        </div>
      </div>
    </div>
    );
  }
}
export default MainComponent
