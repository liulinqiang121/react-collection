<template>
  <div class="weChat">
      <div>
          <p class="title_name">小花</p>
          <div class="messagesList">
              <p v-for="item in messagesArr" :key="item.id">{{item.name}}</p>
          </div>
          <div class="send_messages">
            <el-form :model="sendweChatForm" ref="sendweChatForm" label-width="100px" label-position="top" >
                <el-form-item>
                    <el-row>
                      
                        <el-col :span="16">
                            <el-select v-model="sendweChatForm.one" placeholder="请选择" size="mini" class="selection" @change="changeOption" clearable> 
                                <el-option :label="item.name" :value="item.caseCode" v-for="item in messagesArr" :key="item.id"></el-option>
                            </el-select>
                        </el-col>
                          <el-col :span="8">
                        <el-button  size="mini">发送</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                </el-form>

          </div>
      
      </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data(){
        return{
            sendweChatForm:{
                one:''
            },
            messagesArr:[
                {
                    name:'hi',
                    code:'1'
                },
                {
                    name:'你好',
                    code:'2'
                },
                {
                    name:'我是****公司的催收员小小木，我代表我们公司对您表示深切的问候',
                    code:'3'
                }
            ]
        }
    },
    methods:{
        changeOption(){}
    }
  }
    
    
</script>
<style lang="scss" scoped>
.weChat{
    position: fixed;
    right:20px;
    top:20%;
    z-index:100;
    background: #fff;
    border:2px solid lightblue;
    width:220px;
    height:300px;
    padding: 20px;
    font-size: 14px
}
.title_name{
    text-align: center
}
.messagesList{
    // position: absolute;
    // left: 20px;
    float: left;

}
.messagesList p{
    margin:10px 0;
    text-align: right;
}
.send_messages{
    float:left
}

</style>

