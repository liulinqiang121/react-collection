
<template>
    <!-- <div> -->
        <div class="my-tabs"> 
            <div class="tabs-bar"> 
                <div class="tabs-bar-nav"> 
                  <div class="tabs-tab" v-for="tab in tabList" :class="[tabIndex == tab.index ? 'tabs-active' : '']" @click="changeTab(tab)"> {{tab.name}} </div> 
                </div>
            </div> 
            <div class="tabs-content">
                <slot></slot> 
            </div> 
        </div>
    <!-- </div> -->
</template>
<script>
export default {
  name: "MyTabs",
  props: { tabList: Array, tabIndex: {} },
  data() {
    return {};
  },
  methods: {
    changeTab(tab) {
      this.$emit("changeTab", tab);
    }
  }
};
</script>
 <style scoped lang="scss">
.my-tabs {
  font-size: 14px;
  color: #444;
  // margin-left: 50px;
}
.tabs-bar {
  border-bottom: 1px solid #B5CEF7;
  position: relative;
  padding: 5px 0;
}
.tabs-bar-nav {
  display: table;
  margin-left: 0;
  position: absolute;
  bottom: -1px;
}
.tabs-tab {
  min-width: 110px;
  padding: 5px 0;
  position: relative;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  color: #555;
  font-size: 13px;
}
.tabs-active {
  // border-top: 2px solid rgb(69, 138, 241);
  // border-left: 2px solid rgb(69, 138, 241);
  // border-right: 2px solid rgb(69, 138, 241);
  // border-bottom: 2px solid #fff;
    border-top: 3px solid #64A4FD;
    border-left: 1px solid #DDDDDD;
    border-right: 1px solid #DDDDDD;
    border-bottom: 2px solid #fff;
    color: #0D639D;
}
.tabs-content {
  // padding-left: 20px;
  // padding-right: 20px;
  // padding-bottom: 30px;
}
</style>


            
            