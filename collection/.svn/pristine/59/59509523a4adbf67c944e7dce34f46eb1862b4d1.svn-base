<template>
  <div>
    <el-dialog title="号码分配" :close-on-click-modal="false" width="40%" :show-close="true" :visible.sync="dialogVisible" :center="true"
      @close="close">
      <el-form ref="conditionForm" label-position="right" label-width="100px" class="dialog-main">
        <el-form-item label="催收员：" prop="userId">
          <el-select v-model="userId" size="small" clearable>
            <el-option v-for="item in this.dropDownData" :label="item.userName" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
        </el-form-item>
      </el-form>
      <div class="dialog_submit">
          <el-button size="small" type="primary" @click="submit">保存</el-button>
          <el-button size="small" @click="reset">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'telAllotDialog',
    props: {
      row: {
        type: Object
      },
      dialogVisible: {
        type: Boolean
      }
    },
    data() {
      return {
        save: false,
        userId: '',
        dropDownData: [],
      }
    },

    methods: {
      // 关闭
      close() {
        this.$emit('dialogClose');
        this.userId = ''
      },

      //保存
      submit() {
        if(!this.userId) {
          this.$confirm('确认将此分机号分配人员置空?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios
          .post("/api/assignee/seatAllot/allot", {
            id: this.row.id,
            userId: this.userId
          })
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: 'success',
                message: '保存成功'
              })
              this.save = true;
              this.$emit('dialogClose', this.save)
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });

        });
        return false;
        }
        this.$axios
          .post("/api/assignee/seatAllot/allot", {
            id: this.row.id,
            userId: this.userId
          })
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: 'success',
                message: '保存成功'
              })
              this.save = true;
              this.$emit('dialogClose', this.save)
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });

      },

      // 重置
      reset() {
        this.close();
      },
      // 获取催收员列表
      getCollectionId() {
        this.$axios
          .post("/api/assignee/seatAllot/getUser", {})
          .then(res => {
            if (res.data.code == 0) {
              this.dropDownData = res.data.data;
         //     this.userId = this.row.collectionId;
            } else {
              this.$util.failCallback(res.data, this);
            }
          })

      }
    },
    created() {
      console.log(this.row)
      this.getCollectionId();
    }
  }

</script>
<style lang="scss" scoped>
  .el-form-item {
    position: relative;
  }

  .form-btns {
    position: relative;
    top: -20px;
    padding-bottom: 40px;

  }

</style>
