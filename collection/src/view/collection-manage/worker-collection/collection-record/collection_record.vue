<template>
  <div class="md">


      <div class="md-right">
        <!-- <el-button size="mini" type="primary"  @click="toggleRowExpansion">{{toggleExpansionText}}</el-button> -->
      </div>
      <el-table :data="tb.data" style="width: 100%" class="extension collection_record" :default-expand-all="expandAll" :row-key="getRowKeys" 
        :expand-row-keys="expansioncloneArr" v-loading="loading" :stripe="true">
        <el-table-column type="index"></el-table-column>
        <el-table-column v-for="field in tb.fields" align="center"  show-overflow-tooltip :prop="field.key" :label="field.label" :width="field.width" :key="field.key"  >
        </el-table-column>
        <el-table-column  :render-header="renderHeader"  >
          <el-table-column type="expand"  class="extend" width="100">
            <template slot-scope="props">
              <div>
                <!-- <el-form inline class="form-detail condition-form" > 
                  <el-form-item label="联系人：">
                    <span>{{ props.row.markDetail.callName   }}</span>
                  </el-form-item>
                  <el-form-item label="电话：">
                    <span>{{ props.row.markDetail.callPhone }}</span>
                  </el-form-item>
                  <el-form-item label="呼叫时间：">
                    <span>{{ props.row.markDetail.createTime }}</span>
                  </el-form-item>
                  <el-form-item label="催收反馈：" >
                    <el-tag v-for="label in props.row.markDetail.label" :key="label.id" size="mini">{{label}}</el-tag>
                    </el-form-item>
                </el-form> -->

                <el-row :gutter="10">
                  <el-col :span="4"><label>联系人：</label>{{ props.row.markDetail.callName   }}</el-col>
                  <el-col :span="4"><label>电话：   </label>  {{ props.row.markDetail.callPhone }}</el-col>
                  <el-col :span="4"><label>呼叫时间： </label>{{ props.row.markDetail.callTime }}</el-col>
                  <el-col :span="12"><label>催收反馈： </label><el-tag v-for="label in props.row.markDetail.label" :key="label.id" size="mini">{{label}}</el-tag></el-col>
                </el-row>

              </div>
              <div>
                <!-- <el-form inline class="form-detail condition-form" > 
                  <el-form-item label="催收反馈：" >
                  <el-tag v-for="label in props.row.markDetail.label" :key="label.id" size="mini">{{label}}</el-tag>
                  </el-form-item>
                </el-form> -->
              </div>
              <!-- <div>
                <h5>新增联系人信息：  <span v-if="!props.row.markDetail.addContact.length" >空</span></h5>
                  <span v-if="!props.row.markDetail.addContact.length" ></span>
                  <div v-else>
                    <el-form inline class="form-detail condition-form"    v-for="item in props.row.markDetail.addContact" :key="item.id">
                      <el-form-item label="姓名：">
                        <span>{{ item.contactName }}</span>
                      </el-form-item>
                      <el-form-item label="手机号码：">
                        <span>{{ item.contactTel }}</span>
                      </el-form-item>
                      <el-form-item label="身份证号：">
                        <span>{{ item.contactIdnumber }}</span>
                      </el-form-item>
                      <el-form-item label="关系：">
                        <span>{{item.contactRelation }}</span>
                      </el-form-item>
                      <el-form-item label="公司：">
                        <span>{{item.companyName }}</span>
                      </el-form-item>
                      <el-form-item label="地址：">
                        <span>{{item.usualAddress }}</span>
                      </el-form-item>
                      <el-form-item label="公司地址：">
                        <span>{{item.companyAddress }}</span>
                      </el-form-item>
                      <el-form-item label="邮箱：">
                        <span>{{item.email}}</span>
                      </el-form-item>
                      <el-form-item label="QQ：">
                        <span>{{item.contactQqCode}}</span>
                      </el-form-item>
                      <el-form-item label="微信：">
                        <span>{{item.contactWechatCode}}</span>
                      </el-form-item>
                    </el-form>
                  </div>
              </div> -->
              <div>
                <!-- <h5>还款信息：</h5> -->
                <!-- <el-form inline class="form-detail condition-form">
                  <el-form-item label="承诺还款金额：">
                    <span>{{ props.row.markDetail.promiseAmount}}</span>
                  </el-form-item>
                  <el-form-item label="承诺还款时间：">
                    <span>{{ props.row.markDetail.promiseRepaymentTime}}</span>
                  </el-form-item>
                  <el-form-item label="申请减免金额：">
                    <span>{{ props.row.markDetail.reliefAmount}}</span>
                  </el-form-item>
                </el-form> -->

                <el-row :gutter="10">
                  <el-col :span="4"><label>承诺还款金额：</label>{{ props.row.markDetail.promiseAmount   }}</el-col>
                  <el-col :span="8"><label>承诺还款时间：   </label>  {{ props.row.markDetail.promiseRepaymentTime }}</el-col>
                  <!-- <el-col :span="4"><label>申请减免金额： </label>{{ props.row.markDetail.reliefAmount }}</el-col> -->
                  <!-- <el-col :span="12"><label>催收记录： </label>{{ props.row.markDetail.collectionRemark}}</el-col> -->
                </el-row>
              </div>
              <div>
                <!-- <h5></h5> -->
                <!-- <el-form inline class="form-detail condition-form" >
                  <el-form-item label="催收记录：">
                    <span>{{ props.row.markDetail.collectionRemark}}</span>
                  </el-form-item>
                </el-form>   -->
                <el-row :gutter="10">
                  <el-col :span="24"><label>催收记录： </label>{{ props.row.markDetail.collectionRemark}}</el-col>
                </el-row>
              </div>
            </template> 
            </el-table-column>
        </el-table-column> 
      </el-table>
  </div>

