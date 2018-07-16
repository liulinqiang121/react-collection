<template>
  <div>
    <el-tree :data="orgData" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="true" :default-expand-all="true"></el-tree>
  </div>
</template>
<script>
export default {
  name: 'tree',
  data() {
     return {
        defaultProps: {
          children: 'children',
          label: 'orgName',
          id: 'id'
        }
      };
  },
  props: {
    orgData:{
      type: Array
    }
  },
  methods: {
    // 选中树结构的一支，触发父元素的方法
    handleNodeClick(data){
      this.$emit('treeChange',data)
    },
  }
}
</script>
<style lang="scss" scoped>
.el-tree {
  height:100%;
  padding:20px 20px 40px;
  .el-tree-node__content {
      border:1px #ddd solid
  }
}

</style>

