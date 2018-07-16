<template>
  <div>

    <div class="content-body">
      <!-- 顶部，包括标题，操作按钮-->
      <div class="bd-top">
        <div class="md clearfix">
          <!-- 1、左边标题 -->
          <div class="md-left">
            <h5>任务详情</h5>
          </div>
          <!-- 2、右边操作按钮 -->
          <div class="md-right">
          </div>
        </div>
      </div>
      <div class="bd-main">
        <el-form ref="conditionForm" :model="conditionForm" :label-width="this.$util.LABEL_WIDTH" label-position="right" class="condition-form"
          size="mini">
          <div class="el-col fixed-width">
            <el-form-item label="案件编号" prop="caseCode">
              <el-input v-model="conditionForm.caseCode" placeholder="" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="el-col fixed-width">
            <el-form-item label="手机号" prop="borrowerPhone">
              <el-input v-model="conditionForm.borrowerPhone" placeholder="" clearable></el-input>
            </el-form-item>
          </div>
          <div class="el-col fixed-width form-btns">
            <el-button size="mini" @click="search" type="primary">搜索</el-button>
            <el-button size="mini" @click="reset">重置</el-button>
          </div>
        </el-form>
        <el-table ref="multipleTable" height="650" :data="tb.data" tooltip-effect="dark" v-loading="loading" element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading" @selection-change="handleSelectionChange">
          <el-table-column v-for="field in tb.fields" :align="field.align||'left'" :prop="field.key" :label="field.label" :width="field.width"
            :key="field.id">
            <template slot-scope="scope">
              <!-- 普通样式 -->
              <template v-if="field.type == '0'">
                {{scope.row[scope.column.property]}}
              </template>
              <!-- 按钮类型 -->
              <template v-if="field.type == '1'">
                <el-button size="mini" @click.native.prevent="" type="text">
                  {{scope.row[scope.column.property]}}
                </el-button>
              </template>
              <!-- a标签 -->
              <template v-if="field.type == '2'">
                <a href="javascript:void(0)"  style="text-decoration:underline;" class="el-button--text el-button--small">{{scope.row[scope.column.property]}}</a>
              </template>
            </template>

          </el-table-column>
        </el-table>
        <el-pagination small :total="total" :current-page.sync="conditionForm.currentPage" :page-size="conditionForm.pageSize" @current-change="handleCurrentChange"
          layout="sizes,total, prev, pager, next,jumper" @size-change="changeSize" :page-sizes="[15, 50, 100]">
        </el-pagination>
      </div>

    </div>
  </div>

</template>
<script>
  const fields = [{
      key: 'caseCode',
      label: '案件编号',
      width: 'auto',
      type: '0'
    },
    {
      key: 'borrowerPhone',
      label: '手机号',
      width: '150',
      type: '0'
    },
    {
      key: 'callStartTime',
      label: '开始时间',
      width: '',
      type: '0'
    },
    {
      key: 'callEndTime',
      label: '结束时间',
      width: '',
      type: '0',
      // caseListType: '1'
    },
    {
      key: 'callStatusName',
      label: '呼叫状态',
      width: '',
      type: '0',
      // caseListType: '1'
    },
    {
      key: 'billsec',
      label: '通话时长',
      width: '',
      type: '0',
      // caseListType: '1'
    },

    {
      key: 'successCallTimes',
      label: '成功次数',
      width: '150',
      type: '0'
    },
    {
      key: 'failCallTimes',
      label: '失败次数',
      width: '',
      type: '0',
      // caseListType: '1'
    },

    {
      key: 'staffName',
      label: '催收员',
      width: '150',
      type: '0'
    },
  ]
  export default {
    components: {},
    computed: {},
    created() {
      // 获取该页的identifier
    //   let param = {
    //     identifier: this.$route.path.slice(1)
    //   }
      var taskId = this.$route.query.taskId ? this.$util.decrypt(this.$route.query.taskId, 'call'):'';
      //console.log(this.$router)
      // this.$util.getPageResourceByMenu(param,this)
      this.conditionForm.taskId = taskId;
      this.searchForm = Object.assign({}, this.conditionForm);
      this.getList(this.conditionForm);
      this.getdropdownData()


    },
    data() {

      return {
        conditionForm: {
          borrowerPhone: '',
          caseCode: '',
          taskId: '',
          currentPage:1,
          pageSize:15,
        },
        tb: {
          data: [],
          fields: fields,

        },
        loading: true,
        total: 0,
        dropdownData: {
          status: []
        },
        rules: {

        }
      }
    },
    methods: {
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
            //   this.conditionForm.currentPage = 1;
          }
        })
      },
      reset() {
        this.$refs.conditionForm.resetFields();
        this.searchForm = Object.assign({}, this.conditionForm)
        if (this.conditionForm.currentPage == 1) {
          this.getList(this.conditionForm);
        } else {
          this.conditionForm.currentPage = 1;
          this.hasSearch = true;
        }
      },
      handleCurrentChange(index) {
        this.searchForm.currentPage = index;
        if (this.hasSearch) {
          this.getList(this.conditionForm);
          this.hasSearch = false;
        } else {
          this.conditionForm = Object.assign({}, this.searchForm);
          this.getList(this.searchForm);
        }
      },
      getdropdownData() {
        // 获取下拉数据
        this.$axios.post('/api/assignee/proactiveCallManage/queryPredictiveCallTaskConditionInit', {}).then((res) => {
          if (res.data.code == 0) {
            this.dropdownData.status = res.data.data;

          } else {
            this.$util.failCallback(res.data, this)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      // 获取数据列表
      getList(data) {
        var queryParams;
        if (data) {
          queryParams = data
        } else {
          queryParams = this.conditionForm
        }
        this.loading = true;
        this.$axios.post('/api/assignee/proactiveCallManage/queryPreCallDetailCondition', queryParams).then((res) => {
          if (res.data.code == 0) {
            this.tb.data = res.data.data.items;
            this.total = res.data.data.totalNum;
          } else {
            this.$util.failCallback(res.data, this)
          }
          this.loading = false;
        }).catch((err) => {
          this.loading = false
          console.log(err)
        })
      },

      // 改变分页size
      changeSize(index) {
        this.conditionForm.pageSize = index;
        this.searchForm.pageSize = index;
        if (this.conditionForm.currentPage == 1) {
          this.getList(this.conditionForm)
        } else {
          this.conditionForm.currentPage = 1;
        }
      },
      // 重置搜索条件
      // reset(form) {

      //   this.$refs.conditionForm.resetFields()
      //   this.dateObjs = {
      //     commitDate: '',
      //     limitDate: ''

      //   }
      //   this.getList(this.basicParams)
      // },
      dialogCloseHandle(btn) {
        btn.dialog.dialogFormVisible = false
      },

      handleSelectionChange(selection) {
        // this.selected = selection
      },
    }
  }

</script>
<style lang="scss">


</style>
