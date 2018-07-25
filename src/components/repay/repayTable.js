/**
 * @LIU LIN QIANG 07/24
 */
import React from 'react';
import { Table,Button ,Spin} from 'antd';
import axios from 'axios'


const columns = [{
  title: '案件编号',
  dataIndex: 'caseCode',
  key: '1',
}, {
  title: '案件编号',
  dataIndex: 'caseCode',
  key: '2',
  align: 'center'
}, {
  title: '贷款机构',
  dataIndex: 'loanInstitution',
  key: '3',
  align: 'center'
},
{
  title: '批次号',
  dataIndex: 'batchCode',
  key: '4',
  align: 'center'
},
{
  title: '姓名',
  dataIndex: 'borrowerName',
  key: '5',
  align: 'center'
  },
{
  title: '贷款机构',
  dataIndex: 'loanInstitution',
  key: '6',
  align: 'center'
  },
{
  title: '最近还款时间',
  dataIndex: 'latestRepayDate',
  key: '7',
  align: 'center'
  },
{
  title: '已还款总额',
  dataIndex: 'totalRepayMoney',
  key: '8',
  align: 'center'
  },
{
  title: '减免金额',
  dataIndex: 'reduceMoney',
  key: '9',
  align: 'center'
  },
{
  title: '还款状态',
  dataIndex: 'repayStatusName',
  align: 'center'
  },
{
  title: '最新欠款金额',
  dataIndex: 'latestDebtMoney',
  key: '10',
  align: 'center'
  },
{
  title: '客户姓名',
  dataIndex: 'borrowerName',
  key: '11',
  align: 'center'
  },
{
  title: '欠款金额',
  dataIndex: 'totalDebtMoney',
  key: '12',
  align: 'center'
  },
{
  title: '身份证号',
  dataIndex: 'borrowerIdnumber',
  key: '13',
  align: 'center'
  },
{
  title: '手机号',
  dataIndex: 'borrowerPhone',
  key: '14',
  align: 'center'
  },
{
  title: '案件地区',
  dataIndex: 'caseArea',
  key: '15',
  align: 'center'
  },
];


class TableComponent extends React.Component {
  state = {
    selectedCaseIds: [], // Check here to configure the default column
    loading: true,
    data: [],
    pageSize: 15,
    currentPage: 1
  }
  componentWillMount(){
    this.getList({})
  }
  // 获取案件列表
  getList = (data) => {
    axios.post("/repay/repayList",data).then((res) =>{
        res.data.items.forEach((element,index) => {
          res.data.items[index]['key'] = index+'';
        });
        this.setState({data:res.data.items})
        this.setState({loading: false})
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
       <Spin tip="拼命加载中" spinning={this.state.loading}>
         <Table  columns={columns} dataSource={this.state.data}  scroll={{ x: 2000 }} pagination={{pageSize: 10,showTotal:function(total){ return  `共${total}条`}}}  />
       </Spin>
      </div>
    );
  }
}

export default TableComponent