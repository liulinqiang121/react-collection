/**
 * @LIU LIN QIANG 07/19
 */
import React from "react";
import { hashHistory } from "react-router";
import axios from "axios";
require("../../styles/case.scss");
import SearchForm from "./searchForm";
import CaseTable from "./caseTable";
import { Button, Modal, Form, Input, Radio, Select,Cascader  } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
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

  // 分案
  handleCancel = () => {

  };
  onChange = () => {
    
  }

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
        onCancel={this.props.onCancel}
        onOk={this.props.onCreate}
        cancelText ="取消"
        destroyOnClose="true"    
        footer={null}
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
          <div className="el-col fixed-width form-btns" style={{textAlign:'right'}}>
              <Button   onClick={this.props.onCancel} >取消</Button>
              <Button  type="primary" onClick={this.handleSearch} style={{marginLeft:'10px'}} onClick={this.props.submit}>确定</Button>
          </div>
        </Form>
      </Modal>
    );
  }
}
);


class CaseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  componentWillMount() {}
  // 搜索组件通过父组件调用表格组件的方法
  getList = data => {
    this.refs.table.getList(data);
  };
  // 分案
  submit = () => {
    this.setState({ visible: true });
  };
  onCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <div>
        <CaseAllotForm visible={this.state.visible} onCancel ={this.onCancel} submit={this.submit}  />
        <div className="content-body">
          <div className="bd-top">
            <div className="md clearfix">
              <div className="md-left">
                <h5>案件管理</h5>
              </div>
              <div className="md-right">
                <Button size="default" type="primary" onClick={this.allotCase}>
                  分案
                </Button>
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
export default CaseComponent;
