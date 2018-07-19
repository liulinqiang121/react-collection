/**
 * @LIU LIN QIANG 07/19
 */
import React from 'react';
import { hashHistory } from 'react-router'
import { Row, Col,Button,Form, Input, TimePicker, Select, Cascader, InputNumber,DatePicker } from 'antd';
import axios from 'axios'
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const formItemLayout2 = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};
const { MonthPicker, RangePicker } = DatePicker;

require('../styles/case.scss')
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
      registeredAddressOption: [],
      genderOption: [],
      collectionStatusOption: [],
      bacthTimesOption: [],
      telStatusOption: [],
      allotStatusOption: [],
      receivableAgeOption: [],
    }
  }
  componentWillMount(){
    this.getDropdownData();
  }
  getDropdownData() {
    axios.post("/casePage/getDropdown",{}).then((res) =>{
      this.setState({dropdownData:res.data.loanInstitution});
      // 贷款机构 loanInstitution
      var loanInstitutionOption =[],productNameOption = [],caseStatusOption = [],caseAreaOption = [], registeredAddressOption = [],genderOption = [],collectionStatusOption = []
      ,bacthTimesOption = [],allotStatusOption = [],telStatusOption= [],receivableAgeOption = [];
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
      // 户籍地 registeredAddress
      res.data.registeredAddress.forEach((item,index) => {
        registeredAddressOption.push(<Option key={index+ 'registeredAddress'} value={item.code}>{item.name}</Option>)
      })
      // 性别 gender
      res.data.gender.forEach((item,index) => {
        genderOption.push(<Option key={index+ 'gender'} value={item.code}>{item.name}</Option>)
      })
      // 催收状态
      res.data.collectionStatus.forEach((item,index) => {
        collectionStatusOption.push(<Option key={index+ 'collectionStatus'} value={item.code}>{item.name}</Option>)
      })
      // 账龄 bacthTimes
      res.data.bacthTimes.forEach((item,index) => {
        bacthTimesOption.push(<Option key={index+ ''} value={item.code}>{item.name}</Option>)
      })
      // 电话状态 telStatus
      res.data.telStatus.forEach((item,index) => {
        telStatusOption.push(<Option key={index+ ''} value={item.code}>{item.name}</Option>)
      })
      // 分配状态 allotStatus
      res.data.allotStatus.forEach((item,index) => {
        allotStatusOption.push(<Option key={index+ ''} value={item.code}>{item.name}</Option>)
      })
      // 账龄 
      res.data.receivableAge.forEach((item,index) => {
        receivableAgeOption.push(<Option key={index+ ''} value={item.code}>{item.name}</Option>)
      })

      this.setState({loanInstitutionOption:loanInstitutionOption})
      this.setState({productNameOption:productNameOption})
      this.setState({caseStatusOption:caseStatusOption})
      this.setState({caseAreaOption:caseAreaOption})
      this.setState({ registeredAddressOption: registeredAddressOption})
      this.setState({ genderOption: genderOption})
      this.setState({ collectionStatusOption: collectionStatusOption})
      this.setState({ bacthTimesOption: bacthTimesOption})
      this.setState({ telStatusOption: telStatusOption})
      this.setState({ allotStatusOption: allotStatusOption})
      this.setState({ receivableAgeOption: receivableAgeOption})

    })
  } 

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    return (
        <div>
          <Form className="condition-form" >
            <div>
              <FormItem label="案件号" className="fixed-width" {...formItemLayout}>
                {
                  getFieldDecorator('caseCode', {})
                  (<Input value="" placeholder="请输入案件号" size="small" />)
                }
              </FormItem>
            </div>
            <div>
              <FormItem label="姓名" className="fixed-width" {...formItemLayout}>
               {
                 getFieldDecorator('username', {})
                 (<Input value="" placeholder="请输入姓名" size="small" />)
               }
              </FormItem>
            </div>
            <div>
              <FormItem label="身份证号" className="fixed-width" {...formItemLayout}>
              {
                 getFieldDecorator('borrowerIdnumber', {})
                 (<Input value="" placeholder="请输入身份证号" size="small" />)
               }
              </FormItem>
            </div>
            <div>
              <FormItem label="手机号" className="fixed-width" {...formItemLayout}>
              {
                 getFieldDecorator('borrowerPhone', {})
                 (<Input value="" placeholder="请输入手机号码" size="small" />)
               }
              </FormItem>
            </div>
            <div>
              <FormItem label="贷款机构" className="fixed-width" {...formItemLayout}>
                <Select defaultValue="" size="small">
                   <Option value=""  key="all">All</Option>
                   {this.state.loanInstitutionOption}
                </Select>
              </FormItem>
            </div>
            <div>
              <FormItem label="产品名称" className="fixed-width" {...formItemLayout}>
                <Select defaultValue="" size="small">
                   <Option value=""  key="all">All</Option>
                   {this.state.productNameOption}
                </Select>
              </FormItem>
            </div>
            <div>
              <FormItem label="批次号" className="fixed-width" {...formItemLayout}>
               {
                 getFieldDecorator('batchCode', {})
                 (<Input value="" placeholder="请输入批次号" size="small" />)
               }
              </FormItem>
            </div>
            <div>
              <FormItem label="案件状态" className="fixed-width" {...formItemLayout}>
                <Select defaultValue="" size="small">
                   <Option value=""  key="all">All</Option>
                   {this.state.caseStatusOption}
                </Select>
              </FormItem>
            </div>
            <div>
              <FormItem label="案件地区" className="fixed-width" {...formItemLayout}>
                <Select defaultValue="" size="small">
                   <Option value=""  key="all" >All</Option>
                   {this.state.caseAreaOption}
                </Select>
              </FormItem>
            </div>
            <div>
              <FormItem label="户籍地" className="fixed-width" {...formItemLayout}>
                <Select defaultValue="" size="small">
                   <Option value=""  key="all">All</Option>
                   {this.state.registeredAddressOption}
                </Select>
              </FormItem>
            </div>
            <div>
              <FormItem label="性别" className="fixed-width" {...formItemLayout}>
                <Select defaultValue="" size="small">
                   <Option value=""  key="all">All</Option>
                   {this.state.genderOption}
                </Select>
              </FormItem>
            </div>
            <div>
              <Row className="fixed-width" >
                <Col span={15}>
                  <FormItem label="年龄"  {...formItemLayout2}>
                  {
                    getFieldDecorator('ageMin', {})
                    (<Input value="" placeholder="最小值" size="small" />)
                  }
                  </FormItem>
                </Col>
                <Col span={2} className="line">-</Col>
                <Col span={7}>
                  <FormItem >
                  {
                    getFieldDecorator('ageMax', {})
                    (<Input value="" placeholder="最大值" size="small" />)
                  }
                  </FormItem>
                </Col>
              </Row>
            </div>
            <div>
              <FormItem label="催收状态" className="fixed-width" {...formItemLayout}>
                <Select defaultValue="" size="small">
                   <Option value=""  key="all">All</Option>
                   {this.state.collectionStatusOption}
                </Select>
              </FormItem>
            </div>
            <div>
              <FormItem label="账龄" className="fixed-width" {...formItemLayout}>
                <Select defaultValue="" size="small">
                   <Option value=""  key="all">All</Option>
                   {this.state.receivableAgeOption}
                </Select>
              </FormItem>
            </div>
            <div>
              <FormItem label="手别" className="fixed-width" {...formItemLayout}>
                <Select defaultValue="" size="small">
                   <Option value=""  key="all">All</Option>
                   {this.state.bacthTimesOption}
                </Select>
              </FormItem>
            </div>
            <div>
              <Row className="fixed-width" >
                <Col span={15}>
                  <FormItem label="逾期天数"  {...formItemLayout2}>
                  {
                    getFieldDecorator('overdueDayMin', {})
                    (<Input value="" placeholder="最小值" size="small" />)
                  }
                  </FormItem>
                </Col>
                <Col span={2} className="line">-</Col>
                <Col span={7}>
                  <FormItem >
                  {
                    getFieldDecorator('overdueDayMax', {})
                    (<Input value="" placeholder="最小值" size="small" />)
                  }
                  </FormItem>
                </Col>
              </Row>
            </div>
            <div>
              <FormItem label="电话状态" className="fixed-width" {...formItemLayout}>
                <Select defaultValue="" size="small">
                   <Option value=""  key="all">All</Option>
                   {this.state.telStatusOption}
                </Select>
              </FormItem>
            </div>
            <div>
              <Row className="fixed-width" >
                <Col span={15}>
                  <FormItem label="委案金额"  {...formItemLayout2}>
                  {
                    getFieldDecorator('commitMoneyMin', {})
                    (<Input value="" placeholder="最小值" size="small" />)
                  }
                  </FormItem>
                </Col>
                <Col span={2} className="line">-</Col>
                <Col span={7}>
                  <FormItem >
                  {
                    getFieldDecorator('commitMoneyMax', {})
                    (<Input value="" placeholder="最小值" size="small" />)
                  }
                  </FormItem>
                </Col>
              </Row>
            </div>
            <div>
              <FormItem label="分配状态" className="fixed-width" {...formItemLayout}>
                <Select defaultValue="" size="small">
                   <Option value=""  key="all">All</Option>
                   {this.state.allotStatusOption}
                </Select>
              </FormItem>
            </div>
          </Form>
        </div>  
    );
  }
}
const searchForm= Form.create()(SearchComponent);
export default searchForm


