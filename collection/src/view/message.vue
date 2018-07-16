<template>
  <el-row style="height:100%;">
    <el-col :span="3" class="message-aside">
      <p class="aside-title">消息中心</p>
      <el-menu default-active="0" class="el-menu-vertical-demo">
        <el-menu-item :index="item.code" @click="statusChange(item)" v-for="item in statusList" :key="item.id">
          <span slot="title">{{item.name}}
            <span v-if="item.count">{{"("+item.count+")"}}</span>
          </span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="21">
      <div class="content-body">
        <!-- 顶部，包括标题，操作按钮-->
        <div class="bd-top">
          <div class="md clearfix">
            <!-- 1、左边标题 -->
            <div class="md-left">
              <h5>{{currentStatus.name}}</h5>
            </div>
            <!-- 2、右边操作按钮 -->
            <div class="md-right">
            </div>
          </div>
        </div>
        <div class="bd-main">
          <my-tabs :tabList="typeList" :tabIndex="tabIndex" @changeTab="typeChange">
            <keep-alive>
              <el-table ref="multipleTable" height="700" :data="tb.data" tooltip-effect="dark" v-loading="loading" empty-text="暂无数据">
                <el-table-column label="标题内容">
                  <template slot-scope="scope">
                    <!-- type10为未接来电 -->
                    <template v-if="scope.row.type == 10">
                      <span :class="{'message-read':Boolean(scope.row.status)}" @click="readMessage(scope.row)">
                        {{scope.row.title}}
                      <template v-if="scope.row.sign != '[]'&&scope.row.sign != ''">号码关联案件号
                        <a v-for="caseItem in JSON.parse(scope.row.sign)" :key="caseItem.id" href="javascript:void(0)"
                          :class="{'message-read':Boolean(scope.row.status)}" @click="goCaseDetail(caseItem,scope.row)"
                          class="el-button--text el-button--small alink">{{caseItem.caseCode}}&nbsp;
                        </a>
                      </template>
                      </span>
                      

                    </template>
                    <!-- 其他 -->
                    <template v-else>
                      <a href="javascript:void(0)" :class="{'message-read':Boolean(scope.row.status)}" @click="goDetail(scope.row)"
                        class="el-button--text el-button--small alink">
                        {{scope.row.title}}
                      </a>
                    </template>

                  </template>
                </el-table-column>
                <el-table-column v-for="field in tb.fields" align="left" :prop="field.key" :label="field.label" :width="field.width" :key="field.id">
                </el-table-column>
              </el-table>
            </keep-alive>
          </my-tabs>
          <!-- <el-radio-group v-model="currentType" size="mini" style="margin:10px 0;" @change="typeChange">
            <el-radio-button v-for="item in typeList" :label="item.code">{{item.name}}
              <span v-if="currentStatus.code == '0'&&item.count > 0">{{"("+item.count+")"}}</span>
            </el-radio-button>
          </el-radio-group> -->

          <el-pagination small layout="total, prev, pager, next, jumper" :total="total" :current-page.sync="queryParams.currentPage"
            :page-size="queryParams.pageSize" @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
    </el-col>
    <el-dialog title="公告详情" :visible.sync="publishFormVisible" :close-on-click-modal="false">
        <div class="dialog-main">
            <el-form :model="publishForm" label-width="100px">
              <el-form-item label="公告标题" prop="title">
                <el-input v-model="publishForm.title" auto-complete="off"  disabled></el-input>
              </el-form-item>
              <el-form-item label="公告来源" prop="orgName">
                <el-input v-model="publishForm.orgName" auto-complete="off"  disabled></el-input>
              </el-form-item>
              <el-form-item label="发布时间" prop="createTime">
                <el-input v-model="publishForm.createTime" auto-complete="off"  disabled></el-input>
              </el-form-item>
              <el-form-item label="公告内容" prop="content">
                <el-input type="textarea" autosize placeholder="请输入"  v-model="publishForm.content" disabled>
                </el-input>
              </el-form-item>
              <el-form-item label="附件">
                <el-button type="text" @click="download(item)" v-for="item in publishForm.accessory" :key="item.id">{{item.name}}</el-button>
              </el-form-item>
            </el-form>
        </div>


    </el-dialog>
  </el-row>

