import React from "react";
import { Button, Modal, Form, Input, Radio, Select,Cascader  } from "antd";
import axios from "axios";
const FormItem = Form.Item;
const Option = Select.Option;
require("../../styles/case.scss");
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const CaseAllotForm = Form.create()(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        visible: false,
        departments: [],
        deparment: ''
      };
    }
    // 初始化调用下拉接口
    componentWillMount(){
      this.getDropdownData();
    }
    getDropdownData() {
        axios.post("/case/getDepartments",{}).then((res) =>{
            this.setState({departments:res.data.data});
        })
    }
    // 停止
    handleCancel = () => {
      this.setState({ visible: false });
    };
    // 分案
    handleCreate = () => {
    };

    // 打开弹窗
    showDialog = () => {
      this.setState({visible: true})
    }
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={this.props.visible}
          title="分案"
          okText="Create"
          onCancel={this.onCancel}
          onOk={this.onCreate}
        >
          <Form >
            <FormItem label="部门："   {...formItemLayout}>
              {getFieldDecorator("deparment", {
                rules: [
                  {
                    required: true,
                    message: "请选择分案部门!"
                  }
                ],
              })
              (<Cascader  options={this.state.departments} onChange={this.onChange}  placeholder="Please select" />)
              }
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default CaseAllotForm