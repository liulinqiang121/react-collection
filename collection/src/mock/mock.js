const Mock = require('mockjs');
Mock.setup({
  timeout: 400
})
export default Mock.mock('/test','post', {//输出数据

  'name': '@name',//随机生成姓名

  'age|1-10': 10

  //还可以自定义其他数据
});