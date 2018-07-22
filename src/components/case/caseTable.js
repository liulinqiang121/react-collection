/**
 * @LIU LIN QIANG 07/22
 */
import React from 'react';
import { Table,Button } from 'antd';
import axios from 'axios'


const columns = [{
  title: '案件编号',
  dataIndex: 'caseCode',
  key: '1',
}, {
  title: '批次号',
  dataIndex: 'batchCode',
  key: '2',
}, {
  title: '贷款机构',
  dataIndex: 'loanInstitution',
  key: '3',
},
{
  title: '产品名称',
  dataIndex: 'productName',
  key: '4',
},
{
  title: '姓名',
  dataIndex: 'borrowerName',
  key: '5',
  },
{
  title: '身份证',
  dataIndex: 'borrowerIdnumber',
  key: '6',
  },
{
  title: '手机号',
  dataIndex: 'borrowerPhone',
  key: '7',
  },
{
  title: '年龄',
  dataIndex: 'borrowerAge',
  key: '8',
  },
{
  title: '性别',
  dataIndex: 'borrowerGenderName',
  key: '9',
  },
{
  title: '委案金额',
  dataIndex: 'commitMoney',
  },
{
  title: '账龄',
  dataIndex: 'receivableAge',
  key: '10',
  },
{
  title: '手别',
  dataIndex: 'bacthTimes',
  key: '11',
  },
{
  title: '欠款金额',
  dataIndex: 'totalDebtMoney',
  key: '12',
  },
{
  title: '委案时间',
  dataIndex: 'commitDate',
  key: '13',
  },
{
  title: '案件地区',
  dataIndex: 'limitDate',
  key: '14',
  },
{
  title: '户籍地',
  dataIndex: 'registeredAddress',
  key: '15',
  },
];


class TableComponent extends React.Component {
  state = {
    selectedCaseIds: [], // Check here to configure the default column
    loading: false,
    data: [],
    pageSize: 15,
    currentPage: 1
  }
  componentWillMount(){
    this.getList({})
  }
  // 获取案件列表
  getList = (data) => {
    axios.post("/casePage/caseList",data).then((res) =>{
        if(Object.keys(data).length != 0) {
               res.data.items.splice(5,15)
        }
        res.data.items.forEach((element,index) => {
          res.data.items[index]['key'] = index+'';
        });
        this.setState({data:res.data.items})
    })
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1000);
  }

  onSelectChange = (selectedRowKeys,row) => {
    var arr = [];
    row.forEach( item => {
        arr.push(item.caseId);
    })
    this.setState({selectedCaseIds: arr });
  }

  render() {
    const { loading} = this.state;
    const rowSelection = {
      onChange: this.onSelectChange,
    };
    return (
      <div  className="caseTable">
       <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data}  scroll={{ x: 2000 }} pagination={{pageSize: 10,showTotal:function(total){ return  `共${total}条`}}}  />
      </div>
    );
  }
}

export default TableComponent