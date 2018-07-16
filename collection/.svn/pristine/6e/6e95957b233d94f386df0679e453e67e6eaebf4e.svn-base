<template>
  <div class="sms">
    <el-dialog :title="'( '+this.phoneInfo.relation+' )'+this.phoneInfo.phone" :visible.sync="smsVisible" :close-on-click-modal="false" @open="getSmsInfo" :before-close="handleClose">
      <div class="latestSms" v-if="latestSms">
        <p>{{latestSms}}</p>
      </div>
      <el-form label-width="120px" label-position="right">
        <el-form-item label="短信模板">
          <el-select value-key="templateName" v-model="templateName" placeholder="请选择" size="mini" class="selection" @change="templateChange" clearable>
            <el-option :label="item.templateName" :value="item" v-for="item in smsTemplates" :key="item.templateName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form label-width="120px" label-position="right">
        <el-form-item label="短信内容" prop="template">
          <el-input type="textarea" :rows="6" placeholder="请输入" v-model="template" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="sendSms">发送</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
  export default {
    props: {
      smsVisible: {
        type: Boolean
      },
      onLineData: {
        type: Object
      },
      phoneInfo: {
        type: Object
      }
    },
    components: {},
    data() {
      return {
        // relation: '朋友',
        // phone: '15751004214',
        // dialogFormVisible: false,
        template: '',
        templateType:'',
        smsTemplates: [
        ],
        latestSms: '',
        templateName: '',

      }
    },
    created() {
        this.getSmsInfo()
    },
    computed: {

    },
    methods: {
      getSmsInfo() {
        this.$axios
          .post("/api/assignee/sms/contact/getSmsInfo", {
            borrowerName: this.onLineData.borrowerName,
            latestDebtMoney: this.onLineData.latestDebtMoney,
            loanInstitution: this.onLineData.loanInstitution,
            caseId: this.onLineData.caseId,
            productName: this.onLineData.productName,

            name: this.phoneInfo.name,
            // origin: this.phoneInfo.origin,
            // originId: this.phoneInfo.originId,

            source:this.phoneInfo.source,
            id:this.phoneInfo.id,


          })
          .then(res => {
            if (res.data.code == 0) {
              this.latestSms = res.data.data.latestSms
              this.smsTemplates = res.data.data.smsTemplates
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      templateChange(data) {
        this.templateType = data.templateType
        this.template = data.template
      },
      sendSms() {
        if (this.template == '') {
          // 提示选择
          this.$alert('请选择短信模板进行操作', '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          });
        } else {
          this.$axios
            .post("/api/assignee/sms/contact/sendSms", {
              caseId: this.onLineData.caseId,
              name: this.phoneInfo.name,
            //   phone: this.phoneInfo.phone,
              relation: this.phoneInfo.relation,
              template: this.template,
              templateType:this.templateType,
              source:this.phoneInfo.source,
            id:this.phoneInfo.id,
            })
            .then(res => {
              if (res.data.code == 0) {
                this.$message.success('短信发送成功')
                this.template = ''
                this.handleClose()
              } else {
                this.$util.failCallback(res.data, this);
              }
            })
            .catch(err => {
              this.template = ''
              console.log(err);
            });
        }

      },
      // 关闭弹窗
      handleClose() {
        this.$emit('smsClose');
      },
    }
  }

</script>
<style lang="scss">
  .sms {
    .el-dialog {
      width: 18%;
    }

    .latestSms {
      padding: 20px;
      margin-bottom: 60px;
      background: lightgray;
    }

    .el-form-item {
      margin-bottom: 0px;
    }
  }

</style>
