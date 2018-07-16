<template>
    <div>
        <el-form ref='form' :rules="rules" label-width="80px" :model="form">
            <el-form-item v-for="(item,index) in this.formFields" :key="item.id" :label="item.label" :prop="item.prop">
                <el-input :placeholder="item.placeholder" :v-model="item.model"></el-input>
            </el-form-item>
    
            <el-form-item>
                <el-button size="mini" type="primary" @click="submitDialog(form)">提交</el-button>
                <el-button size="mini" @click="resetForm(form)">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    name: 'form-input',
    data() {
        return {
            rules: {

            },
            // formInput:{
            form: {
                one: 'werff',
                two: 'sdfsd'
            },
            formFields: [
                {
                    label: '部门名称1',
                    prop: 'one',
                    placeholder: '',
                    model: ''
                },
                {
                    label: '选择部门2',
                    prop: 'two',
                    model: ''
                }
            ]
            // }

        }
    },
    props: {
        Dialog: {
            type: Boolean,
        }
    },
    methods: {
        submitDialog(form) {
            this.$refs[form].validate((valid) => {
                if (!valid) {
                    console.log('error submit!!');
                    return false;
                }
                var form_data = new FormData();
                form_data.append('oldPass', escape(this.form.oldPass));
                form_data.append('one', escape(this.form.one));
                var self = this;
                this.$http.post('/api/resetPass', form_data)
                    .then(function (res) {
                        if (res.data.success) {
                            self.$message({ message: '重置密码成功', type: 'success' });
                            self.commit('resetPass');
                        } else if (res.data.errorMessage == "expried") {
                            self.$message.error('您的登陆时间已过期，请重新登陆');
                            setTimeout(function () {
                                self.$router.push({ path: '/login' });
                            }, 2000)
                        }
                    }
                    )
                    .catch(error => {
                        console.log(error)
                    })
            })
        },
        resetForm(form) {
            this.$refs.form.resetFields();
            this.$emit('close')
        },
        close(form) {
            //   this.$refs.form.resetFields();
            this.$emit('close')
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
    },
}
</script>
<style scoped>
.el-input {
    width: auto;
}
</style>
