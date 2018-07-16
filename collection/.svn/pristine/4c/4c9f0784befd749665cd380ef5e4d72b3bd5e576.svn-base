<template>
  <div>
    <div class="content-body">
      <!-- 顶部，包括标题，操作按钮-->
      <div class="bd-top">
        <div class="md clearfix">
          <!-- 1、左边标题 -->
          <div class="md-left">
            <h5>我的工单</h5>
          </div>
          <!-- 2、右边操作按钮 -->
          <div class="md-right">
          </div>
        </div>
      </div>
      <div class="bd-main">
        <el-form ref="conditionForm" :model="conditionForm" :label-width="this.$util.LABEL_WIDTH" size="mini" label-position="right"
          class="condition-form">
          <div class="el-col fixed-width">
            <el-form-item label="工单编号" prop="code">
              <el-input v-model="conditionForm.code"></el-input>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <el-form-item label="时间" prop="commitDate">
              <el-date-picker v-model="conditionForm.commitDate" value-format="yyyy-MM-dd" type="daterange" @change="commitDateChange"
                start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <el-form-item label="关键字" prop="content">
              <el-input v-model="conditionForm.content"></el-input>
            </el-form-item>
          </div>

          <div class="el-col fixed-width">
            <el-form-item label="状态" prop="status">
              <el-select v-model="conditionForm.status" placeholder="请选择">
                <el-option label="All" value=""></el-option>
                <el-option :label="item.name" :value="item.code" v-for="item in dropdownData.statusList" :key="item.code"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <el-form-item label="工单类型" prop="questionType">
              <el-select v-model="conditionForm.questionType" placeholder="请选择">
                <el-option label="All" value=""></el-option>
                <el-option :label="item.name" :value="item.code" v-for="item in dropdownData.questionList" :key="item.code"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col fixed-width form-btns">
            <el-button size="mini" @click="search" type="primary">搜索</el-button>
            <el-button size="mini" @click="reset">重置</el-button>
          </div>


        </el-form>
        <el-table ref="multipleTable" :data="tb.data" tooltip-effect="dark" max-height="650" v-loading="loading" element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading">
          <el-table-column v-for="field in tb.fields" :align="field.align||'left'" :prop="field.key" :label="field.label" :width="field.width"
            :key="field.id">
            <template slot-scope="scope">
              <!-- 普通样式 -->
              <template v-if="field.type == '0'">
                {{scope.row[scope.column.property]}}
              </template>
              <!-- 按钮类型 -->
              <template v-if="field.type == '1'">
                <el-button @click.native.prevent="" type="text" size="small">
                  {{scope.row[scope.column.property]}}
                </el-button>
              </template>
              <!-- a标签 -->
              <template v-if="field.type == '2'">
                <a href="javascript:void(0)" @click="downLoad(scope,field.caseListType)" style="text-decoration:underline;" class="el-button--text el-button--small">{{scope.row.isFile=='0'?'':'附件可下载'}}</a>
                <!-- <a href="/consigner/repayment/voucherDownload" download="文件名.txt" style="text-decoration:underline;" class="el-button--text el-button--small">{{scope.row[scope.column.property]==''?'':'附件可下载'}}</a> -->
              </template>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <!-- {code: "1", name: "正在处理"}
              {code: "2", name: "处理完成"}
              {code: "3", name: "已评价"}
              {code: "4", name: "已关闭"} -->
              <el-button type="text" @click="openDetailDialog(operationBtns[0],scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="total" @changePage="handleCurrentPage" :pageSize="conditionForm.pageSize" :currentPage="conditionForm.currentPage"
          @changeSize="changeSize"></pagination>
        <el-dialog :title="operationBtns[0].dialog.title" :visible.sync="operationBtns[0].dialog.dialogFormVisible" :close-on-click-modal="false"
          @close="dialogCloseTrigger(operationBtns[0])" size="small">
          <el-form size="mini" :model="operationBtns[0].dialog.form" label-width="100px" :rules="operationBtns[0].dialog.rule" class="dialog-main">
            <el-form-item label="工单类型" prop="questionTypeName">
              <el-input v-model="operationBtns[0].dialog.form.questionTypeName" auto-complete="off" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="优先级" prop="priority">
              <el-radio-group v-model="operationBtns[0].dialog.form.priority">
                <el-radio v-for="item in dropdownData.priorityList" :label="item.code" :key="item.id" disabled>{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="问题描述" prop="content">
              <el-input type="textarea" v-model="operationBtns[0].dialog.form.content" auto-complete="off" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="operationBtns[0].dialog.form.email" auto-complete="off" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="附件">
              <el-button type="text" @click="download(item)" v-for="item in operationBtns[0].dialog.form.filesBean" :key="item.id">{{item.name}}</el-button>
            </el-form-item>
            <!-- 工单状态为 处理完成，可后续操作 -->
            <template v-if="operationBtns[0].dialog.form.status == 2 || operationBtns[0].dialog.form.status == 3">
              <el-form-item label="反馈时间" prop="updateTime">
                <el-input v-model="operationBtns[0].dialog.form.updateTime" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="反馈结果" prop="feedback">
                <el-input type="textarea" v-model="operationBtns[0].dialog.form.feedback" auto-complete="off" disabled></el-input>
              </el-form-item>

            </template>
            <!-- 有后续问题 -->
            <template v-if="operationBtns[0].dialog.form.followIssue.length>0" v-for="(followIssueItem,index) in operationBtns[0].dialog.form.followIssue">
              <el-form-item label="问题描述" prop="followContent">
                <el-input type="textarea" v-model="followIssueItem.followContent" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="附件">
                <el-button type="text" @click="download(item)" v-for="item in followIssueItem.issueFiles" :key="item.id">{{item.name}}</el-button>
              </el-form-item>
              <el-form-item label="反馈结果" prop="feedback">
                <el-input type="textarea" v-model="followIssueItem.feedback" auto-complete="off" disabled></el-input>
              </el-form-item>
            </template>

            <el-form-item label="工单状态" prop="statusName">
              <el-input v-model="operationBtns[0].dialog.form.statusName" auto-complete="off" disabled size="small"></el-input>
            </el-form-item>
            <el-form size="mini" class="commentForm" label-width="100px" :model="commentForm"  ref="commentForm">
              <template v-if="operationBtns[0].dialog.form.status == 2">
                <el-form-item label="是否解决了您的问题">
                  <el-radio-group v-model="hasSolve">
                    <el-radio-button :label="true">是</el-radio-button>
                    <el-radio-button :label="false">否</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <!-- 解决了=>评价 -->
                <template v-if="hasSolve == true">
                  <el-form-item label="评价" prop="feedbackLevel">
                    <el-rate v-model="commentForm.feedbackLevel" show-score text-color="#ff9900" score-template="{value}">
                    </el-rate>
                  </el-form-item>
                </template>
                <!-- 没解决=>继续提问 -->
                <template v-else>
                  <el-form-item label="问题描述" prop="content" :rules="[{required:true,message:'必填项',trigger:'change,blur'}]">
                    <el-input type="textarea" v-model="commentForm.content" auto-complete="off" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="附件" prop="files" :rules="[{required:true,message:'必填项',trigger:'change,blur'}]">
                    <a href="javascript:;" class="a-upload">
                      <input type="file" name="files" @change="uploadImg" id="logo_img" title="" multiple>上传附件
                    </a>
                    <ul id="fileName">
                      <li class="fileName el-upload-list__item is-finished" v-for="(item,index) in commentForm.files" :key="item.id" :index="index">{{item.name}}
                        <i class="el-icon-close" @click="deleteFile(index)"></i>
                      </li>
                    </ul>
                    <el-input v-show="false" v-model="commentForm.files[0]"></el-input>
                  </el-form-item>
                </template>
              </template>
            </el-form>
          </el-form>
           <div class="dialog_submit">
              <el-button v-if="operationBtns[0].dialog.form.status == 1" size="small" @click.native.prevent="closeWork(operationBtns[0])">关闭工单</el-button>
              <el-button v-else-if="operationBtns[0].dialog.form.status == 2" size="small" @click.native.prevent="dialogSubmitHandle(operationBtns[0])">提交</el-button>
            </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import * as util from "../../util/util.js";
  import pagination from '../public-components/pagination.vue'


  // import comTable from '../../public-components/test'
  export default {
    components: {
      pagination
    },
    data() {
      return {
        hasSolve: true,
        dropdownData: {

        },
        conditionForm: {
          code: "",
          content: "",
          commitDate: [],
          commitDateMax: '',
          commitDateMin: '',
          status: '',
          questionType: "",
          currentPage: 1,
          pageSize: 15,
        },
        operationBtns: [{
          name: '工单详情',
          identifier: 'sponsor_position_create',
          dialog: {
            dialogFormVisible: false,
            form: {

            },
            rule: {},
            formName: 'createForm',
            url: '/api/consigner/approve/checkBill',
            title: '工单详情',
          },
          isShow: false,
        }],
        commentForm: {
          content: "",
          feedbackLevel: 5,
          files: [],
          id: "",
        },
        formData: {},
        searchForm: {},
        hasSearch: false,
        // 表格
        tb: {
          data: [],
          fields: [{
              label: "工单编号",
              key: "code",
              width: "auto",
              type: "0"
            },
            {
              label: "问题内容",
              key: "content",

              width: "280",
              type: "0"
            },
            {
              label: "提交时间",
              key: "createTime",
              width: "auto",
              type: "0"
            },
            {
              label: "工单类型",
              key: "questionTypeName",
              width: "auto",
              type: "0",
            },
            {
              label: "状态",
              key: "statusName",
              width: "auto",
              type: "0",
            },

          ],
        },

        currentPage: 1,
        total: 0,
        loading: true,
        tempRow: {},

      };
    },
    computed: {

    },
    created() {
      this.searchForm = Object.assign({}, this.conditionForm);
      this.getList(this.conditionForm);
      this.getdropdownData()
    },
    methods: {

      dialogCloseTrigger(btn) {
        btn.dialog.form = {};
        this.commentForm = {
          content: "",
          feedbackLevel: 5,
          files: [],
          id: "",
        };
        this.hasSolve = true;
      },
      closeWork(btn) {
        this.$axios.post('/api/assignee/workOrder/closeWorkOrder', {
          id: btn.dialog.form.id
        }).then((res) => {
          if (res.data.code == 0) {
            btn.dialog.dialogFormVisible = false
            btn.dialog.form = {}
            this.getList(this.conditionForm)
          } else {
            util.failCallback(res.data, this)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      // 上传文件
      uploadImg() {
        var files = document.getElementById('logo_img').files;
        if (files && files.length) {
          for (let item of files) {
            let size = item.size / 1024 / 1024;
            if (size > 8) {
              this.$message.error('文件不能大于2M');
              return false;
            }
            this.commentForm.files.push(item);
          }
        }

      },
      // 删除文件
      deleteFile(index) {
        this.commentForm.files.splice(index, 1);
      },
      // 提交表单
      dialogSubmitHandle(btn) {
        this.$refs.commentForm.validate((valid) => {
          if (valid) {
            if (this.commentForm.files.length > 5) {
              this.$message.warning('文件数量最多为5');
              return false;
            };

            this.formData = new FormData();
            this.formData.append('id', btn.dialog.form.id);
            if (this.hasSolve) {
              // 解决了问题
              this.formData.append('feedbackLevel', this.commentForm.feedbackLevel);
            } else {
              // 未解决问题
              for (var item of this.commentForm.files) {
                this.formData.append('files', item);
              }
              this.formData.append('content', this.commentForm.content);
            }

            // this.formData.append('email', this.commentForm.email);
            // this.formData.append('priority', this.commentForm.priority);
            // this.formData.append('questionType', this.commentForm.questionType);
            this.$axios
              .post("/api/assignee/workOrder/commentWorkOrder", this.formData)
              .then(res => {
                if (res.data.code == 0) {
                  this.$message({
                    type: 'success',
                    message: '保存成功'
                  })
                  this.dialogCloseHandle(btn);
                } else {
                  this.$util.failCallback(res.data, this);
                }
              })
              .catch(err => {
                console.log(err);
              });
          }


        })

      },
      dialogCloseHandle(btn) {
        btn.dialog.dialogFormVisible = false
      },
      openDetailDialog(btn, row) {
        // this.tempRow = Object.assign({}, row)


        // btn.dialog.form = this.tempRow
        this.$axios.post('/api/assignee/workOrder/getWorkOrderDetail', {
          id: row.id
        }).then((res) => {
          if (res.data.code == 0) {
            btn.dialog.form = res.data.data
            btn.dialog.dialogFormVisible = true
          } else {
            util.failCallback(res.data, this)
          }
        }).catch((err) => {
          console.log(err)
        })


      },
      getdropdownData() {
        // 获取下拉数据
        this.$axios.post('/api/assignee/workOrder/getInitValues', {}).then((res) => {
          if (res.data.code == 0) {
            this.dropdownData = res.data.data

          } else {
            util.failCallback(res.data, this)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getList(data) {
        var queryParams;
        if (data) {
          queryParams = data
        } else {
          queryParams = this.conditionForm
        }
        this.loading = true;
        this.$axios
          .post("/api/assignee/workOrder/getWorkOrderList", queryParams)
          .then(res => {
            if (res.data.code == 0) {
              // console.log(res.data);
              this.tb.data = res.data.data.items;
              this.total = res.data.data.totalNum;
            } else {
              util.failCallback(res.data, this);
            }
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      },
      // 改变页数
      changeSize(index) {
        this.conditionForm.pageSize = index;
        this.searchForm.pageSize = index;
        if (this.conditionForm.currentPage == 1) {
          this.getList(this.conditionForm)
        } else {
          this.conditionForm.currentPage = 1;
        }
      },

      // 申请时间
      commitDateChange(val) {
        if (val == null) {
          this.conditionForm.commitDateMin = ''
          this.conditionForm.commitDateMax = ''
          return;
        }
        this.conditionForm.commitDateMin = val[0];
        this.conditionForm.commitDateMax = val[1];
      },

      search() {
        this.$refs.conditionForm.validate((valid) => {
          if (valid) {
            this.searchForm = Object.assign({}, this.conditionForm);
            if (this.conditionForm.currentPage == 1) {
              this.getList(this.conditionForm);
            } else {
              this.conditionForm.currentPage = 1;
              this.hasSearch = true;
            }
          }
        })
      },
      reset() {
        this.$refs.conditionForm.resetFields();
        this.conditionForm.commitDateMin = '';
        this.conditionForm.commitDateMax = '';
        this.searchForm = Object.assign({}, this.conditionForm)
        if (this.conditionForm.currentPage == 1) {
          this.getList(this.conditionForm);
        } else {
          this.conditionForm.currentPage = 1;
          this.hasSearch = true;
        }
      },
      // 分页
      handleCurrentPage(val) {
        this.searchForm.currentPage = val;
        if (this.hasSearch) {
          this.getList(this.conditionForm);
          this.hasSearch = false;
        } else {
          this.conditionForm = Object.assign({}, this.searchForm);
          this.getList(this.searchForm);
        }
      },
      download(item) {

        this.$axios({ // 用axios发送post请求
            method: 'post',
            url: '/api/assignee/workOrder/downLoad', // 请求地址
            data: {
              name: item.name,
              url: item.url,
              id: item.id,
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
.commentForm{
  width: 100%;
}

</style>
