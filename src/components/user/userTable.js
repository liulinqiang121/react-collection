/**
 * @LIU LIN QIANG 07/22
 */
import React from 'react';
import { Table,Button,Spin,message } from 'antd';
import axios from 'axios'


const columns = [{
  title: '姓名',
  dataIndex: 'userName',
  key: '2',
  align: 'center'
}, 
{
  title: '电话',
  dataIndex: 'telephone',
  key: '4',
  align: 'center'
},
{
  title: '邮箱',
  dataIndex: 'email',
  key: '5',
  align: 'center'
  },

{
  title: '状态',
  dataIndex: 'status',
  key: '8',
  align: 'center'
  },
{
  title: '性别',
  dataIndex: 'sex',
  key: '9',
  align: 'center'
  },
];


class TableComponent extends React.Component {
  state = {
    userId: [], // Check here to configure the default column
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
    axios.post("/user/userList",data).then((res) =>{
        if(res.data.code == 0) {
        res.data.data.items.forEach((element,index) => {
          element['key'] = index+'';
        });
        this.setState({data:res.data.data.items})
        this.setState({loading: false})
      } else {
        message.error('接口报错，请联系管理员')
      }
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
        arr.push(item.id);
    })
    this.setState({userId: arr });
  }

  render() {
    const { loading} = this.state;
    const rowSelection = {
      onChange: this.onSelectChange,
    };
    return (
      <div  className="caseTable">
      <Spin tip="拼命加载中" spinning={this.state.loading}>
       <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data}  scroll={{ x: 0 }} pagination={{pageSize: 10,showTotal:function(total){ return  `共${total}条`}}}  />
      </Spin>
      </div>
    );
  }
}

export default TableComponent