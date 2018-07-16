<template>
  <div>
    <div class="content-body">
      <!-- 顶部，包括标题，操作按钮-->
      <div class="bd-top">
        <div class="md clearfix">
          <!-- 1、左边标题 -->
          <div class="md-left">
            <h5>角色管理</h5>
          </div>
          <!-- 2、右边操作按钮 -->
          <div class="md-right">
            <el-button size="mini" type="primary" @click="openCreateDialog(operationBtns[1])" v-if="operationBtns[1].isShow">{{operationBtns[1].name}}</el-button>
            <el-button size="mini" type="primary" @click="deleteHandle(operationBtns[3])" v-if="operationBtns[3].isShow">删除</el-button>
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
          <el-table-column width="120" label="操作" align="left">
            <template slot-scope="scope">
              <el-button v-if="operationBtns[2].isShow" @click.native.prevent="openUpdateDialog(scope.row,operationBtns[2])" type="text"
                icon="el-icon-edit">
              </el-button>
              <el-button @click.native.prevent="openDetailDialog(scope.row,operationBtns[4])" type="text" icon="el-icon-view" >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination small layout="sizes, total, prev, pager, next, jumper" :total="total" :page-sizes="[15, 50, 100]" :page-size="pageSize" :current-page.sync="currentPage"
          @current-change="holderChangeHandle" @size-change="changeSize">
        </el-pagination>
      </div>
    </div>

    <!-- 创建角色表单 -->
    <el-dialog :title="operationBtns[1].dialog.title" :visible.sync="operationBtns[1].dialog.dialogFormVisible" @close="dialogCloseHandle(operationBtns[1])"
      :close-on-click-modal="false">
      <el-form :model="operationBtns[1].dialog.form" label-width="90px" size="small" :rules="operationBtns[1].dialog.rule" :ref="operationBtns[1].dialog.formName" class="dialog-main">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="operationBtns[1].dialog.form.name" auto-complete="off" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色标识" prop="identifier">
          <el-input v-model="operationBtns[1].dialog.form.identifier" auto-complete="off" placeholder="请输入角色标识"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="operationBtns[1].dialog.form.description" auto-complete="off" placeholder="请输入角色描述"></el-input>
        </el-form-item>
        <el-form-item label="选择资源" required>
          <div class="tree-wrap">
            <el-tree :data="allResourceTree" show-checkbox default-expand-all node-key="id" ref="createTree" highlight-current :props="defaultProps"
              :check-strictly="false" @check-change="getCheckedKeys">
            </el-tree>
          </div>
        </el-form-item>
      </el-form>
       <div  class="dialog_submit">
          <el-button size="small"  @click="dialogCloseHandle(operationBtns[1])">取消</el-button>
          <el-button size="small" type="primary" @click="dialogSubmitHandle(operationBtns[1])">提交</el-button>
        </div>
    </el-dialog>
    <!-- 修改表单 -->
    <el-dialog :title="operationBtns[2].dialog.title" :visible.sync="operationBtns[2].dialog.dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="operationBtns[2].dialog.form" label-width="90px" size="small" :rules="operationBtns[2].dialog.rule" :ref="operationBtns[2].dialog.formName" class="dialog-main">
        <el-form-item label="角色编号" prop="id">
          <el-input v-model="operationBtns[2].dialog.form.id" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="operationBtns[2].dialog.form.name" auto-complete="off" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色标识" prop="identifier">
          <el-input v-model="operationBtns[2].dialog.form.identifier" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="operationBtns[2].dialog.form.description" auto-complete="off" placeholder="请输入角色描述"></el-input>
        </el-form-item>
        <el-form-item label="选择资源" required>
          <div class="tree-wrap">
            <el-tree :data="allResourceTree" show-checkbox default-expand-all node-key="id" ref="updateTree" highlight-current :props="defaultProps"
              :check-strictly="false" @check-change="getCheckedKeys">
            </el-tree>
          </div>
        </el-form-item>
      </el-form>
        <div class="dialog_submit">
          <el-button size="small"  @click="dialogCloseHandle(operationBtns[2])">取消</el-button>
          <el-button size="small" type="primary" @click="dialogSubmitHandle(operationBtns[2])">提交</el-button>
        </div>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog :title="operationBtns[4].dialog.title" :visible.sync="operationBtns[4].dialog.dialogFormVisible" :close-on-click-modal="false">
      <div class="tree-wrap" style="width:80%;margin:0 auto">
        <el-tree :data="currentResourceTree" default-expand-all node-key="id" ref="tree" tooltip-effect="dark" v-loading="loading"
          element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" highlight-current :props="defaultProps" :check-strictly="true">
        </el-tree>
      </div>

      <div slot="footer" class="dialog_submit">
        <el-button type="primary" size="small" @click="dialogCloseHandle(operationBtns[4])">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
  const fields = [{
      key: "id",
      label: "角色编号",
      width: ""
    },
    {
      key: "name",
      label: "角色名称",
      width: ""
    },
    {
      key: "description",
      label: "角色描述",
      width: ""
    }
  ];
  import qs from 'qs'
  import * as util from '../../../util/util.js'
  export default {
    data() {
      return {
        allResourceTree: [],
        currentResourceTree: [],
        currentResourceIds: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        operationBtns: [{
          name: '查看',
          identifier: 'assignee_role_search',
          isShow: true,
        }, {
          name: '创建',
          identifier: 'assignee_role_create',
          dialog: {
            dialogFormVisible: false,
            form: {
              name: '',
              identifier: '',
              description: '',
            },
            rule: {
              name: [{
                required: true,
                message: "角色名称不能为空",
                trigger: "blur"
              }, ],
              identifier: [{
                required: true,
                message: "标识不能为空",
                trigger: "blur"
              }, ],
            },
            formName: 'createForm',
            url: '/api/assignee/authority/createAuthority',
            title: '角色创建',
          },
          isShow: true,
        }, {
          name: '修改',
          identifier: 'assignee_role_update',
          dialog: {
            dialogFormVisible: false,
            form: {
              positionName: '',
              holder: 'assignee',
              positionType: '',
              roleId: null,
              description: '',
              id: null,
            },
            rule: {
              name: [{
                required: true,
                message: "角色名称不能为空",
                trigger: "change"
              }, ],
              identifier: [{
                required: true,
                message: "标识不能为空",
                trigger: "change"
              }, ],
            },
            formName: 'editForm',
            url: '/api/assignee/authority/updateAuthority',
            title: '角色修改',
          },
          isShow: true,
        }, {
          name: '删除',
          identifier: 'assignee_role_delete',
          form: {
            id: null,
            identifier: ''
          },
          url: '/api/assignee/authority/deleteAuthority',
          isShow: true,
        }, {
          name: '详情',
          identifier: 'assignee_role_detail',
          dialog: {
            dialogFormVisible: false,
            form: {

            },
            rule: {},
            formName: 'editForm',
            url: '/api/assignee/authority/getResourceByRoles',
            title: '该角色拥有的资源',
          },
          isShow: true,
        }],
        tb: {
          fields: fields,
          data: [],
        },
        multipleSelection: [],
        selected: [],
        currentPage: 1,
        pageSize: 15,
        total: null,
        loading: true
      }

    },
    computed: {
      queryParams() {
        return {
          currentPage: this.currentPage,
          pageSize: 15,
          holder: 'assignee'
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
      util.getPageResourceByMenu(param, this)
      this.getAllResourceTree()
    },
    methods: {
      // 翻页
       holderChangeHandle(holder) {
        this.getList(this.queryParams)
        this.getAllResourceTree()
      },
      // 获取角色列表
      getList(param) {
        this.loading = true;
        this.$axios.post('/api/assignee/authority/pageQueryRole', qs.stringify(util.encodePostBody(param))).then((res) => {
          if (res.data.code == 0) {
            this.tb.data = res.data.data.items
            this.total = res.data.data.totalNum
          } else {
            util.failCallback(res.data, this)
          }
          this.loading = false;
        }).catch((err) => {
          console.log(err);
          this.loading = false;
        })
      },
      // 获取所有资源
      getAllResourceTree() {
        this.$axios.post('/api/assignee/authority/getResourceTree', qs.stringify(util.encodePostBody({
         holder: 'ASSIGNEE'
        }))).then((res) => {
          if (res.data.code == 0) {
            this.allResourceTree = res.data.data
          } else {
            util.failCallback(res.data, this)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      // 获取选择的资源
      getCurrentResourceTree(currentRow, cb) {
        this.$axios.post('/api/assignee/authority/getResourceByRoles', qs.stringify(util.encodePostBody({
          roleId: currentRow.id
        }))).then((res) => {
          if (res.data.code == 0) {
            this.currentResourceTree = res.data.data
            this.currentResourceIds = []
            this.getIdsFromTree(this.currentResourceTree)
            // this.currentResourceTree
            if (cb) {
              cb(this)
            }
          } else {
            util.failCallback(res.data, this)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getIdsFromTree(tree) {
        tree.forEach(function (item) {
          if (item.children.length == 0) {
            this.currentResourceIds.push(item.id)
          } else {
            this.getIdsFromTree(item.children)
          }
        }, this)
      },

      resetHandle() {},
      searchHandle() {},
      handleSizeChange() {},
      handleCurrentChange() {},
      changeSize(index) {
        this.currentPage = 1;
        this.queryParams.pageSize = index,
        this.getList(this.queryParams)
        this.getAllResourceTree()
      },
      handleSelectionChange(selection) {
        this.selected = selection
      },
      dialogSubmitHandle(btn) {
        console.log(this.$refs['createTree'])
      //  console.log(this.$refs['createTree'].getHalfCheckedKeys())  ;return false;
        this.$refs[btn.dialog.formName].validate((valid) => {
          if (valid) {
            let temp = {}
            if (btn.identifier == 'assignee_role_create') {
              temp = {
                holder: this.queryParams.holder,
                resources: this.$refs.createTree.getCheckedKeys(false).concat(this.$refs.createTree.getHalfCheckedKeys())
                  .join(',')
              }
            }
            if (btn.identifier == 'assignee_role_update') {
              temp = {
                resources: this.$refs.updateTree.getCheckedKeys(false).concat(this.$refs.updateTree.getHalfCheckedKeys())
                  .join(',')
              }
            }
            btn.dialog.form = Object.assign(temp, btn.dialog.form)
            this.$axios.post(btn.dialog.url, qs.stringify(util.encodePostBody(btn.dialog.form))).then((res) => {
              if (res.data.code == 0) {
                btn.dialog.dialogFormVisible = false
                this.getList(this.queryParams)
                this.$message({
                  type: 'success',
                  message: res.data.msg
                })

              } else {
                util.failCallback(res.data, this)
              }
            }).catch((err) => {
              console.log(err)
            })
          }
        })

      },


      openUpdateDialog(row, btn) {
        btn.dialog.form = Object.assign({}, row)
        this.getCurrentResourceTree(row, function (_this) {
          btn.dialog.dialogFormVisible = true
          _this.$nextTick(function () {
            _this.$refs.updateTree.setCheckedKeys(_this.currentResourceIds)
          })
        })


      },
      openCreateDialog(btn) {
        if (this.$refs[btn.dialog.formName] !== undefined) {
          this.$refs[btn.dialog.formName].resetFields()
        }

        btn.dialog.dialogFormVisible = true
        this.$nextTick(function () {
          this.$refs.createTree.setCheckedKeys([])
        })
      },
      deleteHandle(btn) {
        if (this.selected.length > 0) {

        } else {
          this.$alert("请选择一条记录进行操作！", "提示", {
            confirmButtonText: "确定"
          });
        }
      },
      openDetailDialog(row, btn) {
        btn.dialog.dialogFormVisible = true
        this.getCurrentResourceTree(row)
      },

      // 全部资源数据
      getAllResource() {

      },
      // 已选角色的资源数据
      getCurrentResource() {

      },
      getCheckedKeys(item, b, c) {},
      deleteHandle(btn) {
        if (this.selected.length == 1) {
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            btn.form = this.selected[0]
            this.$axios.post(btn.url, qs.stringify(util.encodePostBody(btn.form))).then((res) => {
              if (res.data.code == 0) {
                this.getList(this.queryParams)
                this.$message({
                  type: 'success',
                  message: res.data.msg
                })
              } else {
                util.failCallback(res.data, this)
              }
            }).catch((err) => {
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
      dialogCloseHandle(btn) {
        btn.dialog.dialogFormVisible = false
      },

    }

  }

</script>

<style lang="scss" scoped>
  .el-pagination {
    float: right;
  }

  .tree-wrap {

    // width: 300px;
    text-align: center;
    border: 1px #ccc solid;
    height: 300px;
    overflow: auto;

  }



</style>
