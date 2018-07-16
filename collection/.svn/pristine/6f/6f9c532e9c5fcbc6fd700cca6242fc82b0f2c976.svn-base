<template>
  <div>
    <el-table :data="tb.data"  highlight-current-row @current-change="handleCurrentPage"
      @selection-change="tbSelectionChange" tooltip-effect="dark" height="500" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
      <!-- 需要做下判斷--有些不需要多选 -->
      <el-table-column type="selection" width="55" fixed="left" v-if="tb.selectionBtn">
      </el-table-column>
      <el-table-column type="index" width="40">
      </el-table-column>
      <el-table-column v-for="field in tb.fields" align="left" :prop="field.key" :label="field.label" :width="field.width" :key="field.id" show-overflow-tooltip>
            <template slot-scope="scope">
              <!-- 普通样式 -->
              <template v-if="field.type == '0'">
                {{scope.row[scope.column.property]}}
              </template>
              <!-- 按钮类型 -->
              <template v-if="field.type == '1'">
                <el-button @click="HandleButton" type="text" size="small">
                  {{scope.row[scope.column.property]}}
                </el-button>
              </template>
              <!-- a标签 -->
              <template v-if="field.type == '2'">
                <a href="javascript:void(0)" @click="downLoad(scope,field.caseListType)" style="text-decoration:underline;" class="el-button--text el-button--small">{{scope.row.isFile=='0'?'':'附件可下载'}}</a>
              </template>
            </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="left" v-if="tb.OperationBtn" fixed="right">
        <template slot-scope="scope">
          <el-button :type="btn.type" :size="btn.size" v-for="btn in tb.OperationBtn" :key="btn.key" v-if="btn.isShow" @click="HandleClick(scope,btn)">
            {{btn.name}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>
<script>
  export default {
    name: 'tableComponent',
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
       //多选- 点击selection按钮选择一或多行
      tbSelectionChange(selection) {
        this.selected = selection;
        if (selection) {
          this.$emit('choose', selection)
        }
      },
      // 选中表格行-切换当前所选行  
      handleCurrentPage(currentRow, oldCurrentRow) {
        this.currentData = currentRow;
      },
      // 表格内容-1按钮类型
      HandleButton(){},
      // 表格内容-2a链接
      downLoad(){},
      // 操作-点击按钮事件，穿入的key 1是修改，二是删除----有待优化
      HandleClick(row, btn) {
        if (btn.key == '1') {
          this.$emit('updateDialog', row)
        } else if (btn.key == '2') {
          this.$emit('detailDialog', row)
        } else {
          this.$emit('deleteDialog', row)
        }
      },
    },
    created() {
   
    },
  }

</script>

