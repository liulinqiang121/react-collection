<template>
  <div>
    <client-head class="client-head"></client-head>
    <div class="client-body">
      <client-aside class="client-aside" v-bind:class="{'aside-collapse':asideIsCollapse,'aside-expand':!asideIsCollapse}"></client-aside>
      <section class="client-content" v-bind:class="{'content-collapse':asideIsCollapse,'content-expand':!asideIsCollapse}">
        <router-view></router-view>
      </section>
    </div>
    <remind-note></remind-note>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import clientAside from './components/aside'
  import clientHead from './components/head'
  import remindNote from './components/remind_note'
  export default {
    computed: mapGetters({
      asideIsCollapse: 'asideStatus',
    }),
    // computed: mapGetters({
    //     products: 'allProducts'
    // }),
    components: {
      clientHead,
      // clientFoot,
      clientAside,
      remindNote
    }
  }

</script>

<style lang="scss">
  // @import './style/base';
  .client-head {
    height: 50px;
    // position: fixed;
    // top: 0;
    width: 100%;
    // 一些不支持背景渐变的浏览器  
    background:#1d459c; 
    // z-index:9999;
    // ie10
    background: -ms-linear-gradient(left, #3ec2cf, #1d459c); 
    background:-moz-linear-gradient(left, #3ec2cf, #1d459c);  
    background:-webkit-linear-gradient( left, #3ec2cf,#1d459c);
    // ie10之前
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#3ec2cf',endColorstr='#1d459c',GradientType=1);	
    -ms-filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#3ec2cf',endColorstr='#1d459c',GradientType=1);	
    
    ul{
      background: inherit !important;
      li{
        background: inherit !important;
        div{
          background: inherit !important;
        }
      }
    }
    
  }

  .client-body {
    // margin-top: 50px;
    // flexie9不兼容跪了
    // display: flex;
    // flex-direction: row;
    height: calc(100% - 50px);
    width: 100%;
    position: absolute;
    overflow: hidden;
    min-width: 1280px;
    min-height: 620px;
    font-size: 0;
    .client-aside {
      display: inline-block;
      transition: width 0.3s linear;
      height: 100%;
      position: relative;
      font-size: initial;
    }

    .client-content {
      display: inline-block;
      transition: width 0.3s linear;
      // flex: 1 1 auto; 
      height: 100%; 
      background-color: #fff;
      overflow: hidden;
      overflow-y: auto;
      font-size: initial;
      

    }
    .content-collapse{
      width: calc(100% - 64px);
    }
    .content-expand{
      width: calc(100% - 210px);
    }
    .aside-collapse {
      // flex-basis: 64px;
      width: 64px;
    }
    .aside-expand {
      // flex-basis: 210px;
      width: 210px;
    }
  }

  .client-foot {
    height: 60px;
  }

  

</style>