</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
  import MyTabs from "./public-components/my-tabs2";
  const fields = [{
      key: "reminderDate",
      label: "通知时间",
      width: "150"
    },
    {
      key: "typeName",
      label: "类型",
      width: "200"
    }
  ];

  export default {
    components: {
      MyTabs,
    },
    data() {
      return {
        publishForm: {},
        publishFormVisible: false,
        tabIndex: 5,
        statusList: [{
          code: '',
          name: '全部消息',

        }, {
          code: '0',
          name: '未读消息',
          count: 0,
        }, {
          code: '1',
          name: '已读消息'
        }],
        currentType: 5,
        typeList: [],
        tb: {
          data: [],
          fields: fields,
        },
        loading: false,
        total: 0,
        unReadCount: 0,
        currentStatus: {},
      };
    },
    computed: {
      queryParams() {
        return {
          currentPage: 1,
          pageSize: 15,
          // all
          type: 5,
          status: 0,
        };
      }
    },
    created() {
      this.getList(this.queryParams);
      this.gettypeList()
      this.currentStatus = this.statusList[1]

    },
    methods: {
      getNumberList() {
        this.$axios
          .post("/api/assignee/messageReminder/unread", {})
          .then(res => {
            if (res.data.code == 0) {
              this.unReadCount = res.data.data
              if (this.unReadCount > 0) {
                this.statusList[1].count = this.unReadCount
              }
              // this.currentStatus = 
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      getList(param) {
        this.getNumberList()
        this.gettypeList()
        this.loading = true;
        this.$axios
          .post("/api/assignee/messageReminder/getReminderList", param)
          .then(res => {
            this.loading = false;
            // console.log(res.data)
            if (res.data.code == 0) {
              this.tb.data = res.data.data.items;
              this.total = res.data.data.totalNum;
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      },
      // 筛选-全部/未完成/已完成
      statusChange(item) {
        this.currentStatus = item
        this.queryParams.status = item.code;
        this.getList(this.queryParams);
      },
      // changeTab(tab) {
      //   this.tabIndex = tab.index;
      //   this.queryParams.gtasksType = tab.type;
      //   this.getList(this.queryParams);
      //   // this.componentIndex=tab.index
      //   // tab.method()
      // },
      typeChange(tab) {
        this.tabIndex = tab.code
        this.queryParams.type = tab.code;
        this.getList(this.queryParams);
      },
      gettypeList() {
        this.$axios
          .post("/api/assignee/messageReminder/getReminderType", {})
          .then(res => {
            if (res.data.code == 0) {
              this.typeList = res.data.data
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      readMessage(row){
        // 将消息未读状态改为已读
        if(row.status == 0){
          this.$axios
          .post("/api/assignee/messageReminder/readMessage", {
            id: row.id,
            type: row.type,
          })
          .then(res => {
            if (res.data.code == 0) {
              this.getList(this.queryParams)
              // 更新header-未读消息
              this.$store.dispatch('getunReadCount')
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });
        }
        
      },
      goDetail(row) {
        // 未读时，请求后台接口
        this.readMessage(row);
        // 跳转
        let param = null
        let url = ''
        switch (row.type) {
          // 甲方投诉
          case 0:
            param = this.$util.encrypt(row.sign, 'message');
            url = (window.location.origin ? window.location.origin : '') + '/#/assignee_firstparty_complaint?caseCode=' +
              param;
            // url = window.location.origin + '/#/assignee_firstparty_complaint';
            window.open(url);
            break;
            // 投诉预警
          case 1:
            param = this.$util.encrypt(row.sign, 'message');
            url = (window.location.origin ? window.location.origin : '') + '/#/assignee_complaint_warn?caseCode=' +
              param;
            window.open(url);
            break;
            // 案件分发
          case 2:
            param = this.$util.encrypt(row.sign, 'message');
            url = (window.location.origin ? window.location.origin : '') + '/#/assignee_case_manage?allotStatus=' +
              param;
            window.open(url);
            break;
            // 案件撤销
          case 3:
            param = this.$util.encrypt(row.sign, 'message');
            url = (window.location.origin ? window.location.origin : '') + '/#/assignee_case_manage?caseStatus=' +
              param;
            window.open(url);
            break;
            // 策略配置
          case 4:
            param = this.$util.encrypt(row.sign, 'message');
            url = (window.location.origin ? window.location.origin : '') +
              '/#/assignee_strategy_design?configureStatus=' + param;
            window.open(url);
            break;
            // 公告提醒
          case 9:
            this.$axios
              .post("/api/assignee/messageReminder/detailInfo", {
                id: row.id,
              })
              .then(res => {
                if (res.data.code == 0) {
                  this.publishForm = res.data.data;
                  this.publishFormVisible = true;
                } else {

                }
              })
              .catch(err => {
                console.log(err);
              });
            break;
        }
      },
      // 未接来电没有关联号码时已读
      
      // 未接来电拼接字符串跳转
      goCaseDetail(caseItem,row) {
        // if(row.status == 0){
        //   this.readMessage(row);
        // }
        let caseCode = this.$util.encrypt(caseItem.caseCode + '_' + caseItem.caseId.toString() + '_' + caseItem.caseManageId
          .toString(),
          'caseDetail');
        let url = (window.location.origin ? window.location.origin : '') + '/#/worker_case_detail?id=' + caseCode;
        window.open(url);
      },
      // 分页
      handleCurrentChange(index) {
        this.queryParams.currentPage = index;
        this.getList(this.queryParams);
      },

      download(item) {

        this.$axios({ // 用axios发送post请求
            method: 'post',
            url: '/api/assignee/messageReminder/downLoad', // 请求地址
            data: {
              name: item.name,
              url: item.url,
            }, // 参数
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
                message: '下载失败'
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      }

    }
  };

</script>

<style lang="scss" scoped>
  .item {
    margin-right: 20px;
  }

  .message-aside {
    position: relative;
    height: inherit;

    .aside-title {
      height: 70px;
      line-height: 70px;
      position: absolute;
      right: 0;
      left: 0;
      z-index: 1;
      padding-left: 20px;
      background: #D9DEE4;
      font-weight: bold;

    }
    .el-menu-vertical-demo {
      height: inherit;
      padding-top: 70px;
    }

  }

  .message-read {
    color: #999;
  }

  .my-tabs {
    margin-top: 30px;
    margin-left: 0 !important;
  }
  .alink{
    text-decoration:underline;
  }

</style>
