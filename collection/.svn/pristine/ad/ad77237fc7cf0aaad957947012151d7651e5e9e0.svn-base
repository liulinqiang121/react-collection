<template>
  <div class="form">
    <el-dialog :close-on-click-modal="false" :show-close="true" title="添加联系人详情" :visible.sync="addContactsVisible" :center="true"
      id="dialog" @close="close">
      <el-form label-width="100px" size="small" class="dialog-main" :model="dialogForm" ref="dialogForm">
        <el-form-item label="关系" prop="contactRelation" clearable :rules="[{required:true,message:'必选项',trigger:'change'}]">
          <el-select v-model="dialogForm.contactRelation" placeholder="请选择关系">
            <el-option v-for="item in this.relations" :name="item" :value="item" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="contactName" clearable :rules="[{required:true,message:'必填项',trigger:'blur'}]">
          <el-input v-model="dialogForm.contactName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="contactTel" clearable>
          <el-input v-model="dialogForm.contactTel" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="contactWechatCode" clearable>
          <el-input v-model="dialogForm.contactWechatCode" placeholder="请输入微信"></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="contactQqCode" clearable>
          <el-input v-model="dialogForm.contactQqCode" placeholder="请输入QQ"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" clearable>
          <el-input v-model="dialogForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="contactIdnumber" clearable>
          <el-input v-model="dialogForm.contactIdnumber" placeholder="请输入身份证"></el-input>
        </el-form-item>
        <el-form-item label="常用地址" prop="usualAddress" clearable>
          <el-input v-model="dialogForm.usualAddress" placeholder="请输入常用地址"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="companyName" clearable>
          <el-input v-model="dialogForm.companyName" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" prop="companyAddress" clearable>
          <el-input v-model="dialogForm.companyAddress" placeholder="请输入公司地址"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog_submit">
        <el-button size="small" type="primary" @click.prevent="submitForm">提交</el-button>
        <el-button size="small" @click="cancelForm">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import qs from "qs";
  export default {
    name: 'addContacts',
    data() {
      return {
        dialogForm: {
          caseCode: '',
          companyAddress: '',
          companyName: '',
          contactIdnumber: '',
          contactName: '',
          contactQqCode: '',
          contactRelation: '',
          contactTel: '',
          contactWechatCode: '',
          email: '',
          homeAddress: '',
          usualAddress: '',
        },
        relations: ['本人', '直系亲属', '其它']
      }
    },
    props: {
      addContactsVisible: Boolean,
      caseCode: String,
    },
    methods: {

      // 关闭dialog
      close() {
        // this.$refs.allotCase.resetFields();
        this.cancelForm();
      },
      // 提交表单
      submitForm() {
        this.$refs.dialogForm.validate(valid => {
          if (valid) {
            this.$axios.post('/api/assignee/collectionMark/saveCollectionContact', this.dialogForm)
              .then(res => {
                if (res.data.code == 0) {
                  this.$message.success('联系人保存成功');
                  this.cancelForm();
                  this.$emit('refreshUserList')
                } else {
                  this.$util.failCallback(res.data, this);
                }
              })
          }
        })
      },

      // 表单重置
      cancelForm() {
        this.$refs['dialogForm'].resetFields();
        this.$emit('closeDialog')
      },
      refreshCaseCode(caseCode) {
        this.dialogForm.caseCode = caseCode;
      }
    },
    created() {
      this.dialogForm.caseCode = this.caseCode;
    }
  };

</script>
<style lang="scss" scoped>
  .el-select .el-input {
    width: 100%;
  }

</style>
