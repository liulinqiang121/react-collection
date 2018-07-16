<template>
<div class="qq out_visit_form">
  <el-dialog :title="onLineData.borrowerName" :visible.sync="wechatSendVisible" :before-close="handleClose" :close-on-click-modal="false"
    :show-close="true">
    <!-- <h5 class="msgWidth">消息记录：</h5>
    <div class="msg msgWidth">
      <p>
        <el-tag type="info">{{latestSms}}</el-tag>
      </p>

    </div> -->
    <el-form ref="form" label-width="120px" label-position="right">
        <label class="el-form-item__label" style="width: 120px;">消息记录：</label>
        <div class="msgBox">
          <div class="msgBox-right">
            <div class="msg"  v-for="item in chatRecord" :key="item.id">
            <span class="msg-time">{{item.sendTime}}</span>
            <div class="msg-tag">{{item.sendMessage}}
              <i v-if="item.sendStatus==1" class="el-icon-warning msg-error" ></i>
              <i v-if="item.sendStatus==0" class="el-icon-success msg-success"></i>
              <i v-if="item.sendStatus==-1" class="el-icon-loading msg-ing"></i>
            </div>
            <div v-if="item.sendStatus==2" style="color:#F56C6C;text-align:center">账户不存在</div>
          </div>
          </div>
        </div>
      <el-form-item label="消息模板：">
        <el-select v-model="templateName" @change="changeOption" size="mini" clearable>
          <el-option v-for="item in templateNameArr" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模板内容">
        <el-input type="textarea" :rows="6" disabled size="mini" v-model="template"></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog_submit">
      <el-button type="primary" @click="submit" size="mini">发送</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
  export default {
    props: {
      wechatSendVisible: {
        type: Boolean
      },
     onLineData: {
       type: Object
     },
     wechatCode: {
       type: String
     },
     mywechatAccount: {
       type: String
     },
     mywechatAddAccount: {
       type: String
     }
    },
    data() {
      return {
        templateName: '',
        template: '',
        templateNameArr: [],
        templateArr: [],
        // latestSms: '',
        chatRecord:[]
      };
    },
    methods: {
      // 关闭弹窗
      handleClose(done) {
        this.$emit('sendwechatclose');
      },
      // 获取模板信息
      getList() {
        this.$axios
          .post("/api/assignee/sms/getWeChatInfo", {
            borrowerName: this.onLineData.borrowerName,
            latestDebtMoney: this.onLineData.latestDebtMoney,
            loanInstitution: this.onLineData.loanInstitution,
            name: this.onLineData.borrowerName,
            account: this.mywechatAccount,
            productName: this.onLineData.productName,
            caseId:this.onLineData.caseId
          })
          .then(res => {
            if (res.data.code == 0) {
                // this.latestSms = res.data.data.latestSms;
                this.chatRecord = res.data.data.chatRecord;
              for (var item of res.data.data.smsTemplates) {
                this.templateNameArr.push(item.templateName);
                this.templateArr.push(item.template)
              }
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 发送消息
      submit() {
        if (!this.template.length) {
          this.$alert("未选择发送消息！", "提示", {
            confirmButtonText: "确定",
            type: 'warning'
          });
          return false;
        }
        this.$axios
          .post("/api/assignee/sms/sendWechat", {
            account: this.mywechatAccount,
            caseId: this.onLineData.caseId,
            phone: this.onLineData.phone,
            wechatCode: this.wechatCode,
            template: this.template,
            addAccount: this.mywechatAddAccount
          })
          .then(res => {
            if (res.data.code == 0) {
              this.$message.success('正在发送');
              this.handleClose()
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 选择模板
      changeOption(val) {
        var index = this.templateNameArr.indexOf(val);
        this.template = this.templateArr[index];
      }
    },
    created() {
      this.getList()
    },

  };


</script>
<style lang="scss" scoped>
.el-dialog {
    .el-dialog__title {
  font-size: 14px;
}
}
h5 {
  font-size: 14px;
  margin-bottom:5px;
}
.el-form-item {
  margin-bottom:  0px;
}
.el-select {
  width: 100%;
}
.dialog_footer {
  text-align: center;
  display: block;
  margin:10px 0 0 0;
}
.msgBox {
    min-height: 100px;
    max-height: 300px;
    overflow: auto;
    border: 1px #ccc solid;
    margin-bottom: 10px;
    line-height:24px;
    .msg {
      width:80%;
      margin-left:50px;
      font-size: 12px;
      text-align:right;
        .msg-tag {
          text-align:left;
            background-color: rgba(144,147,153,.1);
            border-color: rgba(144,147,153,.2);
            padding: 0 10px;
            border-radius: 4px;
            box-sizing: border-box;
            border: 1px solid rgba(64,158,255,.2);
            word-break:break-all;
            word-wrap:break-word;
            position:relative
        }
        .msg-error{
            color:#F56C6C;
            position:absolute;
            left:-20px;
            top:50%;
        }
        .msg-success{
            color:#67C23A;
            position:absolute;
            left:-20px;
            top:50%;
        }
        .msg-ing{
            color:#909399;
            position:absolute;
            left:-20px;
            top:50%;
        }
    }
}


</style>


