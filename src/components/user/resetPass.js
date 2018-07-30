import React from "react";
import { Button, Modal, Form, Input, Radio, Select,Cascader,message  } from "antd";
import axios from "axios";
const FormItem = Form.Item;
const Option = Select.Option;
require("../../styles/user.scss");
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const PasswordForm = Form.create()(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        visible: false,
        dialogForm: {
            password: '',
            confirmPass: '',
        }
      };
    }
    // 初始化调用下拉接口
    componentWillMount(){
    }
    handleOk = () => {
      this.props.form.validateFields((err,values) => {
        if(err) {
            console.log('错了');
            return false
        }
        message.success('用户密码修改成功');
        this.clearForm();
      })
    }
    //清空表单
    clearForm = () => {
      this.props.form.resetFields();
      this.props.closeReset();
    };
    checkConfirmPass = (rule,value,callback) => {
        let data = this.props.form.getFieldsValue();
        if(data.password != value) {
            callback('密码前后不一致')
        }
        callback()
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
          onCancel={this.clearForm}
          onOk={this.handleOk}
        >
          <Form  >
            <FormItem label="新密码："   {...formItemLayout} >
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "必填项!",
                  },
                  {
                    min: 6,
                    max:12,
                    message: '密码应该在6-12个字符'
                  }
                ],
              })
              (<Input maxLength="20" placeholder="请输入密码" type="password" />)
              }
            </FormItem>
            <FormItem label="密码确认："   {...formItemLayout}>
              {getFieldDecorator("confirmPass", {
                rules: [
                  {
                    required: true,
                    message: "必填项!"
                  },
                  { 
                    validator: this.checkConfirmPass
                  }
                ],
              })
              (<Input maxLength="20" placeholder="请输入确认密码" type="password" />)
              }
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default PasswordForm