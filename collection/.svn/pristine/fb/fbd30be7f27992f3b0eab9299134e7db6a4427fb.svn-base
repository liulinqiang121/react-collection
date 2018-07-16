<template>
  <div>
    <div class="md">
      <!-- <div class="md-left">催收建议：建议继续催收</div> -->
      <div class="md-right">
        <el-button size="mini" type="primary" @click="openDialog" v-if="visibleBtn">申请减免</el-button>
      </div>
    </div>
    <!-- <el-table ref="multipleTable" :data="applyderateTb" tooltip-effect="dark" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
         empty-text="暂无数据">
         <el-table-column type="index">
          </el-table-column>
          <el-table-column v-for="field in tb.fields" align="left" :prop="field.key" :label="field.label" :width="field.width" :key="field.id">
          </el-table-column>
      </el-table> -->

    <el-table ref="multipleTable" :data="applyderateTb" tooltip-effect="dark" v-loading="loading" element-loading-text="拼命加载中" show-overflow-tooltip 
      element-loading-spinner="el-icon-loading">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column v-for="field in tb.fields" align="left" :prop="field.key" :label="field.label" :width="field.width" :key="field.id">
        <template slot-scope="scope">
          <!-- 普通样式 -->
          <template v-if="field.type == '0'">
            {{scope.row[scope.column.property]}}
          </template>
          <!-- 按钮类型 -->
          <template v-if="field.type == '1'">
            <el-button type="text" size="mini">
              {{scope.row[scope.column.property]}}
            </el-button>
          </template>
          <!-- a标签 -->
          <template v-if="field.type == '2'">
            <a href="javascript:void(0)" @click="downLoadFile(scope)" style="text-decoration:underline;" class="el-button--text el-button--small">{{scope.row.isFile=='0'?'':'附件可下载'}}</a>
          </template>
          <template v-if="field.type == '3'">
            <span v-if="scope.row.approveStatus !='已驳回'">{{scope.row.approveStatus}}</span>
            <span v-else>
              <span>{{scope.row.approveStatus}} |</span>
              <a class="rejectDetail" @click.prevent="checkDetail(scope)">查看详情</a>
            </span>
          </template>
        </template>
      </el-table-column>
      <!-- <el-table-column>
        <template slot-scope="scope">
          <span >{{scope.row.approveStatus}}</span>
        </template>
      </el-table-column>-->
    </el-table> 
    <!-- 添加申请凭证 -->
    <el-dialog title="申请减免" :close-on-click-modal="false" :show-close="true" :visible.sync="dialogVisible" :center="true" @close="closeDialog(dialogForm)">
     <el-form ref='dialogForm' :rules="rules" label-width="110px" :model="dialogForm"  size="mini" class="outvisit_record apply_derate">
        <el-form-item label="承诺还款金额：" prop="planRepayAmount" >
          <el-input v-model="dialogForm.planRepayAmount" placeholder="承诺还款金额"  clearable></el-input>
        </el-form-item>
        <el-form-item label="承诺还款时间：" prop="planRepayTime"   :rules="dialogForm.planRepayAmount?[{required:true,message:'必填项',trigger:'change'}]:[]">
           <el-date-picker v-model="dialogForm.planRepayTime" :picker-options="pickerOptions" align="right" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
          <!-- <el-input v-model="dialogForm.planRepayTime"  clearable placeholder="请输入承诺还款时间"></el-input> -->
        </el-form-item>
        <el-form-item label="申请减免金额：" prop="reliefAmount" :rules="[{required:true,message:'必填项',trigger:'change'}]">
          <el-input v-model="dialogForm.reliefAmount" placeholder="申请减免金额"  clearable></el-input>
        </el-form-item>
        <el-form-item label="承诺还款人：" prop="promisee" >
          <el-input v-model="dialogForm.promisee" placeholder="承诺还款人" clearable></el-input>
        </el-form-item>
        <el-form-item label="上传附件：" prop="uFile"  style="height:30px;width:100%">
          <a href="javascript:;" class="a-upload" style="text-align:left;margin:0">
            <input type="file" name="uFile" @change="uploadImg" id="logo_img" title=" " multiple clearable>上传附件
          </a>
          <ul id="fileName">
            <li class="fileName el-upload-list__item is-finished" v-for="(item,index) in fileList" :key="item.id" :index="index">{{item}}
              <i class="el-icon-close" @click="deleteFile(index)"></i>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="减免要求："  style="width:100%">
          {{depreciationNeed || '无'}}
        </el-form-item>
        <el-form-item label="凭证模板：" style="width:100%">
          <el-button type="text" v-for="item in template" :key="item" @click="downLoad(item)">{{item.name}}</el-button>
        </el-form-item> 
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native.prevent="submitDialog(dialogForm)" size="small">确 定</el-button>
        <el-button @click.native.prevent="closeDialog(dialogForm)" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 查看拒绝原因 -->
     <el-dialog title="拒绝详情" :visible.sync="dialogFormVisible" :close-on-click-modal="false" @close="dialogClose">
          <el-form :model="refuseForm" label-width="100px" ref="refuseForm" size="mini">
            <el-form-item label="拒绝原因" prop="refuseReason">
              <el-input type="textarea" autosize v-model="refuseForm.refuseReason" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="最高减免金额" prop="maxReliefAmount" >
              <!-- <el-input-number size="mini" v-model="refuseForm.maxReliefAmount"  :min="1"  ></el-input-number> -->
              <el-input   v-model="refuseForm.maxReliefAmount" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="操作日期">
              <el-input   v-model="refuseForm.operateDate" auto-complete="off" disabled></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button type="primary" @click.native.prevent="dialogClose" size="mini">关闭</el-button>
          </div>
        </el-dialog>
  </div>
