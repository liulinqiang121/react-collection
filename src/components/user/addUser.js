import React from "react";
import { Button, Modal, Form, Input, Radio, Select,Cascader  } from "antd";
import axios from "axios";
const FormItem = Form.Item;
const Option = Select.Option;
require("../../styles/user.scss");
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const UserForm = Form.create()(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        visible: false,
        dialogForm: {
            username: '',
            tel: '',
            email: '',
            sex: ''
        }
      };
    }
    // 初始化调用下拉接口
    componentWillMount(){
    }
    // 停止
    handleCancel = () => {
      this.setState({ visible: false });
    };
    handleOk = () => {
     
    }
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={this.props.visible}
          title = {this.props.title}
          cancelText="取消"
          okText={this.props.text}
          onCancel={this.props.closeAdd}
          onOk={this.handleOk}
        >
          <Form >
            <FormItem label="用户姓名："   {...formItemLayout}>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "必填项!"
                  }
                ],
              })
              (<Input maxLength="20" placeholder="请输入用户姓名" />)
              }
            </FormItem>
            <FormItem label="电话："   {...formItemLayout}>
              {getFieldDecorator("tel", {
                rules: [
                  {
                    required: true,
                    message: "必填项!"
                  }
                ],
              })
              (<Input maxLength="20" placeholder="请输入电话" />)
              }
            </FormItem>
            <FormItem label="邮箱："   {...formItemLayout}>
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: "必填项!"
                  }
                ],
              })
              (<Input maxLength="20" placeholder="请输入邮箱" />)
              }
            </FormItem>
            <FormItem label="性别"   {...formItemLayout}>
              {getFieldDecorator("sex", {
                rules: [
                  {
                    required: true,
                    message: "必填项!"
                  }
                ],
              })
              (<Select placeholder="请选择性别">
                  <Option value="male">男性</Option>
                  <Option value="female">女性</Option>
                  <Option value="other">其他</Option>
              </Select>)
              }
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default UserForm