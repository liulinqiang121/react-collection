/**
 * @LIU LIN QIANG 07/19
 */
import React from "react";
import { hashHistory } from "react-router";
import axios from "axios";
require("../../styles/case.scss");
import SearchForm from "./searchForm";
import CaseTable from "./caseTable";
import { Button, Modal, Form, Input, Radio, Select,Cascader ,message } from "antd";

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
  // 选择部门
  onChange = (value) => {
    if(value.length) {
      let deparment = value[value.length - 1];
      this.setState({deparment,deparment})
    } else{
      let deparment = ''
      this.setState({deparment,deparment })
    }
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
            (<Cascader  options={this.state.departments} onChange={this.props.setDepartment}  placeholder="Please select" />)
            }
          </FormItem>
          <div className="el-col fixed-width form-btns" style={{textAlign:'right'}}>
              <Button   onClick={this.props.onCancel} >取消</Button>
              <Button  type="primary" style={{marginLeft:'10px'}} onClick={this.props.submit}>确定</Button>
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
      visible: false,
      deparment: ''
    };
  }
  componentWillMount() {}
  // 搜索组件通过父组件调用表格组件的方法
  getList = data => {
    this.refs.table.getList(data);
  };
  // 打开分案弹窗
  allotCase = () => {
    if(this.refs.table.state.selectedCaseIds.length == 0) {
      message.warning('请选择案件');
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
  // 获取部门id
  chooseDepartment = (value) => {
    let id = value[value.length - 1];
    this.setState({deparment,id})
  }
  render() {
    return (
      <div>
        <CaseAllotForm visible={this.state.visible} onCancel ={this.onCancel} submit={this.submit} ref="allot" setDepartment={this.chooseDepartment} />
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
