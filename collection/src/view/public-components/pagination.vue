<template>
  <div>
     <el-pagination small   layout="sizes,total, prev, pager, next, jumper" :page-sizes="[15, 50, 100]" :total="total" :page-size="pageSize"  :current-page.sync="currentPage" @current-change="changePage"  @size-change="changeSize"> </el-pagination>
  </div>
</template>
<script>
export default {
  data(){
    return {}
  },
  props:{
    total:{
      type: Number
    },
    currentPage:{
      type: Number
    },
    pageSize: {
      type: Number
    }
  },
  methods:{
    changePage(index){
      this.currentPage = index;
      this.$emit('changePage',index)
    },
    changeSize(index) {
      this.$emit('changeSize',index)
    }
  },
  
}
</script>
<style>

</style>


