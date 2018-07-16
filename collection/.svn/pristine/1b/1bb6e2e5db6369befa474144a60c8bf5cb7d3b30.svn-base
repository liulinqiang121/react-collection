<template>
  <el-table height="700" :data="tb.data" highlight-current-row @current-change="handleCurrentChange"  tooltip-effect="dark"
    v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" @selection-change="handleSelect">
    <el-table-column type="selection" width="55" fixed="left"></el-table-column>
    <el-table-column v-for="field in tb.fields" align="left" :prop="field.key" :label="field.label" :width="field.width" :key="field.id"></el-table-column>
    <el-table-column label="操作" width="160" align="center" v-if="tb.OperationBtn" fixed="right">
      <template slot-scope="scope">
        <el-button size="mini" :type="btn.type"  v-for="btn in tb.OperationBtn" :key="btn.id" @click="HandleClick(scope,btn)"
          v-if="btn.isShow">
          {{btn.name}}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  export default {
    props: [
      'tb',
      'loading'
    ],
    data() {
      return {
        selected: {},
        currentData: [],
      }
    },
    methods: {

      // 点击表格，切换当前所选行  
      handleCurrentChange(currentRow, oldCurrentRow) {
        this.currentData = currentRow;
      },

      // 点击按钮事件，穿入的key 1是修改，二是删除
      HandleClick(row, btn) {
        if (btn.key == '1') {
          this.$emit('updateDialog', row)
        } else {
          this.$emit('deleteDialog', row)
        }
      },

      // 点击selection按钮选择一或多行
      handleSelect(selection) {
        this.selected = selection;
        if (selection) {
          this.$emit('choose', selection)
        }
      },

    },
    created() {},
  }

</script>
<style lang="scss" scoped>
.el-table {
	margin: 20px 0;
}
</style>

