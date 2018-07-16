<template>
  <div class="content-body">
    <!-- 顶部，包括标题，操作按钮-->
    <div class="bd-top">
      <div class="md clearfix">
        <!-- 1、左边标题 -->
        <div class="md-left">
          <h5>部门绩效排行</h5>
        </div>
        <!-- 2、右边操作按钮 -->
        <div class="md-right">
        </div>
      </div>
    </div>
    <div class="bd-main">
      <el-form size="mini" inline>
        <el-form-item label="">
          <el-date-picker v-model="searchMonth" :picker-options="pickerOptions0" type="month" placeholder="选择" value-format="yyyy-MM"
            format="yyyy/MM" @change="searchMonthChange" clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="对比">
          <el-switch v-model="isCompare" active-color="#13ce66" inactive-color="#ff4949" @change="isCompareChange">
          </el-switch>
        </el-form-item>
        <el-form-item label="" v-if="isCompare">
          <el-date-picker v-model="comparesearchMonth" :picker-options="pickerOptions0" type="month" placeholder="选择" value-format="yyyy-MM"
            format="yyyy/MM" @change="compare" clearable>
          </el-date-picker>
        </el-form-item>


      </el-form>
      <my-tabs :tabList="tabsData" :tabIndex="currentChart" @changeTab="chartChange">
          <div ref="departmentKPIChart" style="height:380px;"></div>
      </my-tabs>
      <!-- <el-tabs v-model="currentChart" @tab-click="chartChange">
        <el-tab-pane v-for="item in tabsData" :label="item.label" :name="item.name" :key="item.id"></el-tab-pane>
      </el-tabs> -->
      <!-- 个人绩效 -->
      <p class="exportTable"><a class="el-icon-upload2" @click="downloadTable">导出EXCEL文件</a></p>
      <el-table ref="multipleTable" :data="tb.data" height="460" tooltip-effect="dark" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        empty-text="暂无数据" show-overflow-tooltip >
        <el-table-column type="index" width="150" :label="this.searchMonth + '绩效排名'" align="center">
        </el-table-column>
        <el-table-column v-for="field in tb.fields" :align="field.align||'left'" :prop="field.key" :label="field.label" :width="field.width"
          :key="field.id">
        </el-table-column>
      </el-table>
      <!-- <pagination :total="total" @changePage="changePage" :pageSize="pageSize" :currentPage="currentPage"></pagination> -->
    </div>
  </div>
</template>

