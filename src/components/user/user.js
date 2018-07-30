/**
 * @LIU LIN QIANG 07/19
 */
import React from "react";
import { hashHistory } from "react-router";
import axios from "axios";
require("../../styles/user.scss");
import UserTable from "./userTable";
import UserDialog from './addUser'
import PasswordDialog from './resetPass'
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
      addDialogVisible: false,
      passwordDialogVisible: false,
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
  // 关闭 弹窗
  closeAdd = () => {
    this.setState({addDialogVisible: false});
  };
  // 重置用户密码
  resetPass = () => {
    if(this.refs.table.state.userId.length == 0) {
      message.warning('请选择用户');
      return false;
    }
    this.setState({ passwordDialogVisible: true });
  };
  // 关闭密码重置弹框
  closeReset = () => {
    this.setState({passwordDialogVisible: false})
  }
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
        <UserDialog title={this.state.title} text={this.state.text} visible={this.state.addDialogVisible} closeAdd={this.closeAdd} ref="userdialog" />
        <PasswordDialog title="修改密码" text="确认" visible={this.state.passwordDialogVisible} closeReset={this.closeReset} ref="PasswordDialog" />
        <div className="content-body">
          <div className="bd-top">
            <div className="md clearfix">
              <div className="md-left">
                <h5>用户管理</h5>
              </div>
              <div className="md-right">
                <Button size="default" type="primary" onClick={this.addUser}> 添加用户</Button>
                <Button size="default" type="primary" onClick={this.resetPass}> 密码重置</Button>
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
