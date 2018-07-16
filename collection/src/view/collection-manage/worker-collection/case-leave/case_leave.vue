<template>
  <div>
    <div class="md">
      <!-- <div class="md-left">催收建议：建议留案</div> -->
      <div class="md-right">
        <el-button size="mini" type="primary" @click="beforeOpenDialog">申请留案</el-button>
      </div>
    </div>
    <el-table ref="multipleTable" :data="caseLeaveTb" tooltip-effect="dark" v-loading="loading" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading" empty-text="暂无数据" show-overflow-tooltip>
      <el-table-column type="index">
      </el-table-column>
      <el-table-column v-for="field in tb.fields" align="left" :prop="field.key" :label="field.label" :width="field.width" :key="field.id">
      </el-table-column>
    </el-table>
    <!-- 添加申请凭证 -->
    <el-dialog title="留案申请" :close-on-click-modal="false" :show-close="true" :visible.sync="dialogVisible" :center="true" @close="closeDialog">
      <el-form ref='dialogForm' :rules="rules" label-width="100px" :model="dialogForm" size="small" class="dialog-main">
        <el-form-item label="留案到期日" prop="applyTime" :rules="[{required:'true',message:'必填项',trigger:'change'}]">
          <el-date-picker v-model="dialogForm.applyTime" :picker-options="pickerOptions0" type="datetime" placeholder="选择" value-format="yyyy-MM-dd"
            format="yyyy/MM/dd" clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申请原因" prop="applyReason">
          <el-input type="textarea" :rows="4" placeholder="请输入" v-model="dialogForm.applyReason" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="特殊案情原因" prop="specialReason">
          <el-input type="textarea" :rows="4" placeholder="请输入" v-model="dialogForm.specialReason" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="审批人" prop="approver" :rules="[{required:'true',message:'必填项',trigger:'change'}]">
          <el-select v-model="dialogForm.approver" placeholder="请选择" @change="approverChange" value-key="staffId">
            <el-option v-for="item in dropdownData.approver" :key="item.id" :label="item.staffName" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="dialog_submit">
          <el-button size="small" @click.native.prevent="closeDialog()">取 消</el-button>
          <el-button size="small" type="primary" @click.native.prevent="submitDialog()">确 定</el-button>
        </div>
      </el-form>

    </el-dialog>
  </div>
</template>
<script>
  const fields = [{
      key: "applyTime",
      label: "留案申请时间",
      width: ""
    }, {
      key: "leaveCaseTime",
      label: "留案到期日",
      width: ""
    },
    {
      key: "applyReason",
      label: "申请原因",
      width: ""
    },
    {
      key: "specialReason",
      label: "特殊案情原因",
      width: ""
    },
    {
      key: "approveStatusName",
      label: "状态",
      width: ""
    },
    {
      key: "refuseReason",
      label: "拒绝原因",
      width: ""
    },
    {
      key: "operateDate",
      label: "处理时间",
      width: ""
    },



  ];
  export default {
    name: "",
    props: {
      caseLeaveTb: Array,
      caseLeaveParam: Object,
      caseDisable: {

      }
    },
    data() {
      var validatestatementAmount = (rule, value, callback) => {
        if (value) {
          let pattern = /^[1-9][0-9]{0,9}([.][0-9]{0,2})?$/;
          if (!pattern.test(value)) {
            callback(new Error("最多10位整数和2位小数"));
          } else {
            // this.$refs['commitMoneyMin'].clearValidate()
            callback();
          }
        } else {
          callback();
        }
      }
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() <= (Date.now());
          }
        },
        // 表格
        tb: {
          data: [],
          fields: fields
        },
        // 遮罩表单
        dialogVisible: false,

        dialogForm: {
          applyReason: '',
          applyTime: '',
          approver: '',
          specialReason: '',
        },
        rules: {
          statementAmount: [{
            validator: validatestatementAmount,
            trigger: "blur",
            type: 'number',
          }]
        },
        loading: false,
        dropdownData: {
          approver: []
        }
      };
    },
    computed: {},
    created() {},
    methods: {
      approverChange(){},
      beforeOpenDialog() {
        if (this.caseDisable) {
          this.$message.warning('案件已结案，不能再进行操作');
          return false;
        }
        if (this.caseLeaveTb[0] && this.caseLeaveTb[0].checkStatus == 0) {
          this.$message.error('留案已有申请，不可再次申请')
        } else {
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
            let param = Object.assign({}, this.dialogForm, this.caseLeaveParam)
            // param.approver = JSON.stringify(param.approver)
            this.$axios.post('/api/assignee/collectionApply/saveCaseLeaveApply', param).then((res) => {
              if (res.data.code == 0) {
                this.dialogVisible = false
                this.$emit('getcaseLeaveList')
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
        //   this.caseLeaveParam
        this.$axios.post('/api/assignee/collectionApply/caseLeaveInitParam', {}).then((res) => {
          if (res.data.code == 0) {
            this.dropdownData.approver = res.data.data.approver;

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
<style scoped lang="scss">
  .md {
    margin-bottom: 10px;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%
  }

</style>
