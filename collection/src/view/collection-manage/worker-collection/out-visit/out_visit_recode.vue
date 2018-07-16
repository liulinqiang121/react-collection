<template>
  <div>
    <el-dialog :close-on-click-modal="false" :show-close="true" :visible.sync="recodeVisible" :center="true" @close="close" :title="title" >
      <el-form ref='conditionForm'  label-width="100px" :model="conditionForm" class="outvisit_record">
        <el-form-item label="外访时间：" prop="visitTime">
          <el-date-picker v-model="conditionForm.visitTime" placeholder="请选择外访时间" value-format="yyyy-MM-dd" size="mini" disabled></el-date-picker>
        </el-form-item>
        <el-form-item label="外访地址：" prop="visitAddress">
          <el-input v-model="conditionForm.visitAddress" placeholder="请输入外访地址" size="mini" :maxlength="100" disabled></el-input>
        </el-form-item>
        <el-form-item label="外访情况：" prop="visitSituation">
          <el-select v-model="conditionForm.visitSituation" clearable placeholder="请选择外访情况" size="mini" :disabled="!!id" >
            <el-option v-for="item in dropDownData.situation" :key="item.id" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="外访催记：" prop="caseDevelopment">
          <el-input v-model="conditionForm.caseDevelopment" type="textarea" :rows="6" placeholder="请输入案件进展" size="mini" :disabled="!!id"
            :maxlength="300" clearable></el-input>
        </el-form-item>
        <el-form-item label="附件：" v-if="this.id" prop="uFile" >
          <el-tag type="info" v-for="item in names" :key="item">{{item}}</el-tag>
          <el-button size="mini" type="primary" @click="download">下载</el-button>
        </el-form-item>
        <el-form-item v-else label="上传附件：" prop="uFile" :rules="[{required:true,message:'必填项',trigger:'change,blur'}]">
          <a href="javascript:;" class="a-upload">
            <input type="file" name="uFile" @change="uploadImg" id="logo_img" title=" " multiple clearable>上传附件
          </a>
          <ul id="fileName">
            <li class="fileName el-upload-list__item is-finished" v-for="(item,index) in fileList" :key="item.id" :index="index">{{item}}
              <i class="el-icon-close" @click="deleteFile(index)"></i>
            </li>
          </ul>
          <el-input v-show="false" v-model="conditionForm.uFile[0]"></el-input>
        </el-form-item>
        <div class="dialog-footer" v-if="!this.id">
          <el-button type="primary" @click="submit(conditionForm)" size="medium">提 交</el-button>
          <el-button type="primary" @click="reset(conditionForm)" size="medium">取消</el-button>
        </div>

      </el-form>

    </el-dialog>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: "outVisitRecode",
    props: {
      title: {
        type: String
      },
      recodeVisible: {
        type: Boolean
      },
      isAdd: {
        type: Boolean
      },
      id: {},
      applyItem: {
        type: Object
      },
    },
    data() {
      return {
        conditionForm: {
          visitTime: '',
          visitAddress: '',
          visitSituation: '',
          caseDevelopment: '',
          visitApplyId: '',
          uFile: [],
        },
        dropDownData: {
          situation: []
        },
        names: [],
        fileName: '',
        rules: {
          visitSituation: [{
            required: true,
            message: '必填项',
            trigger: 'blur,change'
          }],
          caseDevelopment: [{
            required: true,
            message: '必填项',
            trigger: 'blur,change'
          }],
        },
        fileList: [],
        error: false,
        downId: '',
        formData: {},
      }
    },
    methods: {
      // 下拉
      getDropDown() {
        this.$axios
          .post("/api/assignee/collectionManage/getVisitSituations", {})
          .then(res => {
            if (res.data.code == 0) {
              this.dropDownData.situation = res.data.data;
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      reset() {
        this.close();
      },
      // 关闭
      close() {
        this.$refs.conditionForm.resetFields();
        this.$emit('recodeClose')
      },
      handleRemove() {

      },
      // 获取外访详情
      getList() {
          this.$axios
          .post("/api/assignee/collectionManage/queryVisitDetails", {
            id: this.id
          })
          .then(res => {
            if (res.data.code == 0) {
              this.names = [];
              this.conditionForm = res.data.data;
              this.conditionForm.visitSituation = res.data.data.visitSituationName;
              this.downId = res.data.data.id;
              for (var item of res.data.data.certification) {
                this.names.push(item.name)
              }
            } else {
              this.$util.failCallback(res.data, this);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 下载附件 
      download() {
        if (this.names.length == 0) {
          return false;
        }
        this.$axios({
          // 用axios发送post请求
          method: "post",
          url: "/api/assignee/collectionManage/downloadVisitFile", // 请求地址
          data: {
            id: this.downId
          }, // 参数
          responseType: "blob" // 表明服务器返回的数据类型
        }).then(res => {
          // 处理返回的文件流
          if (res.data.type != 'application/json') {
            const formatArr = (res.headers['content-disposition']).split(".");
            const format = formatArr[formatArr.length - 1];
            const content = res.data;
            const blob = new Blob([content]);
            const fileName = '外访记录.' + format;
            if ('download' in document.createElement('a')) { // 非IE下载
              const elink = document.createElement('a')
              elink.download = fileName
              elink.style.display = 'none'
              elink.href = URL.createObjectURL(blob)
              document.body.appendChild(elink)
              elink.click()
              URL.revokeObjectURL(elink.href) // 释放URL 对象
              document.body.removeChild(elink)
            } else {
              // IE10+下载
              navigator.msSaveBlob(blob, fileName);
            }
          } else {
            this.$message.error('下载失败')
          };
        })
      },
      // 提交表单
      submit() {
        this.$refs.conditionForm.validate((valid) => {
          if(valid){
          if (this.fileList.length > 5) {
            this.$message.warning('文件数量最多为5');
            return false;
          };
          this.formData.append('visitSituation', this.conditionForm.visitSituation);
          this.formData.append('caseDevelopment', this.conditionForm.caseDevelopment);
          this.formData.append('visitApplyId', this.conditionForm.visitApplyId);
         // this.formData.set('uFile',JSON.stringify(this.formData.get('uFile')));
          this.$axios
            .post("/api/assignee/collectionManage/addVisitRecord", this.formData)
            .then(res => {
              if (res.data.code == 0) {
                this.$message({
                  type: 'success',
                  message: '保存成功'
                })
                this.close();
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
      // 除去文件
      handleRemove(file, fileList) {

      },
      // 成功上传  
      handleSuccess(res) {
        if (res.code == 0) {
          // 成功
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.close();

        } else {
          // 失败
          this.$message.error(res.msg);

        }
      },
      // 文件变化
      handleChange(file, fileList) {
        var checkResult = this.beforeUpload(file)
        if (file.status == "ready" && checkResult) {
          this.fileList[0] = file;
          this.error = false;
        }
      },
      // 上传校验
      beforeUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 2MB!');
          this.$refs.upload.clearFiles();
          // this.fileList = [];
        }
        return isLt2M;
      },
      // 上传文件过多
      overAmount() {
        this.$message.error('请先删除上一个文件')
      },
      // 上传文件
      uploadImg() {
        var files = document.getElementById('logo_img').files;
        if (files && files.length) {
          for (let item of files) {
            let size = item.size / 1024 / 1024;
            if (size > 2) {
              this.$message.error('文件不能大于2M');
              return false;
            }
            this.fileList.push(item['name']);
            this.conditionForm.uFile.push(item);
            this.formData.append('uFile',item)
          }
        }
       // console.log(files[0] === this.conditionForm.uFile[0])
        
      },
      // 删除文件
      deleteFile(index) {
        this.fileList.splice(index, 1);
         this.conditionForm.uFile.splice(index, 1);
       this.formData = new FormData();
        for(var item of this.conditionForm.uFile) {
          this.formData.append('uFile',item);
        }
      }

    },
    created() {
      this.formData = new FormData();
      this.getDropDown();
      this.conditionForm.visitTime = this.applyItem.visitTime;
      this.conditionForm.visitAddress = this.applyItem.visitAddress;
      this.conditionForm.visitApplyId = this.applyItem.id;
    },

  }

</script>
<style scoped lang="scss">
  .el-dialog .el-form {
    width: 70%;
    margin: 0 auto;
    .el-form-item {
      display: block
    }
    .el-select {
      width: 100%;
    }
    .el-input_innner,
    .el-textarea_inner {
      width: 100%;
    }
    .el-date-editor {
      width: 100%;
    }
  }

  .dialog-footer {
    display: block;
    margin: 0 auto;
    width: 200px;
    text-align: center;
  }

  .el-tag {
    margin-right: 10px;
  }

  .el-input.is-disabled .el-input__inner {
    background-color: #fff;
  }

  .el-upload__tip {
    width: 200px;
    display: block;
    text-align: left;
  }

  .el-form-item__err {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    left: 0;
    top: 35px;
    width: 100px;
    text-align: left;
  }

  #fileName li {
    color: #606266;
    display: block;
    margin-right: 40px;
    overflow: hidden;
    padding-left: 4px;
    text-overflow: ellipsis;
    transition: color .3s;
    white-space: nowrap;
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    &:hover {}
  }

  .el-upload-list__item:first-child {
    margin-top: 0;
  }

</style>