</template>



<script>
const fields = [
  {
    key: "createTime",
    label: "提交时间",
    width: "150"
  },
  // {
  //   key: "callDuration",
  //   label: "通话时长",
  //   width: "150"
  // },
  {
    key: "collector",
    label: "催收员",
    width: "auto"
  },
  {
    key: "callName",
    label: "催收对象姓名",
    width: "auto"
  },
  {
    key: "relation",
    label: "关系",
    width: "auto"
  },
  {
    key: "callPhone",
    label: "电话",
    width: "120"
  },

  {
    key: "phoneStatus",
    label: "电话状态",
    width: "auto"
  },
  {
    key: "phoneAnswerStatus",
    label: "接听状态",
    width: "auto"
  },
  {
    key: "collectionRemark",
    label: "催记详情",
    width: "auto"
  },




];
export default {
  name: 'collectionRecord',
  props: {
    caseCode: {

    },
    caseId: {

    },
    caseManageId: {

    }
  },
  data() {
    return {
      tb: {
        data: [],
        fields: fields,
      },
      expansionDataArr: [],
      expansioncloneArr:[],
      expandAll:true,
      loading: false,
      // 获取row的key值
      getRowKeys(row) {
          return row.collectionMarkId;
          console.log(row)
      },
      toggleExpansionText:'一键折叠'
      
    }
  },
  methods: {
    // 获取数据列表
    getList(caseCode,caseId,caseManageId) {
      this.toggleExpansionText='一键折叠'
      
      this.loading = true;
      this.$axios
        .post("/api/assignee/collectionManage/queryCollectionMark", {
          "caseId":Number( caseId) || this.caseId,
          "caseManageId": Number(caseManageId) || this.caseManageId,
          "caseCode": caseCode || this.caseCode
        })
        .then(res => {
          if (res.data.code == 0) {
            this.tb.data = res.data.data;
            res.data.data.forEach((item)=>{
              this.expansionDataArr.push(item.collectionMarkId)
              this.expansioncloneArr = Object.values(this.expansionDataArr)

            })

            // for(var item in this.tb.data) {
            //   this.tb.data[item].index = item;
            //    this.expansionDataArr[item]= {
            //        callName: '',	
            //        callPhone: '',
            //        collectionRemark: '',	
            //        contactRelation: '',
            //        createTime: '',	
            //        label: [],	
            //        promiseAmount: '',	
            //        promiseRepaymentTime: '',	
            //        reliefAmount: '',
            //        addContact: [
            //        ]
                   
            //   };
            // }
          } else {
            this.$util.failCallback(res.data, this);
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    toggleRowExpansion(){
      // this.expandAll=false
      if(this.expansioncloneArr.length!=0){
      this.expansioncloneArr=[]
      this.toggleExpansionText='一键展开'
      }else{
      this.expansioncloneArr =Object.values(this.expansionDataArr)
      this.toggleExpansionText='一键折叠'
      
      }

    },
    // renderHeader(createElement, { column, _self }) {
    //         let label = column.label;
    //         let labelArr = label.split(' ');
    //          return createElement(
    //             'div',
    //             {
    //             'class': 'header-center'
    //             },
    //             [
    //                 createElement('div', {
    //                         attrs: { type: 'text' },
    //                     }, [labelArr[0]]
    //                     ),
    //                     createElement('div', {
    //                         attrs: { type: 'text' },
    //                     }, [labelArr[1] || '']
    //                 )
    //             ]
    //         );
    //     },
    // renderHeader(h) {
    //      return (
    //          <div>
    //          <el-button size="mini" type="primary"  ></el-button>
               
                
    //          </div>
    //      )
    // }

      renderHeader(createElement, { _self }) {
        return createElement(
          'span',
          // {
          //   'class': 'renderTableHead'
          // },
          [
            //  createElement('i', {
            //   attrs: { type: 'primary',size:'mini',class: 'el-icon-arrow-down' },
            //   on: { click: this.toggleRowExpansion }
            // }, 
            // [this.toggleExpansionText]


            createElement('el-button', {
              attrs: { type: 'primary',size:'mini' },
              on: { click: this.toggleRowExpansion }
            }, [this.toggleExpansionText]
            ),
          
          ]
        );
    },


    // 获取展开数据
    // getExpansionData(row) {
    //   this.$axios
    //     .post("/api/assignee/collectionMark/getCollectionMarkById", {
    //       "caseId": this.caseId,
    //       "collectionMarkId": row.collectionMarkId
    //     })
    //     .then(res => {
    //       if (res.data.code == 0) {
    //         this.expansionDataArr[row.index]= res.data.data;
    //       } else {
    //         this.$util.failCallback(res.data, this);
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    // // 表格行收展
    // toggleRowExpansion(row) {
    //    this.getExpansionData(row);

    // },

    //鼠标移入
    // cellHover(row,column) {
    //   if(!column.label)  this.getExpansionData(row);
     
    // }

  },
  created() {
    this.getList();
  }
}

</script>
<style>
 .has-gutter tr:nth-child(2){
  display:none
  }
</style>

<style lang="scss" scoped>
  h5 {
    font-size:12px;
    text-align:left;
    font-weight: 600;
    margin-top:10px;
    display: inline;
    line-height: 40px;
    height:40px;
  }
.extension .form-detail {
  display: inline;
}
.extension label {
    color: #99a9bf
  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  
  .el-tag {
    margin-right: 10px;
  }

</style>
