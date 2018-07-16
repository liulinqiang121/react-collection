<template>
  <div>
    <el-input :placeholder="placeholder" v-model="searchName" class="input-with-select">
      <el-button size="mini" slot="append" icon="el-icon-search" @click.native.prevent="serach"></el-button>
    </el-input>
  </div>
</template>
<script>
export default {
  name: 'searchComponent',
  data() {
    return {
      searchName:''
    }
  },
  props: {
      placeholder: {
          type: String,
          default: '请输入查找内容'
      },
  },
  methods: {
      serach(){
          this.$emit('serach',this.searchName)
      }
  },
}
</script>


