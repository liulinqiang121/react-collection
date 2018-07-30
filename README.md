    # react-collection
    以webpack为打包工具，react,react-router,Ant-design为框架和ui组件的mini催收系统。公司之前做了一个比较大的委案，平台和催收系统，是以vue全家桶做的，基本上对vue全家桶有基本了解。现在，尝试以react为骨架在搭建一遍简化催收系统，可以更加收悉react全家桶以及webpack原理，感受vue和react的同样奇妙的地方以及他们的不同。后台接口过于复杂，所以这里我用了mockjs来模拟接口。


    1. 下载命令
     git clone https://github.com/liulinqiang121/react-collection

    2 下载依赖模块 
     npm install 或者使用淘宝镜像 cnpm install

    3 本地运行 
     npm run dev 

    4 打包
     npm run build
  
    最后，谢谢使用和star
     
    ===========================================================================================
    今天算是写完了，算是对react有了基本的了解和认识。说一下vue和react的异同，
    
    1 模板 
      vue采用的template，react采用的是jsx，前者像是html加入js，css,后者更像是在js里面写入html,至于是否喜欢，看个人爱好
      
    2 指令
      vue是自带v-if,v-else,v-for,v-bind的这样的基本指令，可以直接用指令进入切换和循环渲染子元素，react就比较麻烦，将子元素集渲染出来作为组件再放入父       集，不过这也是更纯粹的一切都是组件的思想
      
    3 组件通信
      vue和react都通过props由父组件向子组件传递数据，但是子组件向父组件传递数据时，vue采用的是子组件$emit，父组件去接收事件，react是通过props将方法传       递给子组件，子组件调用吃方法去实现
      
    4 生命周期 
      vue和react都有生命周期，vue的created,mounted，beforeupdate,destoryed,reactcomponentWillMount,componentDidMount,componentWillunmount,
      等，基本上字面上就能明白
     
    5 vue-router和react-router
      用法很不同，vue-router,用path,component,children进行路由嵌套，react-router要将路由要用组件包裹，
      
    6 redux
      首先创建一个reducer,用过dispatch修改store,subscibe监听dispatch
    
