<template>
  <div class="strategy_set">
    <el-dialog title="策略配置" :visible.sync="dialogVisible" width="40%" :before-close="handleClose" :close-on-click-modal="false"
      :show-close="true">
      <div style="margin:0 auto">
       <div class="table">
        <el-table ref="multipleTable" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="tb.data" tooltip-effect="dark" 
          empty-text="暂无数据" >
          <el-table-column  align="center"  label="产品类型" width="200">
              <template slot-scope="props" >
                  {{props.row.productTypeName}} 
              </template>
          </el-table-column>
           <el-table-column  align="center"  label="策略" width="auto">
               <template slot-scope="props" >
                   <el-select v-model="conditionForm[props.row.index].strategyId"  size="mini" placeholder="系统默认策略" >
                       <!-- <el-option label="" value=""></el-option> -->
                       <el-option v-for="item in props.row.strategy" :key="item.id" :label="item.name" :value="item.code" @change="changeOption" ></el-option>
                   </el-select>
               </template>
          </el-table-column>
        </el-table>
       </div> 
      <div style="text-align:right;margin:20px 0 0 0">
        <el-button type="primary" @click="submit" size="small">提交</el-button>
      </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const fields = [
  {
    key: " productTypeName",
    label: "产品类型",
    width: "150"
  },
  {
    key: "strategy",
    label: "策略",
    width: "auto"
  },


]
  export default {
    name: 'strategyDialog',
    props: {
      dialogVisible: {
          type: Boolean
      },
      id: {
         
      },
      status: {
        type: String
      }
    },
    data() {
      return {
        option: '',
        conditionForm: [],
        tb: {
        data: [       
        ],
        fields: fields,
      },
      change: false,
      };
    },
    methods: {
      // 关闭弹窗
      handleClose(change) {
        this.$emit('closeDialog',change);
      },
      // 获取下拉列表信息
      getDropdownData() {
         this.$axios
          .post("/api/assignee/setup/initQueryStrategyConfigure", {strategyConfigureId: this.id,configureStatus: this.status})
          .then(res => {
            if (res.data.code == 0) {
              this.conditionForm = [];
               this.tb.data = res.data.data;
               for(var item in this.tb.data) {
                 this.tb.data[item].index = item;
                 let obj = {
                   productType: this.tb.data[item].productType,
                   productTypeName: this.tb.data[item].productTypeName,
                   strategyId: '',
                   id: '',
                 };
                 this.conditionForm.push(obj)
               }
               this.getList();

            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 获取数据
      getList() {
          this.$axios
          .post("/api/assignee/setup/queryStrategyConfigure", {strategyConfigureId:this.id})
          .then(res => {
            if (res.data.code == 0) {
              for(var item of res.data.data) {
                 for(var index in this.conditionForm) {
                    if(this.conditionForm[index].productType === item.productType) {
                      this.conditionForm[index].id = item.id; 
                      this.conditionForm[index].strategyId = item.strategy.code == null ? '' :item.strategy.code
                    }
                 }
              } ;
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 提交验证信息
      submit() {
       this.$axios
          .post("/api/assignee/setup/saveStrategyConfigure", {
             strategyConfigureBean: this.conditionForm,
             strategyConfigureId: this.id
          })
          .then(res => {
            if (res.data.code == 0) {
              this.$message.success('修改成功');
              this.change = true;
              this.handleClose(this.change);
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      changeOption() {
        console.log(this.conditionForm)
      },
  },
    created() {
      this.getDropdownData();
    },

  };


</script>
<style lang="scss" scoped>
.el-dialog__title {
  font-size: 18px;
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

</style>




