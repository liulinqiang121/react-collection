<template>
  <div>
    <template v-if="item.children.length > 0">
      <el-submenu :index="''+item.id">
        <template slot="title">
          <i :class="item.menuIcon" class="iconfont aside-icon"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <items v-for="subitem in item.children" :item="subitem" :key="subitem.id"></items>
      </el-submenu>
    </template>
    <template v-else>
      <el-menu-item :index="''+item.id" :route="item.identifier">
        <i :class="item.menuIcon" class="iconfont aside-icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </template>
  </div>
</template>


<script>
  export default{
    name:'items',
    props: ['item'],
    data(){
      return {
        open:false
      }
    }
  }
</script>
<style lang="scss" scoped>
    .is-opened li {
      background-color: rgb(49, 49, 49) 
    }

</style>

