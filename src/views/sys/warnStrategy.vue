<template xmlns:font-color="http://www.w3.org/1999/xhtml">
  <div class="app-container" style="min-height: 100%">
    <!-- 查询和其他操作 -->
    <div class="filter-container" style="margin: 10px 0 10px 0; min-height: 70%">
    <!--  <el-tree
        :data="deptData"
        :props="deptTreeProps"
        :expand-on-click-node="false"
        default-expand-all
        @node-click="handleNodeClick"
      />-->
      <label>单位：</label>
      <el-select v-model="query.unitId"  filterable clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.deptId"
          :label="item.name"
          :value="item.deptId"
        >
        </el-option>
      </el-select>
      <label>装备类型：</label>
      <el-select v-model="query.type"  @change='typeCurrentChangeHandle' filterable clearable placeholder="请选择">
        <el-option label="工具" value="工具"/>
        <el-option label="车辆" value="车辆"/>
      </el-select>
      <label>装备小类：</label>
      <el-select v-model="query.subType" @change='subTypeCurrentChangeHandle' clearable placeholder="请选择">
        <el-option
          v-for="item in toolTypesOptions"
          :key="item.code"
          :label="item.value"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <label>预警类别：</label>
      <el-select v-model="query.warnType"   clearable placeholder="请选择">
        <el-option
          v-for="item in warnTypesOptions"
          :key="item.code"
          :label="item.value"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <label>发布状态：</label>
      <el-select v-model="query.state"   clearable placeholder="请选择">
        <el-option label="未发布" value="0"/>
        <el-option label="已发布" value="9"/>
      </el-select>
      <br>
      <el-button class="filter-item" style="margin-top: 9px" size="small" type="primary" icon="el-icon-search" @click="handleFind">查询
      </el-button>
      <el-button class="filter-item" style="margin-top: 9px" type="primary" icon="el-icon-refresh" size="small" @click="handleReset">重置
      </el-button>
      <el-button class="filter-item " style="margin-top: 9px" size="small" type="primary" icon="el-icon-plus" @click="handleAdd">添加策略</el-button>
      <el-button class="filter-item" style="margin-top: 9px" size="small" type="primary" icon="el-icon-plus" @click="delBatch()">批量删除</el-button>
      <el-button class="filter-item" style="margin-top: 9px" size="small" type="primary" icon="el-icon-thumb" @click="updateState()">发布</el-button>
    </div>
    <!-- 表格内容显示区域 -->
    <el-table   v-loading="loading" :data="tableData"   border style="width: 100% " @selection-change="handleSelectionChange" :default-sort="{ prop: 'startTime', order: 'ascending' }">

      <el-table-column type="selection"/>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column label="所属单位" width="160" align="center" sortable prop="unitName">
        <template slot-scope="scope">
          <span>{{ scope.row.unitName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="装备类型" width="160" align="center" sortable prop="type">
        <template slot-scope="scope">
          <span>{{ scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column label="装备小类" width="160" align="center" sortable prop="subType">
        <template slot-scope="scope">
          <span>{{ scope.row.subType}}</span>
        </template>
      </el-table-column>
      <el-table-column label="预警类别" width="160" align="center" sortable prop="warnType">
        <template slot-scope="scope">
          <span>{{ scope.row.warnType}}</span>
        </template>
      </el-table-column>
      <el-table-column label="有限期" width="160" align="center" sortable prop="expirationDate">
          <template slot-scope="scope" >
            <span>{{ scope.row.expirationDate}}</span>
          </template>
      </el-table-column>
      <el-table-column label="提前预警（天）" width="160" align="center" sortable prop="useState">
        <template slot-scope="scope">
          <span>{{ scope.row.warnNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="160" align="center">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.state === 0" size="small" type="info">未发布</el-tag>
            <el-tag v-else-if="scope.row.state=== 9" size="small" >已发布</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" min-width="150" align="center">
        <template slot-scope="scope">
          <el-tag  style="cursor: pointer" v-if="scope.row.state === 9 && pageSize === 8 "  size="small" @click="updateStates2(scope.row)">取消发布</el-tag>
          <el-button type="text" v-if="scope.row.state === 0" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text"  v-if="scope.row.state === 0" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="pagination">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        background
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新增修改界面 -->
    <el-dialog
      :title="!dataForm.id ? '新增预警策略' : '修改预警策略'"
      width="55%"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="dataForm"
        :model="dataForm"
        :rules="dataRule"
        label-width="80px"
        :size="size"
        style="text-align:left;"
        @keyup.enter.native="submitForm()"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item label="所属单位" prop="unitName" :label-width="formLabelWidth">
              <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
              <el-select v-model="dataForm.unitName"  @change='unitCurrentChangeHandle2' filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.deptId"
                  :label="item.name"
                  :value="item.deptId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="装备类型" prop="type" :label-width="formLabelWidth">
              <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
              <el-select v-model="dataForm.type"   @change='typeCurrentChangeHandle2'  clearable placeholder="请选择">
                <el-option label="工具" value="工具"/>
                <el-option label="车辆" value="车辆"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="装备小类" prop="subType" :label-width="formLabelWidth">
              <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
              <el-select v-model="dataForm.subType" @click.native="subTypeCurrentClickHandle2" @change='subTypeCurrentChangeHandle2' clearable placeholder="请选择">
                <el-option
                  v-for="item in toolTypesOptions"
                  :key="item.code"
                  :label="item.value"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="预警类别" prop="warnType" :label-width="formLabelWidth">
              <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
              <el-select v-model="dataForm.warnType" @click.native="warnTypeCurrentClickHandle2" clearable placeholder="请选择">
                <el-option
                  v-for="item in warnTypesOptions"
                  :key="item.code"
                  :label="item.value"
                  :value="item.value"
                >
                </el-option>
                <!-- <el-input v-model="dataForm.bigType" placeholder="请输入大类" /> -->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="有限期（天）" prop="expirationDate" :label-width="formLabelWidth">
              <el-input v-model="dataForm.expirationDate" placeholder="请输入有限期（天）" />
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="提前预警期（天）" prop="thisTime" :label-width="formLabelWidth">
              <el-input v-model="dataForm.warnNum" placeholder="提前预警期（天）" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :size="size" @click="dialogVisible = false">取消</el-button>
        <el-button :size="size" type="primary" :loading="editLoading" @click="submitEditForm">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import { getDept, getDeptArray, getLowDept } from '@/api/dept'
import { getType } from '@/api/interface'
import PopupTreeInput from '@/components/PopupTreeInput'
import initDict from '@/mixins/initDict'
import { getRoleList } from '@/api/roles'
import { getUserInfo } from '@/api/user'
import { getTeamByUnit } from '@/api/team'
import { getWareInfo } from '@/api/warehourse'
import { getFullWarnStrategyInfo, deleteWarnStratery, deleteBatchWarnStratery, addWarnStratery, updateWarnStratery, updateState, updateState2 } from '@/api/warnStrategy'

export default {
  mixins: [initDict],
  data() {
    return {
      size: 'small',
      tableData: [],
      stateOptions: [
        {
          value: 0,
          label: '正常'
        },
        {
          value: 9,
          label: '停用'
        }
      ],
      query: {
        toolName: '',
        toolUnit: '',
        bigType: '',
        toolTeam: '',
        toolWarehourse: '',
        unitId: '',
        type: '',
        subType: '',
        warnType: '',
        state: '',
        Type1: '',
        Type2: ''
      },
      id: '',
      title: '',
      dialogFormVisible: false, // 控制弹出框
      formLabelWidth: '120px',
      isEditForm: false,
      currentPage: 1,
      pageSize: 8,
      total: 0, // 总数量
      // 分类菜单列表
      deptData: [],
      value: '',
      // tree配置项
      deptTreeProps: {
        label: 'name',
        children: 'children'
      },

      options: [],
      teamOptions: [],
      wareOptions: [],
      unitID: 5,
      toolTypesOptions: [],
      warnTypesOptions: [],
      dataForm: {
        Id: '',
        unitName: '',
        unitId: '',
        type: '',
        subType: '',
        warnType: '',
        expirationDate: '',
        warnNum: '',
        toolPhoto: '',
        code: '',
        state: '',
        deptId: -1,
        prop: '',
        order: '',
        multipleSelection: [],
        Type1: '',
        Type2: '',
        userInfo: []
      },
      // 表单校验
      dataRule: {
        unitName: [{ required: true, message: '单位不能为空', trigger: 'blur' }]
      },
      loading: false,
      dialogVisible: false,
      editLoading: false

    }
  },
  created() {
    this.getUserInfo()
    this.findDeptTree()
    // 加载数据字典
    this.getFullWarnStrategyInfo()
    // this.getType()
    this.$forceUpdate()
  },
  methods: {
    parseTime,
    // 获取预警策略信息并分页显示（待条件的查询）
    getFullWarnStrategyInfo: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      params.append('unitId', this.query.unitId)
      params.append('type', this.query.type)
      params.append('subType', this.query.subType)
      params.append('warnType', this.query.warnType)
      params.append('state', this.query.state)
      getFullWarnStrategyInfo(params).then(response => {
        this.loading = false
        this.tableData = response.data.data.records
        console.log('表格获取的数据')
        console.log(this.tableData)
        this.total = response.data.data.total
      })
    },
    // 处理查找事件
    handleFind: function() {
      this.getFullWarnStrategyInfo()
    },
    // 重置功能呢
    handleReset: function() {
      this.query = {
        toolName: '',
        toolUnit: '',
        bigType: '',
        toolTeam: '',
        toolWarehourse: '',
        unitId: '',
        type: '',
        subType: '',
        warnType: '',
        state: ''
      }
      this.getFullWarnStrategyInfo()
    },
    // 换页
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.getFullWarnStrategyInfo()
    },
    // 加载部门列表
    findDeptTree: function() {
      getDept().then((res) => {
        this.deptData = res.data.data
      })
    },
    // 获取仓库信息
    getWareInfo: function() {
      const params = new URLSearchParams()
      params.append('unitId', this.query.toolUnit)
      params.append('teamId', this.query.toolTeam)
      if (this.query.toolTeam !== '' && this.query.toolTeam !== null) {
        getWareInfo(params).then((res) => {
          this.wareOptions = res.data.data
          this.$forceUpdate()
          console.log('库房的信息')
          console.log(this.wareOptions)
          console.log(this.wareHourseOptions)
        })
      }
    },
    // 编辑界面获取仓库信息
    getWareInfo2: function() {
      const params = new URLSearchParams()
      params.append('unitId', this.dataForm.toolUnit)
      params.append('teamId', this.dataForm.toolTeam)
      if (this.dataForm.toolTeam !== '' && this.dataForm.toolUnit !== null) {
        getWareInfo(params).then((res) => {
          this.wareOptions = res.data.data
          this.$forceUpdate()
          console.log('库房的信息')
          console.log(this.wareOptions)
          console.log(this.wareHourseOptions)
        })
      }
    },
    // 获取装备的类型
    getType: function(type1) {
      const params = new URLSearchParams()
      params.append('type', type1)
      getType(params).then((res) => {
        this.toolTypesOptions = res.data.data
        console.log('查询到的装备小类')
        console.log(this.toolTypesOptions)
        console.log(this.toolTypesOptions)
      })
    },
    // 获取用户信息
    getUserInfo: function() {
      const params = new URLSearchParams()
      getUserInfo().then((res) => {
        this.userInfo = res.data.data
        console.log('用户的信息')
        console.log(this.userInfo)
        this.unitID = res.data.data.deptId
        console.log(this.unitID)
        this.$forceUpdate()
        this.getDeptChilren()
      })
    },
    // 加载下级的部门
    getDeptChilren: function() {
      const params = new URLSearchParams()
      params.append('deptId', this.unitID)
      getLowDept(params).then((res) => {
        this.options = res.data.data
        console.log('下级单位')
        console.log(this.options)
        console.log(this.toolTypesOptions)
      })
    },
    findDeptArray: function() {
      getDeptArray().then((res) => {
        this.options = res.data.data
        console.log('111111111')
        console.log(this.options)
      })
    },
    // 处理查询条件中单位改变的事件
    unitCurrentChangeHandle(data) {
      this.$forceUpdate()
      console.log('查询条件中的单位变了')
      this.query.toolTeam = ''
      this.query.toolWarehourse = ''
      console.log(this.query.unitId)
    },
    // 编辑单位改变的事件
    unitCurrentChangeHandle2(data) {
      this.$forceUpdate()
      console.log('编辑页面的单位变了')
      console.log(data)
      this.dataForm.unitName = data
      this.dataForm.unitId = data
      this.dataForm.toolTeam = ''
      this.dataForm.teamName = ''
      this.dataForm.toolWarehourse = ''
      console.log(this.dataForm.toolUnit)
    },
    // 获取班组并赋值
    getTeamByUnit: function() {
      const params = new URLSearchParams()
      params.append('teamUnitid', this.query.toolUnit)
      getTeamByUnit(params).then((res) => {
        this.teamOptions = res.data.data
        console.log('班组的信息')
        console.log(this.teamOptions)
      })
    },
    // 编辑页面获取班组并赋值
    getTeamByUnit2: function() {
      const params = new URLSearchParams()
      params.append('teamUnitid', this.dataForm.toolUnit)
      getTeamByUnit(params).then((res) => {
        this.teamOptions = res.data.data
        console.log('编辑页面班组的信息')
        console.log(this.teamOptions)
      })
    },
    // 查询页面装备类型改变
    typeCurrentChangeHandle(data) {
      this.query.Type1 = ''
      this.query.type = data
      this.query.Type2 = ''
      this.query.subType = ''
      this.query.warnType = ''
      console.log('查询条件中的装备类型变了')
      if (data === '工具') {
        this.query.Type1 = 'tooltype'
        this.query.Type2 = 'toolwarntype'
      } else {
        this.query.Type1 = 'cartype'
        this.query.Type2 = 'carwarntype'
      }
      console.log(this.query.type)
      console.log(this.query.Type1)
      console.log(this.query.Type2)
      this.query.type = data
      // 获取装备小类
      this.getType(this.query.Type1)
      this.$forceUpdate()
    },
    // 编辑页面装备类型改变
    typeCurrentChangeHandle2(data) {
      this.dataForm.type = data
      this.dataForm.Type2 = ''
      this.dataForm.subType = ''
      this.dataForm.warnType = ''
      console.log('编辑条件中的装备类型变了')
      if (data === '工具') {
        this.dataForm.Type1 = 'tooltype'
        this.dataForm.Type2 = 'toolwarntype'
      } else {
        this.dataForm.Type1 = 'cartype'
        this.dataForm.Type2 = 'carwarntype'
      }
      console.log(this.dataForm.type)
      console.log(this.dataForm.Type1)
      console.log(this.dataForm.Type2)
      this.dataForm.type = data
      // 获取装备小类
      this.getType(this.dataForm.Type1)
      this.$forceUpdate()
    },
    subTypeCurrentClickHandle2(data) {
      this.getType(this.dataForm.Type1)
      this.$forceUpdate()
    },
    warnTypeCurrentClickHandle2(data) {
      const params = new URLSearchParams()
      console.log('预警类别的type为：' + this.dataForm.Type2)
      params.append('type', this.dataForm.Type2)
      getType(params).then((res) => {
        this.warnTypesOptions = res.data.data
        this.$forceUpdate()
        console.log(this.dataForm.Type2)
        console.log('查询到的装备小类')
        console.log(this.warnTypesOptions)
        console.log(this.warnTypesOptions)
      })
      this.$forceUpdate()
    },

    // 查询页面装备小类改变
    subTypeCurrentChangeHandle(data) {
      this.query.subType = data
      this.query.warnType = ''
      const params = new URLSearchParams()
      console.log('预警类别的type为：' + this.query.Type2)
      params.append('type', this.query.Type2)
      getType(params).then((res) => {
        this.warnTypesOptions = res.data.data
        console.log(this.query.Type2)
        console.log('查询到的装备小类')
        console.log(this.warnTypesOptions)
        console.log(this.warnTypesOptions)
      })
      this.$forceUpdate()
    },
    // 编辑页面装备小类改变
    subTypeCurrentChangeHandle2(data) {
      this.dataForm.subType = data
      this.dataForm.warnType = ''
      const params = new URLSearchParams()
      console.log('预警类别的type为：' + this.dataForm.Type2)
      params.append('type', this.dataForm.Type2)
      getType(params).then((res) => {
        this.warnTypesOptions = res.data.data
        console.log(this.dataForm.Type2)
        console.log('查询到的装备小类')
        console.log(this.warnTypesOptions)
        console.log(this.warnTypesOptions)
      })
      this.$forceUpdate()
    },
    // 编辑页面班组改变
    wareCurrentChangeHandle2(data) {
      this.dataForm.toolWarehourse = data
      this.dataForm.warehourseName = data
      console.log('查询条件中的库房变了')
      console.log(data)
    },
    typeCurrentChangeHandle1(data) {
      console.log('查询条件中的类别变了')
      console.log(data)
    },
    // 部门树的显示
    deptTreeCurrentChangeHandle(data) {
      debugger
      this.dataForm.deptId = data.deptId
      this.$forceUpdate()
    },
    // 显示新增界面
    handleAdd: function() {
      this.dialogVisible = true
      this.dataForm = {
        courseName: '',
        courseDept: '',
        toolUnit: '',
        code: '',
        startTime: '',
        endTime: '',
        state: '',
        deptId: -1,
        toolName: '',
        toolId: '',
        bigType: '',
        warnType: '',
        mediumType: '',
        smallType: '',
        toolPhoto: '',
        buyTime: '',
        toolNote: '',
        toolWarehourse: '',
        toolState: '',
        useState: '',
        nextTime: '',
        thisTime: ''
      }
    },
    // 编辑界面
    handleEdit: function(row) {
      this.isEditForm = true
      this.dialogVisible = true
      this.dataForm = {
        courseDept: '',
        toolUnit: ''
      }
      this.dataForm.courseDept = ''
      this.dataForm.toolUnit = ''
      this.dataForm = Object.assign({}, row)
      if (this.dataForm.unitName === '工具') {
        this.dataForm.Type1 = 'tooltype'
        this.dataForm.Type2 = 'toolwarntype'
      } else {
        this.dataForm.Type1 = 'cartype'
        this.dataForm.Type2 = 'carwarntype'
      }
      console.log('刚进入编辑页面的值为：')
      console.log(this.dataForm.Type1)
      console.log(this.dataForm.Type2)
      this.dataForm.toolState = Number(this.dataForm.toolState)
      console.log('下拉框中状态的值为' + this.dataForm.toolState)
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    // 处理删除操作
    handleDelete: function(row) {
      const that = this
      this.$confirm('此操作将删除租户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteWarnStratery(row.id).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.getFullWarnStrategyInfo()
            } else {
              this.$message({
                type: 'error',
                message: response.data.msg
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 处理取消发布操作
    updateStates2: function(row) {
      const that = this
      this.$confirm('此操作将取消发布, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          updateState2(row.id).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.getFullWarnStrategyInfo()
            } else {
              this.$message({
                type: 'error',
                message: response.data.msg
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '未取消发布'
          })
        })
    },
    /* sortTime(first, second) {
      return first - second
    },*/
    // 发布操作
    updateState: function() {
      const that = this
      // let ids = this.multipleSelection.map(v => v.toolId)
      console.log(this.multipleSelection.map(v => v.id))
      this.$confirm('是否发布这条策略?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          updateState(this.multipleSelection.map(v => v.id)).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.getFullWarnStrategyInfo()
            } else {
              this.$message({
                type: 'error',
                message: response.data.msg
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })
        })
    },
    // 批量删除
    delBatch: function() {
      const that = this
      // let ids = this.multipleSelection.map(v => v.toolId)
      console.log(this.multipleSelection.map(v => v.id))
      this.$confirm('此操作将删除工具, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteBatchWarnStratery(this.multipleSelection.map(v => v.id)).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.getFullWarnStrategyInfo()
            } else {
              this.$message({
                type: 'error',
                message: response.data.msg
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 详情处理事件
    goDetail: function(id) {
      this.$router.push({ name: '工具详情', params: { id }})
    },
    submitEditForm: function() {
      if (this.isEditForm) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true
              updateWarnStratery(this.dataForm).then((res) => {
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.isEditForm = false
                this.getFullWarnStrategyInfo()
              })
            })
          }
        })
      } else {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              console.log(this.dataForm)
              addWarnStratery(this.dataForm).then((res) => {
                this.editLoading = true
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.getFullWarnStrategyInfo()
              })
            })
          }
        })
      }
    }
  }
}
</script>
