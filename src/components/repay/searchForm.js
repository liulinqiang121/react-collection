/**
 * @LIU LIN QIANG 07/24
 */
import React from 'react';
import { hashHistory } from 'react-router'
import { Row, Col,Button,Form, Input, TimePicker, Select, Cascader, InputNumber,DatePicker } from 'antd';
import axios from 'axios'
const FormItem = Form.Item;
const Option = Select.Option;
// 单个输入框样式
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
// 两个输入框样式
const formItemLayout2 = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

const { MonthPicker, RangePicker } = DatePicker;

class SearchComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      overviewData: {},
      dropdownData: {},
      loanInstitutionOption:[],
      productNameOption:[],
      caseAreaOption: [],
      caseStatusOption: [],
      searchData: {},
    }
  }
  // 初始化调用下拉接口
  componentWillMount(){
    this.getDropdownData();
  }
  //获取下拉参数
  getDropdownData() {
    axios.post("/casePage/getDropdown",{}).then((res) =>{
      this.setState({dropdownData:res.data.loanInstitution});
      // 贷款机构 loanInstitution
      var loanInstitutionOption =[],productNameOption = [],caseStatusOption = [],caseAreaOption = [];
      res.data.loanInstitution.forEach((item,index) => {
        loanInstitutionOption.push(<Option key={index+ 'loanInstitution'} value={item.code}>{item.name}</Option>)
      })
      // 产品名称 productName
      res.data.productName.forEach((item,index) => {
        productNameOption.push(<Option key={index+ 'productName'} value={item.code}>{item.name}</Option>)
      })
      // 案件状态 caseStatus
      res.data.caseStatus.forEach((item,index) => {
        caseStatusOption.push(<Option key={index+ 'caseStatus'} value={item.code}>{item.name}</Option>)
      })
      // 案件地 caseArea
      res.data.caseArea.forEach((item,index) => {
        caseAreaOption.push(<Option key={index+ 'caseArea'} value={item.code}>{item.name}</Option>)
      })

      this.setState({loanInstitutionOption:loanInstitutionOption})
      this.setState({productNameOption:productNameOption})
      this.setState({caseStatusOption:caseStatusOption})
      this.setState({caseAreaOption:caseAreaOption})
    })
  } 
  // 重置
  handleReset= ()=> {
    this.props.form.resetFields();
    var searchData = this.props.form.getFieldsValue();
    this.searchList(searchData)
  }
  // 搜索
  handleSearch = (e)=> {
    e.preventDefault();
    var searchData = this.props.form.getFieldsValue();
    this.searchList(searchData);
  }
  // 搜索重置
  searchList = (data) => {
    this.props.getList(data);
  }
  render() {
    const { getFieldDecorator} = this.props.form;
    return (
        <div>
          <Form className="condition-form" >
             <div>
              <FormItem label="姓名" className="fixed-width" {...formItemLayout}>
               {
                 getFieldDecorator('username', {})
                 (<Input  placeholder="请输入姓名" size="small" />)
               }
              </FormItem>
            </div>
            <div>
              <FormItem label="身份证号" className="fixed-width" {...formItemLayout}>
              {
                 getFieldDecorator('borrowerIdnumber', {})
                 (<Input  placeholder="请输入身份证号" size="small" />)
               }
              </FormItem>
            </div>
            <div>
              <FormItem label="手机号" className="fixed-width" {...formItemLayout}>
              {
                 getFieldDecorator('borrowerPhone', {})
                 (<Input  placeholder="请输入手机号码" size="small" />)
               }
              </FormItem>
            </div>
            <div>
              <FormItem label="贷款机构" className="fixed-width" {...formItemLayout}>
              {
                 getFieldDecorator('loanInstitution', {})
                (<Select  size="small"  placeholder="请选择">
                   <Option   key="all" value="">All</Option>
                   {this.state.loanInstitutionOption}
                </Select>)
              }  
              </FormItem>
            </div>
            <div>
              <FormItem label="批次号" className="fixed-width" {...formItemLayout}>
               {
                 getFieldDecorator('batchCode', {})
                 (<Input  placeholder="请输入批次号" size="small" />)
               }
              </FormItem>
            </div>
            <div>
              <FormItem label="案件号" className="fixed-width" {...formItemLayout}>
                {
                  getFieldDecorator('caseCode', {})
                  (<Input  placeholder="请输入案件号" size="small" />)
                }
              </FormItem>
            </div>
            <div>
              <FormItem label="案件地区" className="fixed-width" {...formItemLayout}>
              {
                 getFieldDecorator('caseArea', {})
                (<Select  size="small"  placeholder="请选择">
                   <Option   key="all" value="">All</Option>
                   {this.state.caseAreaOption}
                </Select>)
              }  
              </FormItem>
            </div>
            <div>
              <FormItem label="产品名称" className="fixed-width" {...formItemLayout}>
              {
                 getFieldDecorator('productName', {})
                (<Select  size="small"  placeholder="请选择">
                   <Option   key="all" value="">All</Option>
                   {this.state.productNameOption}
                </Select>)
              }
              </FormItem>
            </div>
            <div>
              <FormItem label="案件状态" className="fixed-width" {...formItemLayout}>
              {
                 getFieldDecorator('caseStatus', {})
                (<Select  size="small"  placeholder="请选择">
                   <Option   key="all" value="">All</Option>
                   {this.state.caseStatusOption}
                </Select>)
              }
              </FormItem>
            </div>
            <div>
            <FormItem label="还款时间" className="fixed-width" {...formItemLayout}>
              {
                 getFieldDecorator('start', {})
                ( <RangePicker format="YYYY/MM/DD" placeholder={['起始时间','结束时间']}
                />)
              }
              </FormItem>
            </div>
            <div>
              <Row className="fixed-width" >
                <Col span={15}>
                  <FormItem label="已还款金额"  {...formItemLayout2}>
                  {
                    getFieldDecorator('commitMoneyMin', {})
                    (<Input  placeholder="最小值" size="small" />)
                  }
                  </FormItem>
                </Col>
                <Col span={2} className="line">-</Col>
                <Col span={7}>
                  <FormItem >
                  {
                    getFieldDecorator('commitMoneyMax', {})
                    (<Input  placeholder="最大值" size="small" />)
                  }
                  </FormItem>
                </Col>
              </Row>
            </div>
            <div>
              <Row className="fixed-width" >
                <Col span={15}>
                  <FormItem label="减免金额"  {...formItemLayout2}>
                  {
                    getFieldDecorator('reduceMoneyMin', {})
                    (<Input  placeholder="最小值" size="small" />)
                  }
                  </FormItem>
                </Col>
                <Col span={2} className="line">-</Col>
                <Col span={7}>
                  <FormItem >
                  {
                    getFieldDecorator('reduceMoneyMax', {})
                    (<Input  placeholder="最大值" size="small" />)
                  }
                  </FormItem>
                </Col>
              </Row>
            </div>
            <div className="el-col fixed-width form-btns">
              <Button  type="primary" onClick={this.handleSearch}>搜索</Button>
              <Button  onClick={this.handleReset}>重置</Button>
          </div>
          </Form>
        </div>  
    );
  }
}
const searchForm= Form.create()(SearchComponent);
export default searchForm

