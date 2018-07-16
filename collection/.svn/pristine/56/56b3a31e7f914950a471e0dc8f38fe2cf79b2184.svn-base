<template>

  <div class="content-body">
    <!-- 顶部，包括标题，操作按钮-->
    <div class="bd-top">
      <div class="md clearfix">
        <!-- 1、左边标题 -->
        <div class="md-left">
          <h5>人工智能催收</h5>
        </div>
        <!-- 2、右边操作按钮 -->
        <div class="md-right">
        </div>
      </div>
    </div>
    <div class="bd-main">
      <el-form ref="conditionForm" :model="conditionForm" :label-width="this.$util.LABEL_WIDTH" label-position="right" class="condition-form"
        size="mini">
        <div class="el-col fixed-width">
          <el-form-item label="姓名" prop="borrowerName">
            <el-input v-model="conditionForm.borrowerName" clearable></el-input>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="身份证号" prop="borrowerIdnumber">
            <el-input v-model="conditionForm.borrowerIdnumber" clearable></el-input>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="手机号" prop="borrowerPhone">
            <el-input v-model="conditionForm.borrowerPhone" clearable></el-input>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="贷款机构" prop="loanInstitution">
            <el-select v-model="conditionForm.loanInstitution" placeholder="请选择" clearable>
              <el-option :label="item.name" :value="item.code" v-for="item in dropdownData.loanInstitution" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="贷款产品" prop="productName">
            <el-select v-model="conditionForm.productName" placeholder="请选择" clearable>
              <el-option :label="item.name" :value="item.code" v-for="item in dropdownData.productName" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="批次号" prop="batchCode">
            <el-input v-model="conditionForm.batchCode" clearable></el-input>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="案件编号" prop="caseCode">
            <el-input v-model="conditionForm.caseCode" clearable></el-input>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="户籍地" prop="registeredAddress">
            <el-select v-model="conditionForm.registeredAddress" placeholder="请选择" clearable>
              <el-option :label="item.name" :value="item.code" v-for="item in dropdownData.registeredAddress" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="案件地区" prop="caseArea">
            <el-select v-model="conditionForm.caseArea" placeholder="请选择" clearable>
              <el-option :label="item.name" :value="item.code" v-for="item in dropdownData.caseArea" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="性别" prop="borrowerGender">
            <el-select v-model="conditionForm.borrowerGender" placeholder="请选择" clearable>
              <el-option :label="item.name" :value="item.code" v-for="item in dropdownData.gender" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="年龄">
            <el-col :span="11">
              <el-form-item label="" prop="borrowerAgeMin">
                <el-input v-model="conditionForm.borrowerAgeMin" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item label="" prop="borrowerAgeMax">
                <el-input v-model="conditionForm.borrowerAgeMax" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="催收部门" prop="departmentIds">
            <!-- <el-cascader disabled :options="departments" v-model="conditionForm.departmentIds"  @change="getStaffList" :props="departmentProps">
            </el-cascader> -->
            <el-select disabled v-model="conditionForm.departmentId" placeholder="请选择" clearable>
              <!-- <el-option :label="item.name" :value="item.code" v-for="item in departments" :key="item.id"></el-option> -->
            </el-select>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="催收员" prop="staffId">
            <el-select disabled v-model="conditionForm.staffId" placeholder="请选择" clearable>
              <el-option :label="item.name" :value="item.code" v-for="item in dropdownData.staffs" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="账龄" prop="receivableAge">
            <el-select v-model="conditionForm.receivableAge" placeholder="请选择" clearable>
              <el-option :label="item.name" :value="item.code" v-for="item in dropdownData.receivableAge" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="逾期天数">
            <el-col :span="11">
              <el-form-item label="" prop="overdueDayMin">
                <el-input v-model="conditionForm.overdueDayMin" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item label="" prop="overdueDayMax">
                <el-input v-model="conditionForm.overdueDayMax" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="委案金额">
            <el-col :span="11">
              <el-form-item label="" prop="commitMoneyMin">
                <el-input v-model="conditionForm.commitMoneyMin" clearable placeholder="最小值"></el-input>
              </el-form-item>

            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item label="" prop="commitMoneyMax">
                <el-input v-model="conditionForm.commitMoneyMax" clearable placeholder="最大值"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="欠款金额">
            <el-col :span="11">
              <el-form-item label="" prop="totalDebtMoneyMin">
                <el-input v-model="conditionForm.totalDebtMoneyMin" clearable placeholder="最小值"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item label="" prop="totalDebtMoneyMax">
                <el-input v-model="conditionForm.totalDebtMoneyMax" clearable placeholder="最大值"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="最新欠款金额">
            <el-col :span="11">
              <el-form-item label="" prop="latestDebtMoneyMin">
                <el-input v-model="conditionForm.latestDebtMoneyMin" clearable placeholder="最小值"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item label="" prop="latestDebtMoneyMax">
                <el-input v-model="conditionForm.latestDebtMoneyMax" clearable placeholder="最大值"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="还款金额">
            <el-col :span="11">
              <el-form-item label="" prop="totalRepayMoneyMin">
                <el-input v-model="conditionForm.totalRepayMoneyMin" clearable placeholder="最小值"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item label="" prop="totalRepayMoneyMax">
                <el-input v-model="conditionForm.totalRepayMoneyMax" clearable placeholder="最大值"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="委案时间" prop="commitDate">
            <el-date-picker v-model="dateObjs.commitDate" type="daterange" :picker-options="pickerOptions2" value-format="yyyy-MM-dd"
              format="yyyy/MM/dd" @change="getcommitDate" clearable>
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="退案时间" prop="limitDate">
            <el-date-picker v-model="dateObjs.limitDate" type="daterange" :picker-options="pickerOptions2" value-format="yyyy-MM-dd"
              format="yyyy/MM/dd" @change="getlimitDate" clearable>
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="案件状态" prop="caseStatus">
            <el-select v-model="conditionForm.caseStatus" placeholder="请选择" clearable>
              <el-option :label="item.name" :value="item.code" v-for="item in dropdownData.caseStatus" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="催收状态" prop="collectionStatus">
            <el-select v-model="conditionForm.collectionStatus" placeholder="请选择" clearable>
              <el-option :label="item.name" :value="item.code" v-for="item in dropdownData.collectionStatus" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="el-col fixed-width">
          <el-form-item label="电话状态" prop="telStatus">
            <el-select v-model="conditionForm.telStatus" placeholder="请选择" clearable>
              <el-option :label="item.name" :value="item.code" v-for="item in dropdownData.telStatus" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="el-col fixed-width">
          <el-form-item label="跟进时间" prop="followDate">
            <el-date-picker v-model="dateObjs.followDate" type="daterange" :picker-options="pickerOptions2" value-format="yyyy-MM-dd"
              format="yyyy/MM/dd" @change="getfollowDate" clearable>
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="el-col fixed-width form-btns">
          <el-button size="mini" @click="search" type="primary">搜索</el-button>
          <el-button size="mini" @click="reset">重置</el-button>
        </div>
      </el-form>
      <el-table row-class-name="row-pointer" ref="multipleTable" height="460" v-on:row-click.self="goCaseDetail" :data="tb.data"
        tooltip-effect="dark" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" @selection-change="handleSelectionChange"
        empty-text="暂无数据" show-overflow-tooltip >
        <el-table-column type="selection" fixed="left">
        </el-table-column>
        <el-table-column v-for="field in tb.fields" :align="field.align||'left'" :prop="field.key" :label="field.label" :width="field.width"
          :key="field.id">
        </el-table-column>
        <el-table-column width="80" label="操作" v-if="operationBtns[1].isShow" align="left" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" v-on:click.stop.prevent="stopIntelligentHandle(scope,operationBtns[1])" >{{operationBtns[1].name}}
            </el-button>
          </template>
        </el-table-column>
      </el-table> 
       <!-- <my-table ref="multipleTable" :tb="tb"  :loading="loading"  @sortChange="sortChange" @rowClick="goCaseDetail"></my-table> -->
      <div>
          <el-row>
            <el-col :span="12" class="countInfo">
              共计 <span>委案金额</span><span class="money">{{commitMoney}}</span><span>最新欠款金额</span ><span class="money">{{latestDebtMoney}}</span>
            </el-col>
            <el-col :span="12">
              <el-pagination small @current-change="handleCurrentChange" :current-page.sync="conditionForm.currentPage" :page-size="conditionForm.pageSize"
                layout="sizes,total, prev, pager, next,jumper"  @size-change="changeSize"  :page-sizes="[15, 50, 100]" :total="total" >
              </el-pagination>
            </el-col>
          </el-row>
        </div>
    </div>
  </div>



