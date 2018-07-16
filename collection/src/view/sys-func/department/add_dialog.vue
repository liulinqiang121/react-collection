<template>
    <div>
        <el-dialog title="添加部门" :close-on-click-modal="false" :dialogList="dialogList" :selectList="selectList" :nodeData="nodeData" width="30%" :show-close="true" :visible.sync="dialog"  :center="true"  @close="close">
            <el-form ref='createForm' :rules="rules" label-width="100px" :model="createForm" class="dialog-main" size="small">
                <el-form-item label="部门名称" prop="orgName">
                    <el-input placeholder="" v-model="createForm.orgName" clearable></el-input>
                </el-form-item>
                <el-form-item label="部门描述" prop="description">
                    <el-input placeholder="" v-model="createForm.description" clearable></el-input>
                </el-form-item>
                <el-form-item label="部门类型" prop="orgType">
                    <el-select v-model="createForm.orgType" placeholder="请选择" clearable @change="orgTypeChange">
                        <el-option v-for="item in selectList" :key="item.id" :label="item.dictItemName" :value="item.dictItemCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="预测式外呼" prop="functionType" v-if="functionTypeShow" :rules="[{required:true,message:'请选择',trigger:'change,blur'}]">
                  <el-radio v-model="createForm.functionType" label="1">是</el-radio>
                  <el-radio v-model="createForm.functionType" label="0">否</el-radio>
                </el-form-item>
                <el-form-item label="上级部门" prop="" >
                    <el-input placeholder="" disabled v-model="nodeData.orgName" clearable></el-input>
                </el-form-item>
               
            </el-form>
            <div class="dialog_submit">
                    <el-button size="small" @click="resetForm(createForm)">取消</el-button>
                    <el-button size="small" type="primary" @click="submitDialog(createForm)">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    components: {
    },
    name: 'add',
    data() {
        return {
            createForm: {
                orgName: '',
                description: '',
                orgType: '',
                parentId:'',
                functionType:''
            },
            rules: {
               orgName: [
                    { required: true, message: '部门名称不能为空', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '部门描述不能为空', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                orgType: [
                    { required: true, message: '部门类型不能为空', trigger: 'blur' },
                ]
            },
            functionTypeShow:false
        }
    },
    props: {
        Dialog: {
            type: Boolean,
        },
        dialogList:{},
        selectList: {},
        nodeData: {}

    },
    created() {
        // console.log(this.dialogList)
    },
    methods: {
        orgTypeChange(val){
            if(val=='DEPARTMENT'){
                this.functionTypeShow=true
            }else{
                this.functionTypeShow=false
                
            }
        },
        submitDialog(form) {
            // console.log(this.nodeData)
            // console.log(this.form.parentId)
            // console.log( this.$refs)
            this.createForm.parentId=this.nodeData.id
            this.$refs.createForm.validate((valid) => {
                if (valid) {
                    this.$axios.post('/api/assignee/organization/create',this.createForm).then((res) => {
                        if (res.data.code == 0) {
                            // res.data.data
                            this.$message({
                            type: 'success',
                            message: res.data.msg
                        })
                            this.close(form)
                        } else {
                            // console.log(res.data)
                        //     this.$message({
                        //     type: 'danger',
                        //     message: res.data.msg
                        // })
                        this.$util.failCallback(res.data, _this);


                        }
                    })
                }
            })
        },
        resetForm(form) {
            this.$refs.createForm.resetFields();
            this.$emit('close')
        },
        close(form) {
            this.$emit('close')
            this.$refs.createForm.resetFields();
            this.functionTypeShow=false
            
            
        }
    },
    computed: {
        dialog: {
            get() {
                return this.Dialog;
            },
            set() {
                this.$emit('Dialog', this.Dialog)
            }
        },
        // selectList:{
        //     get() {
        //         return this.selectList;
        //     },
        //     set() {
        //         this.$emit('selectList', this.selectList)
        //     }

        // }
    },
}
</script>
<style scoped>

</style>

