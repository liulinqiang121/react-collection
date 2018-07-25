/**
 * @LIU LIN QIANG 07/19
 */
import React from "react";
import { hashHistory } from "react-router";
import axios from "axios";
require("../../styles/user.scss");
import UserTable from "./userTable";
import UserDialog from './addUser'
import { Button, Modal, Form, Input, Radio, Select,Cascader ,message } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

class CaseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      visible: false,
      title: '',
      text: '',
      addDialogVisible: false
    };
  }
  componentWillMount() {}
  // 搜索组件通过父组件调用表格组件的方法
  getList = data => {
    this.refs.table.getList(data);
  };
  // 添加用户
  addUser = () => {
    this.setState({addDialogVisible: true ,title: '用户修改',text: '创建',id: ''});
  };
  closeAdd = () => {
    this.setState({addDialogVisible: false})
  }
   // 重置用户密码
   resetPass = () => {
    if(this.refs.table.state.userId.length == 0) {
      message.warning('请选择用户');
      return false;
    }
    this.setState({ visible: true });
  };
   // 禁用用户
   forbidUser = () => {
    if(this.refs.table.state.userId.length == 0) {
      message.warning('请选择用户');
      return false;
    }
    this.setState({ visible: true });
  };
   // 激活用户
   activeUser = () => {
    if(this.refs.table.state.userId.length == 0) {
      message.warning('请选择用户');
      return false;
    }
    this.setState({ visible: true });
  };
  // 关闭弹窗
  onCancel = () => {
    this.setState({ visible: false });
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
  render() {
    return (
      <div>
        <UserDialog title={this.state.title} text={this.state.text} visible={this.state.addDialogVisible} closeAdd={this.closeAdd}></UserDialog>
        <div className="content-body">
          <div className="bd-top">
            <div className="md clearfix">
              <div className="md-left">
                <h5>用户管理</h5>
              </div>
              <div className="md-right">
                <Button size="default" type="primary" onClick={this.addUser}> 添加用户</Button>
                <Button size="default" type="primary" onClick={this.resetPass}> 密码重置</Button>
                <Button size="default" type="primary" onClick={this.forbidUser}> 禁用用户</Button>
                <Button size="default" type="primary" onClick={this.activeUser}> 激活用户</Button>
              </div>
            </div>
          </div>
          <div className="bd-main">
            <UserTable ref="table" />
          </div>
        </div>
      </div>
    );
  }
}
export default CaseComponent;
