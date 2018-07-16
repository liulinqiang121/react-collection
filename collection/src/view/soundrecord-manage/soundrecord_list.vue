<template>
  <div>

    <div class="content-body">
      <!-- 顶部，包括标题，操作按钮-->
      <div class="bd-top">
        <div class="md clearfix">
          <!-- 1、左边标题 -->
          <div class="md-left">
            <h5>录音列表</h5>
          </div>
          <!-- 2、右边操作按钮 -->
          <div class="md-right">
            <el-button size="mini" type="primary" style="margin:4px 20px 0 0 " @click.prevent.native="exportRecord">录音导出</el-button>
          </div>
        </div>
      </div>  
      <div class="bd-main">
        <el-form ref="conditionForm" :model="conditionForm" :label-width="this.$util.LABEL_WIDTH" label-position="right" class="condition-form"
          size="mini">
          <div class="el-col fixed-width">
            <el-form-item label="案件编号" prop="caseCode">
              <el-input v-model="conditionForm.caseCode" clearable></el-input>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <el-form-item label="姓名" prop="borrowerName">
              <el-input v-model="conditionForm.borrowerName" clearable></el-input>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <el-form-item label="身份证" prop="borrowerIdnumber">
              <el-input v-model="conditionForm.borrowerIdnumber" clearable></el-input>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <el-form-item label="手机号" prop="borrowerPhone">
              <el-input v-model="conditionForm.borrowerPhone" clearable></el-input>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <el-form-item label="贷款机构" prop="loanInstitution">
              <el-select clearable v-model="conditionForm.loanInstitution" placeholder="请选择">
                <el-option v-for="item in dropdownData.loanInstitution" :key="item.id" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <el-form-item label="批次号" prop="batchCode">
              <el-input v-model="conditionForm.batchCode" placeholder="" clearable></el-input>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <el-form-item label="案件地区" prop="caseArea">
              <el-select clearable v-model="conditionForm.caseArea" placeholder="请选择">
                <el-option v-for="item in dropdownData.caseArea" :key="item.id" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <el-form-item label="户籍地" prop="registeredAddress">
              <el-select clearable v-model="conditionForm.registeredAddress" placeholder="请选择">
                <el-option v-for="item in dropdownData.registeredAddress" :key="item.id" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <!-- <el-select clearable v-model="conditionForm.department" placeholder="请选择">
                <el-option v-for="item in dropdownData.department" :key="item.id" :label="item.name" :value="item.code"></el-option>
              </el-select> -->
            <el-form-item label="部门" prop="department">
              <el-cascader :options="dropdownData.department" change-on-select v-model="department" :props="departmentProps" @change="getDepartmentId"
                clearable>
              </el-cascader>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <el-form-item label="催收员" prop="collectionId">
              <el-select clearable v-model="conditionForm.collectionId" placeholder="请选择">
                <el-option v-for="item in collectionId" :key="item.id" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <el-form-item label="呼叫时间" prop="callTime">
              <el-date-picker v-model="callTime" value-format="yyyy-MM-dd" format="yyyy/MM/dd" type="daterange" @change="callTimeChange"
                clearable>
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <el-form-item label="通话时长" prop="talkTime">
              <el-select clearable v-model="conditionForm.talkTime" placeholder="请选择">
                <el-option v-for="item in dropdownData.talkTime" :key="item.id" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <el-form-item label="通话对象" prop="answering">
              <el-input v-model="conditionForm.answering" placeholder="" clearable></el-input>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <el-form-item label="通话号码" prop="tel">
              <el-input v-model="conditionForm.tel" placeholder="" clearable></el-input>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <el-form-item label="质检状态" prop="qualityStatus">
              <el-select clearable v-model="conditionForm.qualityStatus" placeholder="请选择">
                <el-option v-for="item in dropdownData.qualityStatus" :key="item.id" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <el-form-item label="是否投诉预警" prop="isPrewarning">
              <el-select clearable v-model="conditionForm.isPrewarning" placeholder="请选择">
                <el-option v-for="item in dropdownData.isPrewarning" :key="item.id" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col fixed-width form-btns">
            <el-button size="mini" @click="search" type="primary">搜索</el-button>
            <el-button size="mini" @click="resetForm">重置</el-button>
          </div>
        </el-form>
        <el-table ref="multipleTable" height="460" show-overflow-tooltip :data="tb.data" tooltip-effect="dark" v-loading="loading"
          element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" fixed="left"></el-table-column>
          <el-table-column v-for="field in tb.fields" :align="field.align||'left'" :prop="field.key" :label="field.label" :width="field.width"
            :key="field.id">
          </el-table-column>
          <el-table-column width="120" label="操作" align="center" fixed="right" v-if="operationBtns[0].isShow && operationBtns[1].isShow">
            <template slot-scope="scope">
              <el-button size="mini" :disabled="scope.row.calledTime == 0 || scope.row.calledTime == null" v-on:click.stop.prevent="playRecord(scope)"
                type="text" :class="scope.row.icon" v-if="operationBtns[0].isShow">
              </el-button>
              <el-button size="mini" :disabled="scope.row.calledTime == 0 || scope.row.calledTime == null" v-on:click.stop.prevent="downloadRecord(scope)"
                type="text" class="el-icon-download" v-if="operationBtns[1].isShow">
              </el-button>
              <el-button size="mini" v-on:click.stop.prevent="checkRecord(scope)" :disabled="scope.row.calledTime == 0 || scope.row.calledTime == null || scope.row.qualityInspectionStatus　== '1'　"
                type="text" class="el-icon-edit-outline" v-if="operationBtns[2].isShow">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="total" :pageSize="conditionForm.pageSize" @changePage="changePage" :current-page="conditionForm.currentPage"
          @changeSize="changeSize"></pagination>
      </div>
      <el-dialog :close-on-click-modal="false" :show-close="true" :visible.sync="dialogVisible" :center="true" @close="resetDialog"
        title="录音质检">
        <el-form ref='dialogForm' label-width="140px" :model="dialogForm" class="dialog-main" size="mini">
          <el-form-item label="是否生成投诉预警：" prop="isPrewarning">
            <el-radio v-model="dialogForm.isPrewarning" label="1">是</el-radio>
            <el-radio v-model="dialogForm.isPrewarning" label="0" @change="clearField">否</el-radio>
          </el-form-item>
          <el-form-item label="质检反馈：" prop="qualityInspectionFeedback">
            <el-input type="textarea" v-model="dialogForm.qualityInspectionFeedback" placeholder="请输入质检反馈" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="是否回复：" prop="isAnswer">
            <el-radio v-model="dialogForm.isAnswer" label="1" :disabled="dialogForm.isPrewarning != '1'">是</el-radio>
            <el-radio v-model="dialogForm.isAnswer" label="0" @change="clearField" :disabled="dialogForm.isPrewarning != '1'">否</el-radio>
          </el-form-item>
          <el-form-item label="核实情况：" prop="checkDetail">
            <el-input type="textarea" v-model="dialogForm.checkDetail" placeholder="请输入核实情况" size="mini" :disabled="dialogForm.isAnswer != '1' ||  dialogForm.isPrewarning != '1'"></el-input>
          </el-form-item>
          <el-form-item label="安抚记录：" prop="appeaseRecord">
            <el-input type="textarea" v-model="dialogForm.appeaseRecord" placeholder="请输入安抚记录" size="mini" :disabled="dialogForm.isAnswer != '1' ||  dialogForm.isPrewarning != '1'"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog_submit">
          <el-button type="primary" @click="submitDialog" size="small">提 交</el-button>
          <el-button type="primary" @click="resetDialog" size="small">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  const fields = [{
      key: "id",
      label: '录音编号',
      width: ''
    },
    {
      key: "borrowerName",
      label: "姓名",
      width: ""
    },
    {
      key: "borrowerIdnumber",
      label: "身份证号",
      width: "180"
    },
    {
      key: "borrowerPhone",
      label: "手机号",
      width: "120"
    },
    {
      key: "answering",
      label: "通话对象",
      width: ""
    },
    {
      key: "relation",
      label: "关系",
      width: ""
    },
    {
      key: "callPhone",
      label: "主叫号码",
      width: ""
    },
    {
      key: "calledPhone",
      label: "被叫号码",
      width: ""
    },


    {
      key: "callTime",
      label: "呼叫时间",
      width: "150"
    },
    {
      key: "calledTime",
      label: "通话时长",
      width: ""
    },
    {
      key: "answerStatus",
      label: "接听状态",
      width: ""
    },
    {
      key: "caseArea",
      label: "案件地区",
      width: ""
    },
    {
      key: "registeredAddress",
      label: "户籍地",
      width: ""
    },
    {
      key: "collectionId",
      label: "催收员（坐席号）",
      width: "120"
    },
    {
      key: "department",
      label: "部门",
      width: "120"
    },
    {
      key: "caseCode",
      label: "案件编号",
      width: "110"
    },
    {
      key: "batchCode",
      label: "批次号",
      width: ""
    },
    {
      key: "loanInstitution",
      label: "贷款机构",
      width: ""
    },
    {
      key: "qualityInspectionStatusName",
      label: "质检状态",
      width: "auto"
    },
    {
      key: "qualityInspectionTime",
      label: "质检时间",
      width: ""
    },
    {
      key: "isPrewarning",
      label: "是否投诉预警",
      width: "100"
    },
    {
      key: "qualityInspectionFeedback",
      label: "质检反馈",
      width: ""
    },




  ];
  import qs from "qs";
  import pagination from '../public-components/pagination'
  export default {
    name: "",
    components: {
      pagination
    },
    data() {
      return {
        // 下拉框数据
        dropdownData: {
          department: []
        },
        collectionId: [],
        department: [],
        // 表格
        // 分页
        // total:0,
        currentPage: 1,
        pageSize: 15,
        // 多选
        // 分发案件遮罩

        rules: {
          borrowerName: [
            this.$util.formRule.userName
          ],
          borrowerIdnumber: [
            this.$util.formRule.ID
          ],
          borrowerPhone: [
            this.$util.formRule.phone
          ],
          batchCode: [
            this.$util.formRule.batchCode
          ],
          caseCode: [
            this.$util.formRule.caseCode
          ],
        },
        loading: true,
        pickerOptions2: {
          onPick: function (min, max) {}
        },
        conditionForm: {
          batchCode: '',
          borrowerIdnumber: '',
          borrowerName: '',
          borrowerPhone: '',
          callTimeMax: '',
          callTimeMin: '',
          caseArea: '',
          caseCode: '',
          collectionId: '',
          department: '',
          loanInstitution: '',
          registeredAddress: '',
          talkTime: '',
          qualityStatus: '',
          isPrewarning: '',
          currentPage: 1,
          pageSize: 15
        },
        dialogForm: {
          appeaseRecord: '',
          checkDetail: '',
          isAnswer: '',
          isPrewarning: '',
          qualityInspectionFeedback: '',
          recordId: ''
        },
        callTime: [],
        searchForm: {},
        hasSearch: false,
        total: 0,
        operationBtns: [{
            name: "播放",
            identifier: "sponsor_position_search",
            isShow: true
          },
          {
            name: "下载",
            identifier: "sponsor_position_search",
            isShow: true
          },
          {
            name: '质检',
            identifier: 'sponsor_position_check',
            isShow: true
          }

        ],
        tb: {
          fields: fields,
          data: [],

        },
        hasSearch: false,
        selected: [],
        departmentProps: {
          label: "name",
          value: "id"
        },
        audioUrl: '',
        audio: null,
        playIcon: 'el-icon-service',
        dialogVisible: false,
      };
    },
    computed: {
      basicParams() {
        return {
          currentPage: this.currentPage,
          pageSize: 15,
        };
      }
    },
    created() {
      // 获取该页的identifier
      let param = {
        identifier: this.$route.path.slice(1)
      };
      // this.$util.getPageResourceByMenu(param,this)
      // 获取下拉列表
      this.getDownList();
      this.searchForm = Object.assign({}, this.conditionForm);
      this.getList(this.conditionForm);
    },
    mounted() {
      this.audio = this.$refs.audio;
    },
    methods: {
      // 获取下拉列表
      getDownList() {
        this.$axios.post("/api/assignee/recordingRecord/getSearchInfo", {}).then(
            res => {
              if (res.data.code == 0) {
                this.dropdownData = res.data.data;
                this.dropdownData.loanInstitution.unshift({
                  name: 'All',
                  code: ''
                });
                this.dropdownData.registeredAddress.unshift({
                  name: 'All',
                  code: ''
                });
                this.dropdownData.caseArea.unshift({
                  name: 'All',
                  code: ''
                });
              } else {
                this.$util.failCallback(res.data, this);
              }
            },
            err => {
              console.log(err);
            }
          )
          .catch(err => {
            console.log(err)
          })
      },
      // 通话时间
      callTimeChange(val) {
        if (val) {
          this.conditionForm.callTimeMin = val[0];
          this.conditionForm.callTimeMax = val[1];
        } else {
          this.conditionForm.callTimeMin = '';
          this.conditionForm.callTimeMax = '';
        }
      },

      playRecord(scope) {
        //检查是否有audio
        if (this.audio) {
          this.audio.pause()
        }
        let index = scope.row.id;
        this.tb.data.map((item) => {
          if (item.id != index) {
            item.icon = 'el-icon-service'
          }
        })
        if (typeof scope.row.id == 'string') {
          scope.row.id = Number(scope.row.id);
        } else {
          scope.row.id = String(scope.row.id)
        }
        if (scope.row.icon == 'el-icon-service') {
          scope.row.icon = 'el-icon-loading';

          this.$axios({ // 用axios发送post请求
              method: 'post',
              url: '/api/assignee/recordingRecord/download', // 请求地址
              data: {
                id: Number(scope.row.id)
              }, // 参数
              responseType: 'blob' // 表明服务器返回的数据类型
            })
            .then((res) => { // 处理返回的文件流
              if (res.data.type != 'application/json') {
                const formatArr = (res.headers['content-disposition']).split(".");
                const format = formatArr[formatArr.length - 1];
                const content = res.data;
                const blob = new Blob([content]);
                if ('download' in document.createElement('a')) { // 非IE下载    
                  this.audio = new Audio();
                  this.audio.autoplay = true;
                  this.audio.src = URL.createObjectURL(res.data);
                  if (typeof scope.row.id == 'string') {
                    scope.row.id = Number(scope.row.id);
                  } else {
                    scope.row.id = String(scope.row.id)
                  }
                  scope.row.icon = "el-icon-more";
                  this.audio.play();
                  var self = this;
                  this.audio.onended = function () {
                    if (typeof scope.row.id == 'string') {
                      scope.row.id = Number(scope.row.id);
                    } else {
                      scope.row.id = String(scope.row.id)
                    }
                    self.$message.success('播放完毕');
                    scope.row.icon = "el-icon-service";
                  }
                } else { // IE10+下载
                  navigator.msSaveBlob(blob, fileName)
                }
              } else {
                this.$message({
                  type: 'error',
                  message: '播放失败'
                })
                if (typeof scope.row.id == 'string') {
                  scope.row.id = Number(scope.row.id);
                } else {
                  scope.row.id = String(scope.row.id)
                }
                scope.row.icon = 'el-icon-service'
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else if (scope.row.icon == 'el-icon-more') {
          scope.row.icon = 'el-icon-caret-right';
          this.audio.pause();
        } else if (scope.row.icon == 'el-icon-caret-right') {
          scope.row.icon = 'el-icon-more';
          this.audio.play();
        }
      },


      // 下载
      downloadRecord(scope) {
        let id = scope.row.id;
        this.$axios({ // 用axios发送post请求
            method: 'post',
            url: '/api/assignee/recordingRecord/download', // 请求地址
            data: {
              id: id
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
      },

      // 导出
      exportRecord() {
        if (!this.selected.length) {
          this.$alert("请选择录音记录！", "提示", {
            confirmButtonText: "确定",
            type: 'warning'
          });
          return false;
        }
        this.$axios({ // 用axios发送post请求
            method: 'post',
            url: '/api/assignee/recordingRecord/batchExport', // 请求地址
            data: {
              ids: this.selected
            }, // 参数
            responseType: 'blob' // 表明服务器返回的数据类型
          })
          .then(res => {
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

      },

      // 搜索
      search() {
        this.$refs.conditionForm.validate((valid) => {
          if (valid) {
            this.searchForm = Object.assign({}, this.conditionForm);
            if (this.conditionForm.currentPage == 1) {
              this.getList(this.conditionForm);
            } else {
              this.conditionForm.currentPage = 1;
              this.getList(this.conditionForm);
              this.hasSearch = true;
            }
          }
        })
      },
      // 重置
      resetForm() {
        this.$refs.conditionForm.resetFields();
        this.callTime = []
        this.conditionForm.callTimeMax = '';
        this.conditionForm.callTimeMin = '';
        this.department = [];
        this.conditionForm.departmentId = ''
        this.searchForm = Object.assign({}, this.conditionForm)
        if (this.conditionForm.currentPage == 1) {
          this.getList(this.conditionForm);
        } else {
          this.conditionForm.currentPage = 1;
          this.getList(this.conditionForm);
          this.hasSearch = true;
        }
      },
      // 获取表格数据
      getList(data) {
        var queryParams;
        if (data) {
          queryParams = data
        } else {
          queryParams = this.conditionForm
        }
        this.loading = true;
        this.$axios
          .post("/api/assignee/recordingRecord/search", queryParams)
          .then(res => {
            this.loading = false;
            // console.log(res.data.data);
            if (res.data.code == 0) {
              this.tb.data = res.data.data.items;
              this.tb.data.map((item) => {
                item.icon = 'el-icon-service'
              })
              this.total = res.data.data.totalNum;
            } else {
              this.$util.failCallback(res.data, this);
            }
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
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
          this.getList(this.conditionForm);
        }
      },
      // 表格分页
      changePage(index) {
        this.searchForm.currentPage = index;
        if (this.hasSearch) {
          this.getList(this.conditionForm);
          this.hasSearch = false;
        } else {
          this.conditionForm = Object.assign({}, this.searchForm);
          this.getList(this.searchForm);
        }
      },
      // 选择录音
      handleSelectionChange(arr) {
        this.selected = [];
        arr.forEach(element => {
          this.selected.push(element.id)
        });
      },
      // 选择部门
      getDepartmentId(currentVal) {
        if (currentVal.length == 0) {
          this.collectionId = []
          this.conditionForm.collectionId = ''
          this.conditionForm.department = ''
        } else {
          this.conditionForm.department = this.department[this.department.length - 1];
          this.$axios
            .post("/api/assignee/recordingRecord/getStaff", {
              departmentId: this.conditionForm.department
            })
            .then(res => {
              if (res.data.code == 0) {
                this.collectionId = res.data.data;
                // this.collectionId = [{"code":'null',"name":"袁哈哈(cuishouA000008)"}]
              } else {
                this.$util.failCallback(res.data, this);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }

      },
      // 添加质检
      checkRecord(scope) {
        this.dialogForm.recordId = scope.row.id;
        this.dialogVisible = true;
      },
      // 提交质检
      submitDialog() {
        this.$axios
          .post("/api/assignee/recordingRecord/recordQuality", this.dialogForm)
          .then(res => {
            if (res.data.code == 0) {
              this.$message.success('提交成功');
              this.resetDialog();
              this.conditionForm.currentPage = 1;
              this.getList();
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 关闭弹窗
      resetDialog() {
        this.$refs.dialogForm.resetFields();
        this.dialogVisible = false;
      },
      // 录音质检清除文件
      clearField() {
        this.dialogForm.appeaseRecord = '';
        this.dialogForm.checkDetail = '';
      }

    }
  };

</script>

<style lang="scss" scoped>
  .el-icon-service,
  .el-icon-download {
    font-size: 18px;
    &:hover {
      color: #67c23a
    }
  }

  .el-icon-service,
  .el-icon-download {
    font-size: 18px;
    &:hover {
      color: #67c23a
    }
  }

  .el-icon-caret-right,
  .el-icon-more,
  .el-icon-loading {
    font-size: 18px;
  }

  .el-icon-edit-outline,
  .el-icon-view {
    font-size: 17px;
  }

</style>