</template>
<script>
  const fields = [{
      key: "reliefDate",
      label: "申请时间",
      width: "",
      type: "0"
    },
    {
      key: "collector",
      label: "催收员",
      width: "",
      type: "0"
    },
    {
      key: "planRepayTime",
      label: "承诺还款时间",
      width: "",
      type: "0"
    },
    {
      key: "planRepayAmount",
      label: "承诺还款金额",
      width: "",
      type: "0"
    },
    {
      key: "reliefAmount",
      label: "申请减免金额",
      width: "",
      type: "0"
    },
    {
      key: "promisee",
      label: "承诺还款人",
      width: "",
      type: "0"
    },
    {
      key: "certificationUrl",
      label: "凭证",
      width: "",
      type: "2"
    },
    {
      key: "approveStatus",
      label: "状态",
      width: "",
      type: "3"
    }
  ];
  export default {
    name: "",
    props: {
      caseId: {

      },
      caseCode: {},
      caseManageId: {},
      caseDisable: {
        type: Boolean
      }
    },
    data() {
      return {
        // 表格
        tb: {
          data: [],
          fields: fields
        },
        applyderateTb: [],
        // 遮罩表单
        dialogVisible: false,
        dialogForm: {
          planRepayAmount: "",
          planRepayTime: "",
          reliefAmount: "",
          promisee: "",
          // filename:'',
          caseCode: '',
          caseId: '',
          caseManageId: '',
          uFile: [],
        },
        rules: {},
        // 上传
        uFile: "",
        fileList: [],
        postData: {
          depreciationId: ""
        },
        result: "",
        loading: false,
        formData: {},
        template: [],
        depreciationNeed: '',
        refuseForm: {

        },
        dialogFormVisible: false,
        visibleBtn: true,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
      };
    },
    created() {
       this.formData = new FormData();
       this.dialogForm.caseId = this.caseId;
       this.dialogForm.caseCode = this.caseCode;
       this.dialogForm.caseManageId = this.caseManageId;
       this.checkDerate();
       this.getTemplateList();
       this.getapplyderateList();

    },
    methods: {
      // 申请减免
      getapplyderateList() {
        this.$axios
          .post("/api/assignee/collectionManage/queryDepreciationApply", {
            caseCode: this.caseCode,
            caseId: this.caseId,
            caseManageId: this.caseManageId
          })
          .then(res => {
            if (res.data.code == 0) {
              this.applyderateTb = res.data.data;
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 表格
      getTemplateList() {
        this.$axios.post('/api/assignee/collectionApply/queryDepTemplate',{caseId: this.caseId}).then( res=> {
          if(res.data.code == 0) {
            this.depreciationNeed = res.data.data.depreciationNeed;
            this.template = res.data.data.template
          }else {
             this.$util.failCallback(res.data, this);
          }
        })
        .catch(err => {
           console.log(err);
        });
      },
      // 下载凭证
      downLoad(val) {
        this.$axios({
          // 用axios发送post请求
          method: "post",
          url: "/api/assignee/collectionApply/downloadApplyFile", // 请求地址
          data: {
            name: val.name,
            url: val.url
          }, // 参数
          responseType: "blob" // 表明服务器返回的数据类型
        }).then(res => {
          // 处理返回的文件流
          const content = res.data;
          // console.log(res);
          const blob = new Blob([content]);
          const fileName = decodeURI(res.headers["content-disposition"].split("=")[1]);
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        });
      },
      downLoadFile(val) {
        this.$axios({
          // 用axios发送post请求
          method: "post",
          url: "/api/assignee/collectionManage/downloadDepreciationVoucher", // 请求地址
          data: {
            id: val.row.id
          }, // 参数
          responseType: "blob" // 表明服务器返回的数据类型
        }).then(res => {
          // 处理返回的文件流
          const content = res.data;
          // console.log(res);
          const blob = new Blob([content]);
          const fileName = decodeURI(res.headers["content-disposition"].split("=")[1]);
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        });
      },
      // 打开遮罩
      openDialog() {
        this.dialogVisible = true;
      },

      // // 导入案件-成功
      handleSuccess_importCase(res) {
        if (res.code == 0) {
          // 成功
          this.$message({
            type: "success",
            message: res.msg
          });
          this.closeDialog(dialogForm);
        } else {
          // 失败
          this.result = res.msg + "!";
        }
      },
      // submitUpload() {
      //     this.$refs.upload.submit();
      // },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.result = "";
        // this.$refs['importCase'].clearFiles();
      },
      handlePreview(file) {
        console.log(file);
      },
      handleChange(file, list) {
        // console.log(list);
        // this.fileList = list;
        if (file.status == "ready") {
          this.fileList[0] = list;
        }
      },
      // 遮罩
      closeDialog(dialogForm) {
        // 关闭遮罩
        this.fileList = [];
        this.dialogVisible = false;
        this.formData = new FormData();
        // 清除缓存
        //  this.clearFiles();
        // 刷新列表
        this.$emit("getapplyderateList");
        this.$refs['dialogForm'].resetFields();
      },
      // 凭证提交
      submitDialog(dialogForm) {
        this.$refs.dialogForm.validate((valid) => {
          if(valid) {
            if (this.fileList.length > 5) {
              this.$message.warning('文件数量最多为5');
              return false;
            };
            this.formData.delete('caseId');
            this.formData.delete('caseCode');
            this.formData.delete('caseManageId');
            this.formData.delete('reliefAmount');
            this.formData.delete('planRepayAmount');
            this.formData.delete('planRepayTime');
            this.formData.delete('promisee');
            this.formData.append('caseId',this.caseId);
            this.formData.append('caseCode',this.caseCode);
            this.formData.append('caseManageId',this.caseManageId);
            this.formData.append('reliefAmount',this.dialogForm.reliefAmount);
            this.formData.append('planRepayAmount',this.dialogForm.planRepayAmount);
            this.formData.append('planRepayTime',this.dialogForm.planRepayTime);
            this.formData.append('promisee',this.dialogForm.promisee);
            this.$axios
              .post("/api/assignee/collectionApply/upDepreciationCertification", this.formData)
              .then(res => {
                if(res.data.code == 0) {
                  this.$message({
                    type: 'success',
                    message: '保存成功'
                  })
                  this.visibleBtn = false;
                  this.getapplyderateList()
                  this.closeDialog();
                } else {
                  this.$util.failCallback(res.data, this);
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
      },
      //是否能够申请减免
      checkDerate() {
        this.$axios
            .post("/api/assignee/collectionApply/queryIsApplyDepreciation", {
              caseId: this.caseId,
            })
            .then(res => {
              if (res.data.code == 0) {
                if (res.data.data.apply) {
                  this.visibleBtn= false;
                  //  this.callData.caseDevelopment = '';
                } else {
                  this.visibleBtn = true;
                }
              } else {
                this.$util.failCallback(res.data, this);
              }
            })
            .catch(err => {
              console.log(err);
            });
        
      },
      // 凭证上传 
      uploadImg() {
        var files = document.getElementById('logo_img').files;
        if (files && files.length) {
          for (let item of files) {
            let size = item.size / 1024 / 1024;
            if (size > 10) {
              this.$message.error('文件不能大于10M');
              return false;
            }
            this.fileList.push(item['name']);
            this.dialogForm.uFile.push(item);
            this.formData.append('uFile', item)
            
          }
        }
      },
      // 凭证删除
      deleteFile(index) {
        this.fileList.splice(index, 1);
        this.dialogForm.uFile.splice(index, 1);
        this.formData = new FormData();
        for (var item of this.dialogForm.uFile) {
          this.formData.append('uFile', item);
        }
      },
      checkDetail(scope) {
           this.$axios
            .post("/api/assignee/collectionManage/queryDepreciationReject", {id:scope.row.id})
            .then(res => {
              if (res.data.code == 0) {
                this.refuseForm = res.data.data;
                this.dialogFormVisible = true;
              } else {
                this.$util.failCallback(res.data, this);
              }
            })
            .catch(err => {
              console.log(err);
            });
      },
      dialogClose() {
        this.dialogFormVisible = false;
      }
    }
  };

</script>
<style lang="scss" scoped>
.el-dialog .el-form {
  width:100%;
   .el-form-item {
      display: inline-block;
      width: 49%;
    }
    // .el-select {
    //   width: 100%;
    // }
    // .el-input_innner,
    // .el-textarea_inner {
    //   width: 100%;
    // }
    // .el-date-editor {
    //   width: 100%;
    // }
}
  .el-upload-list {
    display: block !important;
    padding-left: 0;
  }

  .md {
    margin-bottom: 10px;
  }
 .el-input__inner,.el-date-editor {
   width: auto!important
 }
  .el-dialog--center .el-dialog__body {
    padding: 25px 10px 0;
  }
  .el-input--suffix .el-input__inner{
    padding-right: 0!important
  }
  .rejectDetail {
    color: #409EFF;
    cursor: pointer;
  }
  .el-form-item__label {
    padding:0!important
  }
  .dialog-footer {
    text-align: right;
    width: 85%;
    margin: 0 auto;
    padding: 0;
  }
</style>
