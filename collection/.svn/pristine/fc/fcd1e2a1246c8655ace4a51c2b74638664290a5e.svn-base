<template>
  <div class="form">
    <el-dialog :close-on-click-modal="false" :show-close="true"  title="人工分案"  :visible.sync="allotShow" :center="true"  id="dialog" @close="close">
       <el-form   label-width="100px" size="small" class="dialog-main" >
        <el-form-item label="选择部门" prop="aDepartmentIds" clearable >
            <el-cascader :options="departments" v-model="aDepartmentIds"  @change="handleChange" change-on-select :props="departmentProps" size="small"> </el-cascader>
        </el-form-item>
        <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" style="margin-left:100px" @click="addStuffId" v-if="!workAbility && !callVisible">添加催收员</el-button>
        <el-form-item label="选择催收员"   prop="aStuffId" v-if="workAbility" clearable>
          <el-select v-model="aStuffId" size="small">
             <el-option v-for="option in workers" :label="option.name" :value="option.id" :key="option.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form> 
      <div class="dialog_submit">
          <el-button size="small"  @click="cancelForm">取消</el-button>
          <el-button size="small" type="primary" @click.prevent="submitForm">提交</el-button>
      </div>

    </el-dialog>     
  </div>
</template>
<script>
  import qs from "qs";
  export default {
    name: 'allotCase',
    data() {
      return {
        aDepartmentIds:[],
        aStuffId: '',
        departmentProps: {
          label: "name",
          value: "id"
        },
        workers: [],
        departmentId: '',
        hasAbility: false,
        workAbility: false,
        callVisible: false,
      }
    },
    props: {
      allotShow: {
        type: Boolean,
      },
      departments: {
        type: Array,
      },
      selected: {
        type: Array
      }
    },
    methods: {

      // 关闭dialog
      close() {
       // this.$refs.allotCase.resetFields();
       this.aDepartmentIds = [];
       this.$emit('allotClose');        
      },

     // 选择部门
      handleChange(data) {
        this.aStuffId = '';
        this.departments = [{"children":[{"children":[{"name":"123","orderNum":0,"parentNodeId":"70","functionType":1,"id":83},{"name":"dfgdfg","orderNum":0,"parentNodeId":"70","functionType":0,"id":73}],"name":"催收A1","orderNum":0,"parentNodeId":"5","functionType":0,"id":70},{"name":"11","orderNum":0,"parentNodeId":"5","functionType":0,"id":74}],"name":"催收公司A","orderNum":0,"parentNodeId":"2","functionType":0,"id":5}]
        this.departmentId = this.aDepartmentIds[this.aDepartmentIds.length-1];
        this.checkDepartment();
      },
      // 提交表单
      submitForm() {
        if(this.departmentId) {
          if(!this.hasAbility) {
            if(!this.aStuffId) {
              this.$alert("未选择催收员！", "提示", {
                confirmButtonText: "确定",
                type: 'warning'
              });
              return false
            } 
          }
          this.allotChooseCase()
        } 
        else {
          this.$alert("未选择部门！", "提示", {
              confirmButtonText: "确定",
              type: 'warning'
          });
        }
      },

      // 表单重置
      cancelForm() {
        this.aDepartmentIds = [];
        this.aStuffId = '';
        this.$emit('allotClose');
      },

      // 获取所选部门的催收员
      getWorkers() {
        this.$axios
          .post("/api/assignee/caseManage/getStaffs", {
            departmentId: this.departmentId
          })
          .then(res => {
            if (res.data.code == 0) {
              this.workers = res.data.data;
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },

      // 检查部门组长是否有权限 /assignee/caseManage/checkDepartment
      checkDepartment() {
        this.$axios
          .post("/api/assignee/caseManage/checkDepartment", {
            departmentId: this.departmentId
          })
          .then(res => {
            if (res.data.code == 0) {
              this.hasAbility = res.data.data.hasPromiss ? false : true;
              this.workAbility = !this.hasAbility;
              this.callVisible = res.data.data.functionType?true:false
              this.getWorkers();
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },

     // 人工分案
     allotChooseCase() { 
        this.$axios
          .post("/api/assignee/caseManage/allotCase", JSON.parse(JSON.stringify({
            departmentId: this.departmentId,caseIds:this.selected,isRight:this.hasAbility?0:1,staffId: this.aStuffId
          })))
          .then(res => {
            if (res.data.code == 0) {
              this.$message.success('分案成功');
              this.cancelForm();
              this.$emit('refreshList')
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });
     },
     addStuffId() {
      this.hasAbility = false;
      this.workAbility = true;
      }
    },
    created() {}
  };

</script>
<style lang="scss" scoped>

  .el-select .el-input {
      width:100%;
  }

</style>

