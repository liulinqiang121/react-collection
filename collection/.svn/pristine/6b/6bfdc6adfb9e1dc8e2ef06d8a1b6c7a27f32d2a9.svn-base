<template>    
    <el-dialog title="设置外呼规则" :visible.sync="visible" :close-on-click-modal="false" @close="close">
       <el-form :model="conditionForm" label-width="150px"  size="small" :rules="conditionFormrules" ref="conditionForm" class="dialog-main"  >
        <el-form-item label="规则名称" prop="ruleName"  >
          <el-input v-model="conditionForm.ruleName"  clearable placeholder="请输入外访守则标题" ></el-input>
        </el-form-item>
         <el-form-item label="失败重复次数" prop="failRetryTimes" >
          <!-- <el-input v-model="conditionForm.failRetryTimes" type="number"></el-input> -->
            <el-select v-model="conditionForm.failRetryTimes" placeholder="请选择失败重复次数" >
                <el-option v-for="item in [0,1,2,3,4,5]" :key="item" :label="item" :value="item"></el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="接通重呼条件(秒)" prop="retryLessBillsec" >
          <el-input v-model="conditionForm.retryLessBillsec"  placeholder="接通重呼条件(秒)" ></el-input>
        </el-form-item>
        <el-form-item label="接通重呼次数" prop="retryTimes" >
          <el-input v-model="conditionForm.retryTimes"  placeholder="接通重呼次数" ></el-input>
        </el-form-item>
        <el-form-item label="当日重呼间隔(分钟)" prop="retryIntervalTime" >
          <el-input v-model="conditionForm.retryIntervalTime" placeholder="当日重呼间隔(分钟)" ></el-input>
        </el-form-item>
         <el-form-item label="工作时间" prop="workTime" > 
           <el-input v-show="false" v-model="conditionForm.workTime"></el-input>       
            <el-row v-for="(item,index ) in workTimes" :key="item.id" style="margin-bottom:10px">
              <el-col :span="10">
                <el-time-select
                    placeholder="起始时间"
                    v-model="item.startTime"
                    :picker-options="{
                        start: item.start,
                        step: '00:30',
                        end: '24:00'
                    }"
                    >
                </el-time-select>
              </el-col>
              <el-col :span="2" style="text-align:center">-</el-col>
            <el-col :span="10">
                <el-time-select
                    placeholder="结束时间"
                    v-model="item.endTime"
                    @change="transfromTime"
                    :picker-options="{
                        start: item.start,
                        step: '00:30',
                        end: '24:00',
                        minTime: item.startTime
                    }"
                    >
                </el-time-select>
            </el-col>
            <el-col :span="1" :offset="1"><i class="el-icon-delete" @click="removeTime(index)" v-if="index!=0"></i></el-col>
            </el-row>
        </el-form-item> 
        <el-button type="primary" size="mini"  icon="el-icon-circle-plus-outline" style="margin: -20px 0 0 150px" @click="addTime">添加时间</el-button>
      </el-form>
      <div class="dialog_submit">
        <el-button @click.native.prevent="dialogCloseHandle" size="small">取 消</el-button>
        <el-button type="primary" @click.native.prevent="dialogSubmitHandle" size="small">提 交</el-button>
      </div>
    </el-dialog>
</template>
<script>
export default {
    name: 'visitRuleDialog',
    data() {
      const validateInter = (rule, value, callback) => {
          if (value) {
            let pattern = /^[0-9]{0,}$/;
            if (!pattern.test(value)) {
              callback(new Error("必须为整数"));
            } else{
              callback();
            }
          } else {
            callback();
          }
        }
      return {
        conditionForm: {
            failRetryTimes: '',
            retryIntervalTime: '',
            retryLessBillsec: '',
            retryTimes: '',
            ruleName: '',
            workTime: ''
        },
        startTime: '',
        endTime: '',
        conditionFormrules: {
            ruleName: [
                {
                required: true,
                message: '必填项',
                trigger: 'blur'
                },
            ],
            failRetryTimes: [
                {
                required: true,
                message: '必填项',
                trigger: 'blur'
                },
                {
                validator: validateInter,
                trigger: "blur",
                }
            ],
             retryLessBillsec: [
                {
                required: true,
                message: '必填项',
                trigger: 'blur'
                },
                {
                validator: validateInter,
                trigger: "blur",
                }
            ],
             retryTimes: [
                {
                required: true,
                message: '必填项',
                trigger: 'blur'
                },
                 {
                 validator: validateInter,
                 trigger: "blur",
                 }
            ],
             retryIntervalTime: [
                {
                required: true,
                message: '必填项',
                trigger: 'blur'
                },
                {
                validator:validateInter,
                trigger: "blur",
                }
            ],
            workTime: [
              {
                required: true,
                message:"必填项",
                trigger: 'change'
              }
            ]
        },
        workTimes:[
          {
            startTime: '',
            endTime: '',
            start: '00:00',
            end: '24:00'
          }
        ]
      }
    },
    props:{
      itemData:{
        type: Object
      },
      visible: {
        type: Boolean
      }
    },
    methods:{
      // 关闭弹窗
      dialogCloseHandle(){
          this.$refs['conditionForm'].resetFields();
          this.$emit('closeDialog')
      },
      // 提交
      dialogSubmitHandle(){
       this.$refs['conditionForm'].validate((valid) => {
          if (valid) {
            this.conditionForm.workTime = ''
            this.workTimes.forEach( (item,index) => {
                if(item) {
                    this.conditionForm.workTime += item.startTime +'-'+ item.endTime+',';
                }
            })
          this.$axios
            .post("/api/assignee/proactiveCallManage/createPredictiveCallRule", this.conditionForm)
            .then(res => {
              if (res.data.code == 0) {
                this.$message.success('添加成功');
                this.dialogCloseHandle();
                this.$emit('refresh')
              } else {
                this.$util.failCallback(res.data, this);
              }
            })
            .catch(err => {
              console.log(err);
            });
          } else {
          }
        });
        
      },
      // 关闭弹窗
      close(){
        this.dialogCloseHandle();
      },
      //添加时间
      addTime() {
        var item = this.workTimes[this.workTimes.length -1];
        if(item) {
         if(item.startTime && item.endTime != '24:00') {
           this.workTimes.push({
            startTime: '',
            endTime: '',
            start: item.endTime,
            end: '24:00'
          })
         }else if(item.endTime != '24:00'){
           this.$message.warning('请先将工作时间填写完整');
           return false;
         } else {
            this.$message.warning('无时间段可选')
            return false;
         }
        } else {
          this.workTimes.push({
            startTime: '',
            endTime: '',
            start: '00:00',
            end: '24:00'
          })
        }
      },
      // 删除时间
      removeTime(index) {
        if(this.workTimes.length ==1) return false;
        this.workTimes.splice(index,1);
        if(this.workTimes.length == 0) {
          this.conditionForm.workTime = ''
        } 
      },
      // 时间选择
      transfromTime (index) {
        if(index) {
          this.conditionForm.workTime = index;
        }
      }
    },
    created() {
   //   console.log(this.itemData)
      this.conditionForm = Object.assign({},this.itemData)
    }
  
}
</script>
<style lang="scss" scoped>
.el-dialog .el-form {
  width:85%;
  .el-input--suffix .el-input__inner {
      padding-right: 0
  }
}
.dialog-footer {
  width: 85%;
  text-align: right;
  margin: 0 auto;
}
.el-date-editor.el-input {
  width: auto
}
.el-icon-delete {
  cursor: pointer;
  &:hover {
    color:#f00
  }
}
.el-select {
  width:100%;
} 
</style>