<script>
  const fields = [{
      key: 'orgName',
      label: '部门名称',
      width: '',
      id: '3'
    },
    {
      key: 'commitMoney',
      label: '委托金额',
      width: '150',
      id: '5',
      align: 'right'
    },
    {
      key: 'repayMoney',
      label: '回收金额',
      width: '150',
      id: '4',
      align: 'right'
    },

    {
      key: 'onCaseRecovery',
      label: '在案回收率',
      width: '150',
      id: '6',
      align: 'right'
    },
    {
      key: 'newCaseRecovery',
      label: '新案回收率',
      width: '150',
      id: '7',
      align: 'right'
    },
    {
      key: 'oldCaseRecovery',
      label: '旧案回收率',
      width: '150',
      id: '9',
      align: 'right'
    },
    {
      key: 'repayCaseCount',
      label: '还款案件数',
      width: '150',
      id: '10',
      align: 'right'
    },
    {
      key: 'commitCaseCount',
      label: '分配案件数',
      width: '150',
      id: '11',
      align: 'right'
    },

  ]
  import MyTabs from "../../public-components/my-tabs2";
  import pagination from '../../public-components/pagination'
  import echarts from 'echarts'
  export default {
    components: {
      MyTabs,
    },
    data() {
      return {
        searchMonth: '',
        comparesearchMonth: '',
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e7
          }
        },
        currentChart: 'repayMoney',
        tb: {
          data: [],
          fields: fields,
        },

        tabsData: [{
          code: 'repayMoney',
          name: '回收金额',
          //   code: 'commitMoney',
        }, {
          code: 'commitMoney',
          name: '委托金额',
          //   code: 'repayMoney',
        }, {
          code: 'onCaseRecovery',
          name: '在案回收率',
          //   code: 'repayCount',
        }, {
          code: 'newCaseRecovery',
          name: '新案回收率',
          //   code: 'rateInCollection',
        }, {
          code: 'oldCaseRecovery',
          name: '旧案回收率',
          //   code: 'rateNew',
        }, {
          code: 'repayCaseCount',
          name: '还款案件数',
          //   code: 'rateOld',
        }, {
          code: 'commitCaseCount',
          name: '分配案件数',
          //   code: 'rateOld',
        }],


        xAxisData: [],
        seriesData: [],
        compareseriesData: [],
        chartData: [],
        comparechartData: [],

        departmentKPIChart: null,

        loading: true,
        isCompare: false,
        thisMonth: '',


      }
    },
    created() {
      let now = new Date()
      let month = now.getMonth() + 1
      let year = now.getFullYear()
      this.thisMonth = '' + year + '-' + (month > 9 ? month : '0' + month)
      this.searchMonth = this.thisMonth
      // 1、获取部门信息
      // 2、获取列表
      // 3、获取折线图数据
      this.getList()

    },
    mounted() {
      // 初始化chart对象
      console.log(this.$refs.departmentKPIChart)
      this.departmentKPIChart = echarts.init(this.$refs.departmentKPIChart);
    },
    methods: {
      searchMonthChange(val) {
        if (val == null) {
          this.searchMonth = this.thisMonth
        }
        this.getList()

      },
      compare(val) {
        if (val == null) {
          this.comparechartData = []
          this.compareseriesData = []
          this.drawChart()
        } else {
          // 获取数据
          this.getcompareList()
        }

      },
      isCompareChange(newStatus) {
        if (newStatus == false) {
          this.comparechartData = []
          this.compareseriesData = []
          this.drawChart()
        }
      },
      chartChange(tab) {
        this.currentChart = tab.code
        this.seriesData = this.chartData[tab.code]
        this.comparechartData == [] ? this.compareseriesData = [] : this.compareseriesData = this.comparechartData[tab.code]
        this.drawChart()
      },
      // 填入数据
      drawChart() {
        this.departmentKPIChart.clear();
        // this.currentseriesData = this.seriesData[this.currentChart]
        var option = {
          tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
            
          },
          title: {
            left: 'center',
            text: '',
          },
          legend: {
            data: [this.searchMonth,this.comparesearchMonth], //['委案金额', '回收金额', '回收率'],
            top: 'top'
            // data: [this.staffName],
            // show:true,
            // top:0,
          },
          xAxis: {
            type: 'category',
            // boundaryGap: false,
            data: this.xAxisData,
            axisTick: {
                alignWithLabel: true
            }
          },
          yAxis: {
            type: 'value',
            // boundaryGap: [0, '100%']
          },

          series: [{
            name: this.searchMonth,
            barWidth: '30%',
            type: 'bar',
            // smooth: true,
            // symbol: 'none',
            // sampling: 'average',
            // itemStyle: {
            //   normal: {
            //     // 描边颜色
            //     color: '#7fb3c9'
            //   }
            // },
            data: this.seriesData
          }, 
          // {
          //   name: this.comparesearchMonth,
          //   // barWidth: '60%',
          //   type: 'bar',
          //   // smooth: true,
          //   // symbol: 'none',
          //   // sampling: 'average',
          //   // itemStyle: {
          //   //   normal: {
          //   //     // 描边颜色
          //   //     color: 'rgb(255, 140, 0)'
          //   //   }
          //   // },
          //   data: this.compareseriesData
          // }, 
          ]
        };
        this.departmentKPIChart.setOption(option);

      },
      drawChart2() {
        this.departmentKPIChart.clear();
        // this.currentseriesData = this.seriesData[this.currentChart]
        var option = {
          tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
            
          },
          title: {
            left: 'center',
            text: '',
          },
          legend: {
            data: [this.searchMonth,this.comparesearchMonth], //['委案金额', '回收金额', '回收率'],
            top: 'top'
            // data: [this.staffName],
            // show:true,
            // top:0,
          },
          xAxis: {
            type: 'category',
            // boundaryGap: false,
            data: this.xAxisData,
            axisTick: {
                alignWithLabel: true
            }
          },
          yAxis: {
            type: 'value',
            // boundaryGap: [0, '100%']
          },

          series: [{
            name: this.searchMonth,
            barWidth: '30%',
            type: 'bar',
            // smooth: true,
            // symbol: 'none',
            // sampling: 'average',
            // itemStyle: {
            //   normal: {
            //     // 描边颜色
            //     color: '#7fb3c9'
            //   }
            // },
            data: this.seriesData
          }, 
          {
            name: this.comparesearchMonth,
            barWidth: '30%',
            type: 'bar',
            // smooth: true,
            // symbol: 'none',
            // sampling: 'average',
            // itemStyle: {
            //   normal: {
            //     // 描边颜色
            //     color: 'rgb(255, 140, 0)'
            //   }
            // },
            data: this.compareseriesData
          }, 
          ]
        };
        this.departmentKPIChart.setOption(option);

      },

      getList() {
        this.loading = true
        this.$axios
          .post("/api/assignee/performance/department/getMonthData",this.$util.encodePostBody( {
            searchMonth: this.searchMonth
          }))
          .then(res => {
            this.loading = false
            if (res.data.code == 0) {

              this.tb.data = res.data.data;
              let tmp = {}
              res.data.data.forEach(function (item) {

                for (var key in item) {
                  if (tmp[key] == undefined) {
                    tmp[key] = [];
                  }
                  tmp[key].push(item[key])
                }
              })
              this.chartData = tmp
              this.xAxisData = tmp.orgName

              this.seriesData = tmp[this.currentChart]

              this.drawChart()


            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            this.loading = false
            console.log(err);
          });
      },
      getcompareList() {
        this.$axios
          .post("/api/assignee/performance/department/getMonthData",this.$util.encodePostBody({
            searchMonth: this.comparesearchMonth
          }))
          .then(res => {
            this.loading = false
            if (res.data.code == 0) {

              //   this.tb.data = res.data.data;
              let tmp = {}
              res.data.data.forEach(function (item) {

                for (var key in item) {
                  if (tmp[key] == undefined) {
                    tmp[key] = [];
                  }
                  tmp[key].push(item[key])
                }
              })
              this.comparechartData = tmp
              this.comparexAxisData = tmp.orgName

              this.compareseriesData = tmp[this.currentChart]
              this.drawChart2()


            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            this.loading = false
            console.log(err);
          });
      },
      // 下载列表
      downloadTable() {
        this.$axios({ // 用axios发送post请求
            method: 'post',
            url: '/api/assignee/performance/department/getMonthDataForDepartmentDownload', // 请求地址
            data: {
               searchMonth: this.searchMonth
            },
            responseType: 'blob' // 表明服务器返回的数据类型
          })
          .then(res => {
            // if(res.data.code == 0){}
            if (res.data.type != 'application/json') {
              const content = res.data;
              const blob = new Blob([content]);
              const fileName = decodeURI(res.headers["content-disposition"].split("=")[1]);
              if ('download' in document.createElement('a')) { // 非IE下载
                const elink = document.createElement('a')
                elink.download = fileName
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href) // 释放URL 对象
                document.body.removeChild(elink)
              } else { // IE10+下载
                navigator.msSaveBlob(blob, fileName)
              }
            } else {
              this.$message({
                type: 'error',
                message: '导出失败'
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      }



    }
  }

</script>

<style lang="scss">
.my-tabs{
  margin-top: 30px;
  margin-left:0!important;
}

</style>
