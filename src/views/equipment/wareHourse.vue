<template xmlns:cursor="http://www.w3.org/1999/xhtml">
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
      <label>库房名称：</label>
      <el-input
        v-model="query.warehourseName"
        clearable
        class="filter-item"
        style="width: 200px;"
        size="small"
        placeholder="请输入工具名称"
        @keyup.enter.native="handleFind"
      />
      <label>单位：</label>
      <el-select v-model="query.unitId"  @change='unitCurrentChangeHandle' filterable clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.deptId"
          :label="item.name"
          :value="item.deptId"
        >
        </el-option>
      </el-select>
      <label>班组：</label>
      <el-select v-model="query.teamId" @change='teamCurrentChangeHandle' clearable placeholder="请选择">
        <el-option
          v-for="item in teamOptions"
          :key="item.teamId"
          :label="item.teamName"
          :value="item.teamId"
          >
        </el-option>
      </el-select>
      <label>库房地址：</label>
      <el-input
        v-model="query.warehourseAddress"
        clearable
        class="filter-item"
        style="width: 200px;"
        size="small"
        placeholder="请输入库房的地址"
      />
      <br>
      <el-button class="filter-item" style="margin-top: 9px" size="small" type="primary" icon="el-icon-search" @click="handleFind">查询
      </el-button>
      <el-button class="filter-item" style="margin-top: 9px" type="primary" icon="el-icon-refresh" size="small" @click="handleReset">重置
      </el-button>
      <el-button class="filter-item " style="margin-top: 9px" size="small" type="primary" icon="el-icon-plus" @click="handleAdd">添加库房</el-button>
      <el-button class="filter-item" style="margin-top: 9px" size="small" type="primary" icon="el-icon-delete" @click="delBatch()">批量删除</el-button>
    </div>
    <!-- 表格内容显示区域 -->
    <el-table   v-loading="loading" :data="tableData"   border style="width: 100% " @selection-change="handleSelectionChange" :default-sort="{ prop: 'startTime', order: 'ascending' }">

      <el-table-column type="selection"/>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column label="所属单位" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.unitName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属班组" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.teamName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="库房名称" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.warehourseName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="库房编号" width="120" align="center" sortable prop="toolId">
        <template slot-scope="scope">
          <span  @click="goDetail(scope.row.warehourseId)"    style="color: #2C7BFB ;cursor: pointer" >{{ scope.row.warehourseId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="库房地址" width="120" align="center" sortable prop="toolWarehourse">
        <template slot-scope="scope">
          <span>{{ scope.row.warehourseAddress}}</span>
        </template>
      </el-table-column>
      <el-table-column label="工具数量" width="120" align="center" sortable prop="countTool">
        <template slot-scope="scope">
          <span  @click="getToolDetail(scope.row.warehourseId)" style="color: #2C7BFB ;cursor: pointer" >{{ scope.row.countTool}}</span>
        </template>
      </el-table-column>
      <el-table-column label="车辆数量" width="120" align="center" sortable prop="toolWarehourse">
        <template slot-scope="scope">
          <span  @click="getCarDetail(scope.row.warehourseId)" style="color: #2C7BFB ;cursor: pointer" >{{ scope.row.countCar}}</span>
        </template>
      </el-table-column>
      <el-table-column label="保管人" width="120" align="center" sortable prop="toolWarehourse">
        <template slot-scope="scope">
          <span>{{ scope.row.peopleName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="120" align="center" sortable prop="nextTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120" align="center">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.warehourseState === 0" size="small">正常</el-tag>
            <el-tag v-else-if="scope.row.warehourseState=== 9" size="small" type="info">停用</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" min-width="150" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
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
      :title="!isEditForm ? '新增库房':'修改库房'"
      width="60%"
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
          <el-col :span="8">
            <el-form-item label="库房名称" prop="warehourseName" :label-width="formLabelWidth">
              <el-input v-model="dataForm.warehourseName" placeholder="请输入库房名称" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="所属班组" prop="teamName" :label-width="formLabelWidth">
              <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
              <el-select v-model="dataForm.teamName" @change='teamCurrentChangeHandle2' clearable placeholder="请选择">
                <el-option
                  v-for="item in teamOptions"
                  :key="item.teamId"
                  :label="item.teamName"
                  :value="item.teamId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库房地址" prop="unitName1" :label-width="formLabelWidth">
              <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
              <el-input v-model="dataForm.warehourseAddress" placeholder="请输入库房名称" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库房创建时间" prop="createTime" :label-width="formLabelWidth">
              <el-date-picker
                v-model="dataForm.createTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择购置日期时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="保管人" prop="peopleName" :label-width="formLabelWidth">
              <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
              <el-select v-model="dataForm.peopleName" @click.native='peopleCurrentChangeHandle2' @change="peopleCurrentChangeHandle2" clearable placeholder="请选择">
              <el-option
                v-for="item in userInfo2"
                :key="item.userId"
                :label="item.username"
                :value="item.userId">
              </el-option>
             <!-- <el-input v-model="dataForm.bigType" placeholder="请输入大类" /> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保管人电话" prop="peopleTel" :label-width="formLabelWidth">
              <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
              <el-input    v-model="dataForm.peopleTel" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="库房状态" prop="warehourseState" :label-width="formLabelWidth">
              <el-select v-model="dataForm.warehourseState" placeholder="请选择状态">
                <el-option
                   v-for="(item,index) in stateOptions"
                   :key="index"
                   :value="item.value"
                   :label="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="备注" prop="toolNote" :label-width="formLabelWidth">
              <el-input   maxlength="256"  show-word-limit rows=5 type="textarea" v-model="dataForm.warehourseNote" placeholder="请输入备注" />
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
import { fetchList, addCourse, updateCourse, deleteCourse, deleteBatchCourse, fetchOrderList } from '@/api/tool'
import { parseTime } from '@/utils/index'
import { getDept, getDeptArray, getLowDept } from '@/api/dept'
import { getType } from '@/api/interface'
import PopupTreeInput from '@/components/PopupTreeInput'
import initDict from '@/mixins/initDict'
import { getRoleList } from '@/api/roles'
import { getUserInfo, getUserInfoList } from '@/api/user'
import { getTeamByUnit } from '@/api/team'
import { getWareInfo, getFullWareInfo, updateWareHourse, deleteWareHourse, deleteBatchWareHourse, addWareHourse } from '@/api/warehourse'

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
        teamId: '',
        unitId: '',
        warehourseName: '',
        warehourseAddress: ''
      },
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
      userInfo2: [],
      unitID: '',
      toolTypesOptions: [],
      dataForm: {
        Id: '',
        toolName: '',
        toolUnit: '',
        toolTeam: '',
        nextTime: '',
        thisTime: '',
        code: '',
        state: '',
        deptId: -1,
        prop: '',
        order: '',
        multipleSelection: [],
        userInfo: [],
        unitId: '',
        unitName: '',
        teamId: '',
        teamName: '',
        peopleName: '',
        warehourseId: '',
        warehourseName: '',
        createTime: '',
        peopleTel: '',
        baoguanPeople: '',
        warehourseNote: ''
      },
      // 表单校验
      // 表单的库房字段的自读的设置于编辑
      isReadOnly: true,
      dataRule: {
        warehourseName: [{ required: true, message: '工具名称不能为空', trigger: 'blur' }], // courseDept: [{ required: true, message: '培训部门不能为空', trigger: 'blur' }],
        createTime: [{ required: true, message: '开始时间不能为空', trigger: 'blur' }],
        teamName: [{ required: true, message: '班组不能为空', trigger: 'blur' }],
        unitName: [{ required: true, message: '单位不能为空', trigger: 'blur' }],
        nextTime: [{ required: true, message: '结束时间不能为空', trigger: 'blur' }],
        warehourseState: [{ required: true, message: '状态不能为空', trigger: 'blur' }]
      },
      loading: true,
      dialogVisible: false,
      editLoading: false

    }
  },
  created() {
    this.getUserInfo()
    this.findDeptTree()
    // 加载数据字
    this.getType()
    this.$forceUpdate()
  },
  methods: {
    parseTime,
    // 查找库房信息
    getFullWareInfo: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      params.append('warehourseName', this.query.warehourseName)
      params.append('unitId', this.query.unitId)
      params.append('teamId', this.query.teamId)
      params.append('userUnit', this.unitID)
      params.append('warehourseAddress', this.query.warehourseAddress)
      getFullWareInfo(params).then(response => {
        this.loading = false
        this.tableData = response.data.data.records
        console.log('表格获取的数据')
        console.log(this.tableData)
        this.total = response.data.data.total
      })
    },
    // 出来查找事件
    handleFind: function() {
      this.getFullWareInfo()
    },
    // 重置查询条件
    handleReset: function() {
      this.query = {
        toolName: '',
        warehourseName: '',
        teamId: '',
        unitId: '',
        warehourseAddress: '',
        toolUnit: '',
        bigType: '',
        toolTeam: '',
        toolWarehourse: ''
      }
      this.getFullWareInfo()
    },
    // 换页
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.getFullWareInfo()
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
      params.append('unitId', this.query.unitId)
      params.append('teamId', this.query.teamId)
      if (this.query.teamId !== '' && this.query.teamId !== null) {
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
    // 获取工具的类型
    getType: function() {
      const params = new URLSearchParams()
      params.append('type', 'tooltype')
      getType(params).then((res) => {
        this.toolTypesOptions = res.data.data
        console.log('工具的类型')
        console.log(this.toolTypesOptions)
        console.log(this.toolTypesOptions)
      })
    },
    // 查询获取用户信息
    getUserInfo: function() {
      const params = new URLSearchParams()
      getUserInfo().then((res) => {
        this.userInfo = res.data.data
        console.log('用户的信息')
        console.log(this.userInfo)
        this.unitID = res.data.data.deptId
        console.log(this.unitID)
        const a = this.userInfo.avatar
        this.$store.dispatch('setUseradvatar', a)
        this.getFullWareInfo()
        this.$forceUpdate()
        this.getDeptChilren()
      })
    },
    // 编辑页面获取用户信息
    getUserInfoList: function() {
      const params = new URLSearchParams()
      getUserInfoList().then((res) => {
        this.userInfo2 = res.data.data
        console.log('用户的信息')
        console.log(this.userInfo2)
        this.$forceUpdate()
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
      this.query.teamId = ''
      console.log(this.query.unitId)
      if (this.query.unitId !== '') {
        this.getTeamByUnit(this.query.unitId)
      }
    },
    // 编辑单位改变的事件
    unitCurrentChangeHandle2(data) {
      this.$forceUpdate()
      console.log('编辑页面的单位变了')
      console.log(data)
      this.dataForm.unitId = data
      this.dataForm.teamName = ''
      console.log(this.dataForm.toolUnit)
      if (this.dataForm.unitName !== '') {
        this.getTeamByUnit2(this.dataForm.unitId)
      }
    },
    // 获取班组并赋值
    getTeamByUnit: function() {
      const params = new URLSearchParams()
      params.append('teamUnitid', this.query.unitId)
      getTeamByUnit(params).then((res) => {
        this.teamOptions = res.data.data
        console.log('班组的信息')
        console.log(this.teamOptions)
      })
    },
    // 编辑页面获取班组并赋值
    getTeamByUnit2: function() {
      const params = new URLSearchParams()
      params.append('teamUnitid', this.dataForm.unitId)
      getTeamByUnit(params).then((res) => {
        this.teamOptions = res.data.data
        console.log('编辑页面班组的信息')
        console.log(this.teamOptions)
      })
    },
    teamCurrentChangeHandle(data) {
      console.log('查询条件中的班组变了')
      console.log(this.query.toolTeam)
      this.query.toolTeam = data
      this.$forceUpdate()
      console.log(data)
    },
    teamCurrentChangeHandle2(data) {
      this.dataForm.teamId = data
      const params = new URLSearchParams()
      params.append('teamId', this.dataForm.teamId)
      getUserInfoList(params).then((res) => {
        this.userInfo2 = res.data.data
        console.log('编辑页面用户的信息')
        console.log(this.userInfo2)
      })
      console.log('编辑页面中的班组变了')
      console.log('班组变为了值：' + data)
      this.$forceUpdate()
    },
    peopleCurrentChangeHandle2(data) {
      this.dataForm.baoguanPeople = this.dataForm.peopleName
      const that = this
      this.dataForm.peopleTel = ''
      this.userInfo2.forEach((item, index) => {
        if (item.userId === this.dataForm.peopleName) {
          console.log(item.username)
          // console.log(that.dataForm.peopleTel)
          console.log('赋值操作在执行：把电话赋值')
          this.dataForm.peopleTel = item.phone
        }
      })
    },
    wareCurrentChangeHandle2(data) {
      this.dataForm.toolWarehourse = data
      this.dataForm.warehourseName = data
      console.log('查询条件中的库房变了')
      console.log(data)
    },
    typeCurrentChangeHandle(data) {
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
      this.isEditForm = false
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
    goDetail: function(id) {
      this.$router.push({ name: '库房详情', params: { id }})
    },
    getToolDetail: function(id) {
      this.$router.push({ name: '库房内工具详情', params: { id }})
    },
    getCarDetail: function(id) {
      this.$router.push({ name: '库房内车辆详情', params: { id }})
    },
    // 编辑界面
    handleEdit: function(row) {
      this.isEditForm = true
      this.title = '修改库房'
      this.dialogVisible = true
      this.dataForm = {
        courseDept: '',
        toolUnit: ''
      }
      this.dataForm.toolUnit = ''
      this.dataForm = Object.assign({}, row)
      this.dataForm.warehourdrState = Number(this.dataForm.warehourseState)
      console.log('下拉框中状态的值为' + this.dataForm.warehourseState)
      const params = new URLSearchParams()
      params.append('teamUnitid', this.dataForm.unitId)
      getTeamByUnit(params).then((res) => {
        this.teamOptions = res.data.data
        console.log('进入编辑页面时班组的信息')
        console.log(this.teamOptions)
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    handleDelete: function(row) {
      if (row.countTool !== 0 || row.countCar !== 0) {
        this.$message({
          showClose: true,
          message: '库房不为空，请先清空库房!',
          type: 'warning'
        })
      } else {
        const that = this
        this.$confirm('此操作将删除库房, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteWareHourse(row.warehourseId).then(response => {
              if (response.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                that.getFullWareInfo()
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
      }
    },
    /* sortTime(first, second) {
      return first - second
    },*/
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
          deleteBatchWareHourse(this.multipleSelection.map(v => v.warehourseId)).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.getFullWareInfo()
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
    submitEditForm: function() {
      if (this.isEditForm) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true
              updateWareHourse(this.dataForm).then((res) => {
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.isEditForm = false
                this.getFullWareInfo()
                this.$forceUpdate()
              })
            })
          }
        })
      } else {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              console.log(this.dataForm)
              addWareHourse(this.dataForm).then((res) => {
                this.editLoading = true
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.getFullWareInfo()
              })
            })
          }
        })
      }
    }
  }
}
</script>
