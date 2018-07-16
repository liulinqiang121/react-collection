<template>
  <div>
       <el-dialog title="新增敏感词" :close-on-click-modal="false"  width="30%" :show-close="true" :visible.sync="addVisible"  :center="true"  @close="close">
        <el-form ref="conditionForm"   label-position="right" class="condition-form dialog-main" size="mini"  >
          <el-form-item label="" prop="alarmWords" v-for="(item,index) in conditionForm" :key="index" >
            <el-input v-model="conditionForm[index]" :maxlength="20" placeholder="请输入敏感词" clearable></el-input>
            <i class="el-icon-delete" @click="deleteWords(index)"></i>
          </el-form-item>
            <el-form-item>
        <el-button type="primary" icon="el-icon-edit" size="mini" @click.prevent.native="addWords">新增敏感词</el-button>
            </el-form-item>
      </el-form>
      <div class="dialog_submit" >
          <el-button size="small" type="primary" @click="submit">提交</el-button>
          <el-button size="small" @click="reset">取消</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'addSensitive',
  props: {
   addVisible: {
       type: Boolean
   }
  },
  data(){
      return {
       conditionForm: [''],
       save: false
      }
  },

  methods: {

      // 关闭
      close() {
        this.conditionForm = [''],
        this.$emit('addClose');
      },

      //保存
      submit() {
        if(this.conditionForm.length === 0) {
           this.$alert("请填入关键字！", "提示", {
            confirmButtonText: "确定",
            type: 'warning'
          });
          return false;
        }
        for(var item of this.conditionForm) {
          if(item.length == 0) {
            this.$alert("请填入关键字！", "提示", {
            confirmButtonText: "确定",
            type: 'warning'
          });
          return false;
          }
        }   
        this.$axios
        .post("/api/assignee/alarmWord/add", {alarmWords: this.conditionForm})
        .then(res => {
          if (res.data.code == 0) {
             this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.save = true;
            this.conditionForm = [''],
            this.$emit('addClose',this.save)
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

      // 重置
      reset() {
       this.close();
      },

     // 删除
     deleteWords(index) {
      this.conditionForm.splice(index,1)
     },

     // 增加
     addWords() {
         this.conditionForm.push('')
     }


  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  position: relative;
  
}
.el-icon-delete {
    position: absolute;
    top:8px;
    right:-20px;
    cursor: pointer;
    &:hover {
        color: #ff0000;
    }
}
.form-btns{
    position: relative;
}
</style>
