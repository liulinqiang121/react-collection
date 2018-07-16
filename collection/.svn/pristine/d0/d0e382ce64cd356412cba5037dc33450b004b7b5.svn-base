<template>    
    <el-dialog :title="itemData.title?'外访守则详情':'添加外访守则'" :visible.sync="visible" :close-on-click-modal="false" @close="close">
       <el-form :model="conditionForm" label-width="110px"  size="small" ref="conditionForm" class="dialog-main">
        <el-form-item label="外访守则标题" prop="title" :rules="[{required:true,message:'标题为必填项'}]" >
          <el-input v-model="conditionForm.title"  clearable placeholder="请输入外访守则标题"></el-input>
        </el-form-item>
         <el-form-item label="外访守则内容" prop="content" :rules="[{required:true,message:'内容为必填项'}]">
          <el-input v-model="conditionForm.content" type="textarea" :row="10" placeholder="请输入外访守则内容" ></el-input>
        </el-form-item>
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
      return {
        conditionForm: {
            title: '',
            content: ''
        }
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
      dialogCloseHandle(){
          this.$refs['conditionForm'].resetFields();
          this.$emit('close')
      },
      dialogSubmitHandle(){
        var url,message;
        if(this.conditionForm.id) {
          url = '/api/assignee/visitRule/updateRule';
          message = '编辑成功'
        } else {
          url = '/api/assignee/visitRule/addRule';
          message = '添加成功'
        }
        this.$axios
          .post(url, {title: this.conditionForm.title,content: this.conditionForm.content,id:this.conditionForm.id})
          .then(res => {
            if (res.data.code == 0) {
              this.$message.success(message);
              this.dialogCloseHandle();
              this.$emit('refresh')
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      close(){
        this.dialogCloseHandle();
      }
    },
    created() {
   //   console.log(this.itemData)
      this.conditionForm = Object.assign({},this.itemData)
    }
  
}
</script>
