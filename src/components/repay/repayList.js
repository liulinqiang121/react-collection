/**
 * @LIU LIN QIANG 07/24
 */
import React from "react";
import { hashHistory } from "react-router";
import axios from "axios";
require("../../styles/case.scss");
import SearchForm from "./searchForm";
import CaseTable from "./repayTable";
import { Button, Modal, Form, Input, Radio, Select,Cascader ,message } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};



class RepayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      deparment: ''
    };
  }
  componentWillMount() {}
  // 搜索组件通过父组件调用表格组件的方法
  getList = data => {
    this.refs.table.getList(data);
  };
  // 提交表单
  submit = () => {
    if(!this.state.deparment) {message.warning('请选择部门');return false;}
    axios.post("/case/allotCase",{}).then((res) =>{
      if(res.data.code == 0) {
        message.success('分案成功');
        this.onCancel();
      }
    })
  };
  // 获取部门id
  chooseDepartment = (value) => {
    let id = value[value.length - 1];
    this.setState({deparment,id})
  }
  render() {
    return (
      <div>
        <div className="content-body">
          <div className="bd-top">
            <div className="md clearfix">
              <div className="md-left">
                <h5>还款列表</h5>
              </div>
              <div className="md-right">
        
              </div>
            </div>
          </div>
          <div className="bd-main">
            <SearchForm getList={this.getList} />
            <CaseTable ref="table" />
          </div>
        </div>
      </div>
    );
  }
}
export default RepayComponent;
