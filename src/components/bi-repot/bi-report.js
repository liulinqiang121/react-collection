/**
 * @LIU LIN QIANG 07/19
 */
import React from "react";
import { hashHistory } from "react-router";
import axios from "axios";
import echarts from "echarts";
require("../../styles/case.scss");
// import SearchForm from "./searchForm";
// import CaseTable from "./caseTable";
import {
  Button,
  Modal,
  Form,
  Input,
  Radio,
  Select,
  Cascader,
  message
} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};

class CaseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      deparment: "",
      pictrueData: []
    };
  }
  componentDidMount() {
    this.getPictrueData();
  }
  // 搜索组件通过父组件调用表格组件的方法
  getList = data => {
    this.refs.table.getList(data);
  };
  // 画出分案结果图
  drawChat = () => {
    var pictrueData = this.state.pictrueData;
    var companyName = [],
      caseCount = [],
      caseMoney = [],
      ids = [],
      flag = [];
    var len = pictrueData.length;
    while (len--) {
      companyName.push(pictrueData[len]["name"]);
      caseCount.push(pictrueData[len]["caseCount"]);
      caseMoney.push(pictrueData[len]["caseMoney"]);
      ids.push(pictrueData[len]["id"]);
      flag.push(pictrueData[len]["flag"]);
    }
    var option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#283b56"
          }
        }
      },
      title: {},
      legend: {
        data: ["案件金额", "案件数量"]
      },
      toolbox: {
        show: false
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: true,
          data: companyName,
          axisLabel: {
            interval: 0,
            rotate: 45,
            margin: 10
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          scale: true,
          name: "案件金额（万元）",
          min: 0,
          splitLine: {
            show: false
          }
        },
        {
          type: "value",
          scale: true,
          name: "案件数量",
          min: 0,
          splitLine: {
            show: false
          }
        }
      ],

      series: [
        {
          name: "案件金额",
          type: "bar",
          barMaxWidth: 100,
          data: caseMoney,
          itemStyle: {
            normal: {
              color: "#66A3FC"
            }
          }
        },
        {
          name: "案件数量",
          type: "line",
          data: caseCount,
          yAxisIndex: 1
        }
      ],
      grid: {
        left: "40px",
        right: "20px",
        bottom: "60px",
        containLabel: true
      }
    };
    console.log(this.refs.echarts)
    var myChart = echarts.init(this.refs.echarts);
    myChart.setOption(option);
  };

  // 获取分案结果图的数据
  getPictrueData = () => {
    axios
      .post("/caseManage/getAnalysisData", {})
      .then(res => {
        if (res.data.code == 0) {
          this.setState({ pictrueData: res.data.data });
          this.drawChat();
        } else {
          this.$util.failCallback(res.data, this);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <div className="content-body">
          <div className="bd-top">
            <div className="md clearfix">
              <div className="md-left">
                <h5>案件报表</h5>
              </div>
              <div className="md-right" />
            </div>
          </div>
          <div className="bd-main">
            {/* echarts分案图 */}
            <div ref="echarts" style={{ width: '100%', height: 600 }} id="echarts"></div>
          </div>
        </div>
      </div>
    );
  }
}
export default CaseComponent;