</template>

<script>
  const fields = [{
      key: "caseCode",
      label: "案件编号",
      width: "110",
      type: '0'
    },
    {
      key: "batchCode",
      label: "批次号",
      width: "",
      type: '0'
    },
    {
      key: "loanInstitution",
      label: "贷款机构",
      width: "",
      type: '0'
    },
    {
      key: "productName",
      label: "贷款产品",
      width: "",
      type: '0'
    },
    {
      key: "borrowerName",
      label: "姓名",
      width: "",
      type: '0'
    },
    {
      key: "borrowerIdnumber",
      label: "身份证号",
      width: "180",
      type: '0'
    },
    {
      key: "borrowerPhone",
      label: "手机号",
      width: "120",
      type: '0'
    },
    {
      key: "borrowerAge",
      label: "年龄",
      width: "",
      type: '0'
    }, {
      key: "borrowerGenderName",
      label: "性别",
      width: "",
      type: '0'
    },
    {
      key: "overdueDay",
      label: "逾期天数",
      width: "",
      type: '0'
    },
    {
      key: "receivableAge",
      label: "账龄",
      width: "",
      type: '0'
    },
    {
      key: "bacthTimes",
      label: "手别",
      width: "",
      type: '0'
    },
    {
      key: "totalDebtMoney",
      label: "欠款金额",
      width: "",
      align: 'right',
      type: '0'
    },
    {
      key: "latestDebtMoney",
      label: "最新欠款金额",
      width: "100",
      align: 'right',
      type: '0'
    },
    {
      key: "commitMoney",
      label: "委案金额",
      width: "",
      align: 'right',
      type: '0'
    }, {
      key: "totalRepayMoney",
      label: "还款金额",
      width: "",
      align: 'right',
      type: '0'
    }, {
      key: "totalReduceMoney",
      label: "减免总金额",
      width: "",
      align: 'right',
      type: '0'
    },
    {
      key: "commitDate",
      label: "委案时间",
      width: "100",
      type: '0'
    },
    {
      key: "limitDate",
      label: "退案时间",
      width: "100",
      type: '0'
    }, {
      key: "caseArea",
      label: "案件地区",
      width: "",
      type: '0'
    },
    {
      key: "registeredAddress",
      label: "户籍地",
      width: "",
      type: '0'
    }, {
      key: "staffName",
      label: "催收员",
      width: "",
      type: '0'
    },
    {
      key: "departmentName",
      label: "部门",
      width: "",
      type: '0'
    },
    {
      key: "followDate",
      label: "跟进时间",
      width: "100",
      type: '0'
    }, {
      key: "caseStatusName",
      label: "案件状态",
      width: "",
      type: '0'
    },
    {
      key: "collectionStatusName",
      label: "催收状态",
      width: "100",
      type: '0'
    },
    {
      key: "telStatusName",
      label: "电话状态",
      width: "",
      type: '0'
    }
  ]
  // const selectList = [{
  //   label: '姓名',
  //   value: 'borrowerName'
  // }, {
  //   label: '身份证',
  //   value: 'borrowerIdnumber'
  // }, {
  //   label: '手机号',
  //   value: 'borrowerPhone'
  // }]
  import qs from 'qs'
  import myTable from '../../public-components/my-table'
  export default {
    components: {
      myTable
    },
    data() {
      return {
        commitMoney: '',
        latestDebtMoney: '',
        departmentProps: {
          label: 'name',
          value: 'id'
        },
        dropdownData: {

        },
        departments: [],
        dateObjs: {
          followDate: '',
          commitDate: '',
          limitDate: '',
        },
        result: '',
        pickerOptions2: {
          onPick: function (min, max) {

          }
        },
        conditionForm: {
          batchCode: '',
          borrowerAgeMax: '',
          borrowerAgeMin: '',
          borrowerGender: '',
          borrowerIdnumber: '',
          borrowerName: '',
          borrowerPhone: '',
          caseArea: '',
          caseCode: '',
          caseStatus: '',
          collectionStatus: '',
          commitMoneyMax: '',
          commitMoneyMin: '',
          departmentIds: [],
          latestDebtMoneyMax: '',
          latestDebtMoneyMin: '',
          loanInstitution: '',
          overdueDayMax: '',
          overdueDayMin: '',
          productName: '',
          receivableAge: '',
          registeredAddress: '',
          staffId: '',
          telStatus: '',
          totalDebtMoneyMax: '',
          totalDebtMoneyMin: '',
          totalRepayMoneyMax: '',
          totalRepayMoneyMin: '',
          followDateMin: "",
          followDateMax: "",
          limitDateMin: "",
          limitDateMax: "",
          commitDateMin: "",
          commitDateMax: "",

          currentPage: 1,
          pageSize: 15,
          departmentId: '',
          collectionManageQueryType: 'intelligent',
        },
        isShow: true,
        total: 0,
        operationBtns: [{
          name: '查看',
          identifier: 'sponsor_position_search',
          isShow: true,
        }, {
          name: '中断',
          identifier: 'sponsor_position_delete',
          form: {
            caseCode: ''
          },
          url: '/api/assignee/collectionManage/stopIntelligent',
          isShow: true,
        }, ],
        tb: {
          fields: fields,
          data: [
          ],
          height:460,
          OperationBtn: [
            {
              isShow: true,
              name: '中断',
              type: '',
              size: 'mini'
            }
          ]
        },
        roleList: [],
        positionTypeList: [],
        // 暂存修改原始数据
        tempRow: [],
        filename: '',
        fileList: [],
        loading: true,
        searchForm: {},
        hasSearch: false,
      }

    },
    computed: {
      
    },
    created() {
      // 获取该页的identifier
      let param = {
        identifier: this.$route.path.slice(1)
      }
      // this.$util.getPageResourceByMenu(param,this)
      this.getdropdownData()
      this.getDepartmentsTree()
      this.searchForm = Object.assign({}, this.conditionForm);
      this.getList(this.conditionForm);
      // this.getList(this.queryParams)


    },
    methods: {
      goCaseDetail(row) {
        // url编码
        let caseCode = this.$util.encrypt(row.caseCode, 'case');
        let caseId = this.$util.encrypt(row.caseId.toString(), 'case');
        let caseManageId = this.$util.encrypt(row.caseManageId.toString(), 'case');
        let url = (window.location.origin ? window.location.origin : '') + '/#/ai_case_detail?caseCode=' + caseCode + '&id=' + caseId + '&mId=' +
          caseManageId;
        window.open(url)
      },
      getStaffList() {
        // let departmentId = this.conditionForm.departmentId.pop()
        this.$axios.post('/api/assignee/caseManage/getStaffs', {
          departmentId: this.conditionForm.departmentIds.pop()
        }).then((res) => {
          if (res.data.code == 0) {
            this.dropdownData.staffs = res.data.data
          } else {
            this.$util.failCallback(res.data, this)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getDepartmentsTree() {
        this.$axios.post('/api/assignee/caseManage/getDepartmentsCondition', {}).then((res) => {
          if (res.data.code == 0) {
            this.departments = res.data.data
          } else {
            this.$util.failCallback(res.data, this)
          }
        }).catch((err) => {
          console.log(err)
        })

      },
      getfollowDate(val) {
          if(val == null){
            this.conditionForm.followDateMin = ''
            this.conditionForm.followDateMax = ''
            return;
          }
          this.conditionForm.followDateMin = val[0]
          this.conditionForm.followDateMax = val[1]
        
        
      },
      getlimitDate(val) {
        if(val == null){
            this.conditionForm.limitDateMin = ''
            this.conditionForm.limitDateMax = ''
            return;
          }
        this.conditionForm.limitDateMin = val[0]
        this.conditionForm.limitDateMax = val[1]
      },
      getcommitDate(val) {
        if(val == null){
            this.conditionForm.commitDateMin = ''
            this.conditionForm.commitDateMax = ''
            return;
          }
        this.conditionForm.commitDateMin = val[0]
        this.conditionForm.commitDateMax = val[1]
      },
      search() {
        this.$refs.conditionForm.validate((valid) => {
          if (valid) {
            this.conditionForm.sortField = ""
            this.conditionForm.sequence =""
            this.searchForm = Object.assign({}, this.conditionForm);
            if (this.conditionForm.currentPage == 1) {
              this.getList(this.conditionForm);
            } else {
              this.conditionForm.currentPage = 1;
              this.getList(this.conditionForm);
              this.hasSearch = true;
            }
            this.$refs.multipleTable.cleartbSort();

          }
        })
      },
      reset() {
        this.conditionForm.sortField = ""
        this.conditionForm.sequence =""
        this.$refs.conditionForm.resetFields()
        
        this.conditionForm.followDateMin = ""
        this.conditionForm.followDateMax = ""
        this.conditionForm.limitDateMin = ""
        this.conditionForm.limitDateMax = ""
        this.conditionForm.commitDateMin = ""
        this.conditionForm.commitDateMax = ""
        
        // 催收员下拉列表
        this.staffs = []
        // 当前催收员
        // this.conditionForm.staffId = ''
        // 当前部门
        this.conditionForm.departmentId = ''
        // 当前部门数组
        // this.conditionForm.departmentIds = []
        this.dateObjs = {
          followDate: '',
          commitDate: '',
          limitDate: '',
        }
        this.searchForm = Object.assign({}, this.conditionForm)
        if (this.conditionForm.currentPage == 1) {
          this.getList(this.conditionForm);
        } else {
          this.conditionForm.currentPage = 1;
          this.getList(this.conditionForm);
          this.hasSearch = true;
        }
        this.$refs.multipleTable.cleartbSort();

      },
      getList(data) {
        var queryParams;
        if (data) {
          queryParams = data
        } else {
          queryParams = this.conditionForm
        }
        this.loading = true;
        this.$axios.post('/api/assignee/collectionManage/queryIntelligentCollection', queryParams).then((res) => {
          if (res.data.code == 0) {
            this.tb.data = res.data.data.items
            this.total = res.data.data.totalNum
            this.loading = false;  
            this.commitMoney = res.data.data.countInfo ? res.data.data.countInfo.commitMoney : 0;
            this.latestDebtMoney = res.data.data.countInfo ? res.data.data.countInfo.latestDebtMoney : 0
          } else {
            this.$util.failCallback(res.data, this)
          }
          this.loading = false;
        }).catch((err) => {
          console.log(err);
          this.loading = false;
        })
      },
      // 改变页数
      changeSize(index) {
        this.conditionForm.pageSize = index;
        this.searchForm.pageSize = index;
        if(this.conditionForm.currentPage == 1) {
          this.getList(this.conditionForm)
        } else {
          this.conditionForm.currentPage = 1;
          this.getList(this.conditionForm);
        }
      },
      getdropdownData(cb) {
        // 获取下拉数据
        this.$axios.post('/api/assignee/collectionManage/queryIntelligentConditionInit').then((res) => {
          if (res.data.code == 0) {
            this.dropdownData = res.data.data;
            this.dropdownData.loanInstitution.unshift({
              name: 'All',
              code: ''
            });
            this.dropdownData.productName.unshift({
              name: 'All',
              code: ''
            });
            this.dropdownData.registeredAddress.unshift({
              name: 'All',
              code: ''
            });
            this.dropdownData.gender.unshift({
              name: 'All',
              code: ''
            });
            this.dropdownData.receivableAge.unshift({
              name: 'All',
              code: ''
            });
            this.dropdownData.caseStatus.unshift({
              name: 'All',
              code: ''
            });
            this.dropdownData.telStatus.unshift({
              name: 'All',
              code: ''
            });
            this.dropdownData.collectionStatus.unshift({
              name: 'All',
              code: ''
            });
            this.dropdownData.caseArea.unshift({
              name: 'All',
              code: ''
            });

          } else {
            this.$util.failCallback(res.data, this)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      handleSizeChange() {},
      handleCurrentChange(index) {
        this.searchForm.currentPage = index;
        if (this.hasSearch) {
          this.getList(this.conditionForm);
          this.hasSearch = false;
        } else {
          this.searchForm.sequence = this.conditionForm.sequence;
          this.searchForm.sortField = this.conditionForm.sortField;
          this.conditionForm = Object.assign({}, this.searchForm);
          this.getList(this.searchForm);
        }
      },
      handleSelectionChange() {},
      // 排序
      sortChange(item) {
        this.conditionForm.sortField = item.prop;
        this.conditionForm.sequence = item.order === 'ascending'?'ASC':'DESC';
        this.conditionForm.currentPage == 1;
        this.getList(this.conditionForm);
      },

      stopIntelligentHandle(scope, btn) {
        // if (this.selection.length == 1) {
        this.$confirm('此操作将中断智能催收, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          btn.form.caseCode = scope.row.caseCode
          this.$axios.post(btn.url, btn.form).then((res) => {
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

        // } else {
        //   this.$alert("请选择一条记录进行操作！", "提示", {
        //     confirmButtonText: "确定"
        //   });
        // }
      },

    },
    // 排序
    sortChange(item) {
      this.conditionForm.sortField = item.prop;
      this.conditionForm.sequence = item.order === 'ascending'?'ASC':'DESC';
      this.getList(this.conditionForm);
    },

  }

</script>

<style lang="scss">
  .row-pointer {
    cursor: pointer;
  }

</style>
