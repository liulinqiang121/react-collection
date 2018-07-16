<template>
  <div>
    <div class="md">
      <!-- <div class="md-left">催收建议：建议对账</div> -->
      <div class="md-right">
        <el-button size="mini" type="primary" @click="beforeOpenDialog">申请对账</el-button>
      </div>
    </div>
    <el-table ref="multipleTable" :data="accountCheckingTb" tooltip-effect="dark" v-loading="loading" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading" empty-text="暂无数据" show-overflow-tooltip >
      <el-table-column type="index">
      </el-table-column>
      <el-table-column v-for="field in tb.fields" align="left" :prop="field.key" :label="field.label" :width="field.width" :key="field.id">
      </el-table-column>
    </el-table>
    <!-- 添加申请凭证 -->
    <el-dialog title="对账申请" :close-on-click-modal="false" :show-close="true" :visible.sync="dialogVisible" :center="true" @close="closeDialog">
      <el-form ref='dialogForm' :rules="rules" label-width="150px" :model="dialogForm" size="mini">
        <el-form-item label="最新欠款金额" prop="latestDebtMoney">
          <el-input v-model="dropdownData.latestDebtMoney" :disabled="true" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户声明欠款金额" prop="statementAmount">
          <el-input v-model="dialogForm.statementAmount" clearable></el-input>
        </el-form-item>
        <el-form-item label="申请原因" prop="applyReason">
          <el-input type="textarea" :rows="4" placeholder="请输入" v-model="dialogForm.applyReason" clearable>
          </el-input>

        </el-form-item>
        <!-- <el-form-item class="dialog_submit">
        <el-button @click.native.prevent="closeDialog()">取 消</el-button>
        <el-button type="primary" @click.native.prevent="submitDialog()">确 定</el-button>
      </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="closeDialog()">取 消</el-button>
        <el-button type="primary" @click.native.prevent="submitDialog()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  const fields = [{
      key: "applyTime",
      label: "申请时间",
      width: ""
    }, {
      key: "checkTime",
      label: "反馈时间",
      width: ""
    },
    {
      key: "applicantName",
      label: "催收员",
      width: ""
    },
    {
      key: "latestDebtMoney",
      label: "最新欠款金额",
      width: ""
    },
    {
      key: "statementAmount",
      label: "声明欠款金额",
      width: ""
    },
    {
      key: "checkAmount",
      label: "对账欠款金额",
      width: ""
    },
    {
      key: "checkStatusName",
      label: "状态",
      width: ""
    },

  ];
  export default {
    name: "",
    props: {
      accountCheckingTb: Array,
      accountCheckingParam: Object,
      caseDisable: {
        type: Boolean
      }
    },
    data() {
      var validatestatementAmount = (rule, value, callback) => {
        if (value) {
          let pattern = /^[1-9][0-9]{0,9}([.][0-9]{0,2})?$/;
          if (!pattern.test(value)) {
            callback(new Error("最多10位整数和2位小数"));
          }  else {
            // this.$refs['commitMoneyMin'].clearValidate()
            callback();
          }
        } else {
          callback();
        }
      }
      return {
        // 表格
        tb: {
          data: [],
          fields: fields
        },
        // 遮罩表单
        dialogVisible: false,

        dialogForm: {
          applyReason: '',
          latestDebtMoney: '',
          statementAmount: '',
        },
        rules: {
          statementAmount:[{
            validator: validatestatementAmount,
            trigger: "blur",
            type: 'number',
          }]
        },
        loading: false,
        dropdownData: {}
      };
    },
    computed: {},
    created() {},
    methods: {
      beforeOpenDialog(){
        if(this.caseDisable) {
          this.$message.warning('案件已结案，不能再进行操作');
          return false;
        }
        if(this.accountCheckingTb[0] && this.accountCheckingTb[0].checkStatus == 0){
          this.$message.error('对账已有申请，不可再次申请')
        }else{
          this.openDialog()
        }
        
      },
      // 遮罩
      openDialog() {
        if (this.$refs.dialogForm !== undefined) {
          this.$refs.dialogForm.resetFields()
        }
        this.getdropdownData()
        this.dialogVisible = true;
      },

      closeDialog(btn) {
        this.dialogVisible = false
      },

      submitDialog() {
        this.$refs.dialogForm.validate((valid) => {
          if (valid) {


            let param = Object.assign({}, this.dialogForm, this.accountCheckingParam)
            // param.approver = JSON.stringify(param.approver)
            this.$axios.post('/api/assignee/collectionApply/saveCheckBillApply', param).then((res) => {
              if (res.data.code == 0) {
                this.dialogVisible = false
                this.$emit('getaccountCheckingList')
                this.$message({
                  type: 'success',
                  message: res.data.msg
                })

              } else {
                this.$util.failCallback(res.data, this)
              }
            }).catch((err) => {
              console.log(err)
            })
          }
        })
      },

      getdropdownData() {
        this.$axios.post('/api/assignee/collectionApply/checkBillApplyInitParam', this.accountCheckingParam).then((res) => {
          if (res.data.code == 0) {
            this.dropdownData = res.data.data;
            this.dialogForm.latestDebtMoney = res.data.data.latestDebtMoney


          } else {
            this.$util.failCallback(res.data, this)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
    }
  };

</script>
<style scoped>
  .md {
    margin-bottom: 10px;
  }

</style>
