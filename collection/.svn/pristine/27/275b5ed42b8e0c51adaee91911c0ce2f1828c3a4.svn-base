<template>
  <div>

    <div class="content-body">
      <!-- 顶部，包括标题，操作按钮-->
      <div class="bd-top">
        <div class="md clearfix">
          <!-- 1、左边标题 -->
          <div class="md-left">
            <h5>职位管理</h5>
          </div>
          <!-- 2、右边操作按钮 -->
          <div class="md-right">
            <el-button size="mini" type="primary" @click="openCreateDialog(operationBtns[1])" v-if="operationBtns[1].isShow">{{operationBtns[1].name}}</el-button>
            <el-button size="mini" type="primary" @click="deleteHandle(operationBtns[3])" v-if="operationBtns[3].isShow">{{operationBtns[3].name}}</el-button>
          </div>
        </div>
      </div>
      <div class="bd-main">
        <el-table ref="multipleTable" height="750px" tooltip-effect="dark" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
          :data="tb.data" @selection-change="handleSelectionChange">
          <el-table-column type="selection" fixed="left">
          </el-table-column>
          <el-table-column v-for="field in tb.fields" align="left" :prop="field.key" :label="field.label" :width="field.width" :key="field.id">
          </el-table-column>
          <el-table-column width="80" label="操作" v-if="operationBtns[2].isShow" align="center">
            <template slot-scope="scope">
              <el-button @click.native.prevent="openEditDialog(scope,operationBtns[2])" type="text" icon="el-icon-edit" :disabled="scope.row.isDefault">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination small layout="sizes, total, prev, pager, next, jumper" :total="total" :page-sizes="[15, 50, 100]" :page-size="pageSize" :current-page.sync="currentPage"
          @current-change="holderChangeHandle" @size-change="changeSize">
        </el-pagination>
      </div>
    </div>

    <!-- 创建权限表单 -->
    <el-dialog :title="operationBtns[1].dialog.title" :visible.sync="operationBtns[1].dialog.dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="operationBtns[1].dialog.form" label-width="90px" :rules="operationBtns[1].dialog.rule" :ref="operationBtns[1].dialog.formName" class="dialog-main" size="small">
        <el-form-item label="职位名称" prop="positionName">
          <el-input v-model="operationBtns[1].dialog.form.positionName" auto-complete="off" placeholder="请输入职位名称"></el-input>
        </el-form-item>
        <el-form-item label="职位描述" prop="description">
          <el-input v-model="operationBtns[1].dialog.form.description" auto-complete="off" placeholder="请输入职位描述"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="operationBtns[1].dialog.form.roleId" placeholder="请选择角色">
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位类型" prop="positionType">
          <el-radio-group v-model="operationBtns[1].dialog.form.positionType">
            <el-radio :label="item.dictItemCode" v-for="item in positionTypeList" :key="item.id">{{item.dictItemName}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div  class="dialog_submit">
          <el-button size="small"  @click="dialogCloseHandle(operationBtns[1])">取消</el-button>
          <el-button size="small" type="primary" @click="dialogSubmitHandle(operationBtns[1])">提交</el-button>
      </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="dialogCloseHandle(operationBtns[1])">取 消</el-button>
        <el-button type="primary" @click.native.prevent="dialogSubmitHandle(operationBtns[1])">确 定</el-button>
      </div> -->
    </el-dialog>
    <!-- 修改表单 -->
    <el-dialog :title="operationBtns[2].dialog.title" :visible.sync="operationBtns[2].dialog.dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="operationBtns[2].dialog.form" label-width="90px" size="small" class="dialog-main" :rules="operationBtns[2].dialog.rule" :ref="operationBtns[2].dialog.formName">
        <el-form-item label="职位编号" prop="id">
          <el-input v-model="operationBtns[2].dialog.form.id" auto-complete="off" disabled placeholder="请输入职位名称"></el-input>
        </el-form-item>
        <el-form-item label="职位名称" prop="positionName">
          <el-input v-model="operationBtns[2].dialog.form.positionName" auto-complete="off" placeholder="请输入职位描述"></el-input>
        </el-form-item>
        <el-form-item label="职位描述" prop="description">
          <el-input v-model="operationBtns[2].dialog.form.description" auto-complete="off" placeholder="请输入职位描述"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="operationBtns[2].dialog.form.roleId" placeholder="请选择角色">
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位类型" prop="positionType">
          <el-radio-group v-model="operationBtns[2].dialog.form.positionType">
            <el-radio :label="item.dictItemCode" v-for="item in positionTypeList" :key="item.id">{{item.dictItemName}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div  class="dialog_submit">
          <el-button size="small"  @click="dialogCloseHandle(operationBtns[2])">取消</el-button>
          <el-button size="small" type="primary" @click="dialogSubmitHandle(operationBtns[2])">提交</el-button>
        </div>
    </el-dialog>

  </div>


</template>

<script>
  const fields = [{
      key: "id",
      label: "职位编号",
      width: ""
    },
    {
      key: "positionName",
      label: "职位名称",
      width: ""
    },
    {
      key: "positionType",
      label: "职位类型",
      width: ""
    },
    {
      key: "description",
      label: "描述",
      width: ""
    }
  ];
  import qs from 'qs'
  export default {
    data() {
      return {
        holderList: [{
            label: '平台方',
            value: 'assignee'
          },
          {
            label: '委案方',
            value: 'ASSIGNEE'
          },
          {
            label: '催收方',
            value: 'ASSIGNEE'
          },
        ],
        isShow: false,
        total: 0,
        pageSize: 15,
        loading: true,
        operationBtns: [{
          name: '查看',
          identifier: 'assignee_position_search',
          isShow: false,
        }, {
          name: '创建',
          identifier: 'assignee_position_create',
          dialog: {
            dialogFormVisible: false,
            form: {
              positionName: '',
              positionType: '',
              roleId: null,
              description: ''
            },
            rule: {
              positionName: [{
                required: true,
                message: "职位名称不能为空",
                trigger: "blur"
              }, ],
              positionType: [{
                required: true,
                message: "职位类型不能为空",
                trigger: "change"
              }, ],
              description: [{
                required: true,
                message: "描述不能为空",
                trigger: "blur"
              }, ],
              roleId: [{
                required: true,
                message: "角色不能为空",
                trigger: "change"
              }, ]

            },
            formName: 'createForm',
            url: '/api/assignee/position/createPosition',
            title: '职位创建',
          },
          isShow: false,
        }, {
          name: '修改',
          identifier: 'assignee_position_update',
          dialog: {
            dialogFormVisible: false,
            form: {
              positionName: '',
              positionType: '',
              roleId: null,
              description: '',
              id: null,
            },
            rule: {
              positionName: [{
                required: true,
                message: "职位名称不能为空",
                trigger: "change"
              }, ],
              positionType: [{
                required: true,
                message: "职位类型不能为空",
                trigger: "change"
              }, ],
              description: [{
                required: true,
                message: "描述不能为空",
                trigger: "change"
              }, ],
              roleId: [{
                required: true,
                message: "角色不能为空",
                trigger: "change"
              }, ]
            },
            formName: 'editForm',
            url: '/api/assignee/position/updatePosition',
            title: '职位修改',
          },
          isShow: true,
        }, {
          name: '删除',
          identifier: 'assignee_position_delete',
          form: {
            id: ''
          },
          url: '/api/assignee/position/deletePosition',
          isShow: false,
        }, ],
        tb: {
          fields: fields,
          data: []
        },
        multipleSelection: [],
        selected: [],
        currentPage: 1,
        roleList: [],
        positionTypeList: [],
        // 暂存修改原始数据
        tempRow: [],

      }

    },
    computed: {
      queryParams() {
        return {
          currentPage: this.currentPage,
          pageSize: 15,
          holder: 'ASSIGNEE'
          // condition:''
          // appname:this.searchbtn.selected.field == 'appname'?this.searchbtn.selected.value:'',
          // appkey:this.searchbtn.selected.field == 'appkey'?this.searchbtn.selected.value:''
        }
      }
    },
    created() {
      // 获取该页的identifier
      let param = {
        identifier: this.$route.path.slice(1)
      }
      this.$util.getPageResourceByMenu(param, this)
      this.getPositionTypeList()
      this.getRoleList();
      this.getList(this.queryParams)

    },
    methods: {
      holderChangeHandle(holder) {
        this.getList(this.queryParams)
        this.getRoleList()
      },
      getList(param) {
        this.loading = true;
        this.$axios.get('/api/assignee/position/getList', {
            params: param
          }).then((res) => {
            if (res.data.code == 0) {
              this.tb.data = res.data.data.items
              this.total = res.data.data.totalNum
            } else {
              this.$util.failCallback(res.data, this)
            }
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
          })
      },
      resetHandle() {},
      searchHandle() {},
      handleSizeChange() {},
      changeSize(index) {
          this.queryParams.pageSize = index;
          this.currentPage = 1;
          this.getList(this.queryParams)
          this.getRoleList()
      },
      handleCurrentChange() {},
      handleSelectionChange(selection) {
        this.selected = selection
      },
      dialogSubmitHandle(btn) {
        this.$refs[btn.dialog.formName].validate((valid) => {
          if (valid) {
            let temp = {
              holder: this.queryParams.holder,
            }
            btn.dialog.form = Object.assign(temp, btn.dialog.form)
            this.$axios.post(btn.dialog.url, qs.stringify(this.$util.encodePostBody(btn.dialog.form))).then((res) => {
              if (res.data.code == 0) {
                btn.dialog.dialogFormVisible = false
                this.getList(this.queryParams)
                this.$message({
                  type: 'success',
                  message: res.data.msg
                })

              } else {
                this.$util.failCallback(res.data, this)
              }
            }).catch((err) => {
              console.log(err)
            })
          }
        })

      },
      dialogCloseHandle(btn) {
        btn.dialog.dialogFormVisible = false
      },
      openEditDialog(scope, btn) {

        this.tempRow = Object.assign({}, scope.row)
        btn.dialog.dialogFormVisible = true
        btn.dialog.form = this.tempRow

      },
      openCreateDialog(btn) {
        if (this.$refs[btn.dialog.formName] !== undefined) {
          this.$refs[btn.dialog.formName].resetFields()
        }
        btn.dialog.dialogFormVisible = true

      },
      closeCreateDialog(btn) {

      },
      deleteHandle(btn) {
        if (this.selected.length == 1) {
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            btn.form.id = this.selected[0].id
            this.$axios.post(btn.url, qs.stringify(this.$util.encodePostBody(btn.form))).then((res) => {
              if (res.data.code == 0) {
                this.getList(this.queryParams)
                this.$message({
                  type: 'success',
                  message: res.data.msg
                })


              } else {
                this.$util.failCallback(res.data, this)

              }
            }, (err) => {
              console.log(err)
            })
          }).catch(() => {
            // this.$message({
            //     type: 'info',
            //     message: '已取消删除'
            // });          
          });

        } else {
          this.$alert("请选择一条记录进行操作！", "提示", {
            confirmButtonText: "确定"
          });
        }
      },
      getPositionTypeList() {

        this.$axios.get('/api/assignee/position/getPositionType', {
          params: {
            dictTypeCode: 'position_type'
          }
        }).then((res) => {
          if (res.data.code == 0) {
            this.positionTypeList = res.data.data
          } else {
            this.$util.failCallback(res.data, this)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getRoleList() {
        this.$axios.get('/api/assignee/position/getRoleList', {
          params: {
            holder: this.queryParams.holder
          }
        }).then((res) => {
          if (res.data.code == 0) {
            this.roleList = res.data.data
          } else {
            this.$util.failCallback(res.data, this)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }

  }

</script>

<style lang="scss" scoped>
  .el-pagination {
    float: right;
  }
  .el-radio+.el-radio {
    margin-left:10px;
  }
  .el-select-dropdown__item  {
    text-indent: 10px;
  }
</style>
