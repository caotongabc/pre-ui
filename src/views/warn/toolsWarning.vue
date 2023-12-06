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
      <label>工具名称：</label>
      <el-input
        v-model="query.toolName"
        clearable
        class="filter-item"
        style="width: 200px;"
        size="small"
        placeholder="请输入工具名称"
        @keyup.enter.native="handleFind"
      />
      <label>单位：</label>
      <el-select v-model="query.toolUnit" filterable clearable placeholder="请选择" @change="unitCurrentChangeHandle">
        <el-option
          v-for="item in options"
          :key="item.deptId"
          :label="item.name"
          :value="item.deptId"
        />
      </el-select>
      <label>班组：</label>
      <el-select v-model="query.toolTeam" clearable placeholder="请选择" @change="teamCurrentChangeHandle">
        <el-option
          v-for="item in teamOptions"
          :key="item.teamId"
          :label="item.teamName"
          :value="item.teamId"
        />
      </el-select>
      <label>库房：</label>
      <el-select v-model="query.toolWarehourse" clearable placeholder="请选择">
        <el-option
          v-for="item in wareOptions"
          :key="item.warehourseId"
          :label="item.warehourseName"
          :value="item.warehourseId"
        />
      </el-select>
      <label>类别：</label>
      <el-select v-model="query.bigType" clearable placeholder="请选择">
        <el-option
          v-for="item in toolTypesOptions"
          :key="item.code"
          :label="item.value"
          :value="item.value"
        />
      </el-select>
      <br>
      <el-button class="filter-item" style="margin-top: 9px" size="small" type="primary" icon="el-icon-search" @click="handleFind">查询
      </el-button>
      <el-button class="filter-item" style="margin-top: 9px" type="primary" icon="el-icon-refresh" size="small" @click="handleReset">重置
      </el-button>
    </div>
    <!-- 表格内容显示区域 -->
    <el-table v-loading="loading" :data="tableData" border style="width: 100% " :default-sort="{ prop: 'startTime', order: 'ascending' }" @selection-change="handleSelectionChange">

      <el-table-column type="selection" />
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所属单位" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.unitName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属班组" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.teamName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工具名称" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.toolName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工具编号" width="120" align="center" sortable prop="toolId">
        <template slot-scope="scope">
          <span style="color: #2C7BFB ;cursor: pointer" @click="goDetail(scope.row.toolId)">{{ scope.row.toolId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="使用状态" width="150" align="center" sortable prop="useState">
        <template slot-scope="scope">
          <span>{{ scope.row.useState }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属库房" width="180" align="center" sortable prop="toolWarehourse">
        <template slot-scope="scope">
          <span>{{ scope.row.warehourseName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大类" width="130" align="center" sortable prop="bigType">
        <template slot-scope="scope">
          <span>{{ scope.row.bigType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下次试验时间" width="200" align="center" sortable prop="nextTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.nextTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120" align="center">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.toolState === 0" size="small">正常</el-tag>
            <el-tag v-else-if="scope.row.toolState=== 9" size="small" type="info">试验不合格</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" min-width="150" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">处理</el-button>
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
      :title="!dataForm.id ? '工具试验' : '工具试验'"
      width="70%"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-collapse v-model="activeNames">
        <el-collapse-item title="工具详情" name="1">
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
            <el-form-item label="工具编号" prop="toolId" :label-width="formLabelWidth">
              <el-input v-model="dataForm.toolId"  disabled placeholder="请输入工具编号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工具名称" prop="toolName" :label-width="formLabelWidth">
              <el-input v-model="dataForm.toolName"  disabled placeholder="请输入工具名称" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属单位" prop="unitName" :label-width="formLabelWidth">
              <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
              <el-select v-model="dataForm.unitName"  disabled filterable clearable placeholder="请选择" :label-width="formLabelWidth" @change="unitCurrentChangeHandle2">
                <el-option
                  v-for="item in options"
                  :key="item.deptId"
                  :label="item.name"
                  :value="item.deptId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="所属班组" prop="teamName" :label-width="formLabelWidth">
              <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
              <el-select v-model="dataForm.teamName"  disabled clearable placeholder="请选择" :label-width="formLabelWidth" @change="teamCurrentChangeHandle2">
                <el-option
                  v-for="item in teamOptions"
                  :key="item.teamId"
                  :label="item.teamName"
                  :value="item.teamId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属仓库" prop="unitName1" :label-width="formLabelWidth">
              <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
              <el-select v-model="dataForm.warehourseName"  disabled clearable placeholder="请选择" @change="wareCurrentChangeHandle2">
                <el-option
                  v-for="item in wareOptions"
                  :key="item.warehourseId"
                  :label="item.warehourseName"
                  :value="item.warehourseId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="购置时间" prop="buyTime" :label-width="formLabelWidth">
              <el-date-picker
                disabled
                v-model="dataForm.buyTime"
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
            <el-form-item label="大类" prop="bigType" :label-width="formLabelWidth">
              <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
              <el-select v-model="dataForm.bigType"  filterable disabled clearable placeholder="请选择">
                <el-option
                  v-for="item in toolTypesOptions"
                  :key="item.code"
                  :label="item.value"
                  :value="item.value"
                />
                <!-- <el-input v-model="dataForm.bigType" placeholder="请输入大类" /> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工器具状态" prop="toolState" :label-width="formLabelWidth">
              <el-select v-model="dataForm.toolState" disabled placeholder="请选择状态">
                <el-option
                  v-for="(item,index) in stateOptions"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="toolNote" :label-width="formLabelWidth">
              <el-input v-model="dataForm.toolNote" disabled type="textarea" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
        </el-collapse-item>
        <el-collapse-item title="试验信息" name="2">
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
                <el-form-item label="本次试验时间" prop="thisTime" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model="dataForm.thisWarnTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择结束日期时间"
                    @change="thisTimeChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下次试验时间" prop="nextTime" :label-width="formLabelWidth">
                  <el-date-picker
                    disabled
                    v-model="dataForm.nextWarnTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择结束日期时间"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="试验人员" prop="peopleName" :label-width="formLabelWidth">
                  <el-input v-model="dataForm.warnPeople"   placeholder="请输入试验人员" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="试验单位" prop="peopleName" :label-width="formLabelWidth">
                  <el-input v-model="dataForm.warnUnit"  placeholder="请输入单位" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="试验结果" prop="peopleName" :label-width="formLabelWidth">
                  <el-select v-model="dataForm.warnResult" placeholder="请选择试验结果" >
                    <el-option label="合格" value="合格">
                    </el-option>
                    <el-option value="不合格" label="不合格"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="备注" prop="warnNote" :label-width="formLabelWidth">
                <el-input  type="textarea" v-model="dataForm.warnNote"  placeholder="请输入备注" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <span slot="footer" class="dialog-footer">
        <el-button :size="size" @click="dialogVisible = false">取消</el-button>
        <el-button :size="size" type="primary" :loading="editLoading" @click="submitEditForm">确定</el-button>
      </span>
    </el-dialog>
    <!-- 派单界面 -->
  </div>
</template>

<script>
import { fetchList, addCourse, fetchWarnList, updateCourse, deleteCourse, deleteBatchCourse, fetchOrderList } from '@/api/tool'
import { parseTime } from '@/utils/index'
import { getDept, getDeptArray, getLowDept } from '@/api/dept'
import { getType } from '@/api/interface'
import PopupTreeInput from '@/components/PopupTreeInput'
import initDict from '@/mixins/initDict'
import { getRoleList } from '@/api/roles'
import { getUserInfo } from '@/api/user'
import { getTeamByUnit } from '@/api/team'
import { getWareInfo } from '@/api/warehourse'
import { getFullWarnStrategyInfo, getOneWarnStrategyInfo } from '@/api/warnStrategy'
import { addToolWarnInfo } from '@/api/warning'
// 用于时间加数字的格式转换
import moment from 'moment'

export default {
  mixins: [initDict],
  data() {
    return {
      activeNames: ['1', '2'],
      size: 'small',
      tableData: [],
      stateOptions: [
        {
          value: 0,
          label: '正常'
        },
        {
          value: 9,
          label: '试验不合格'
        }
      ],
      query: {
        toolName: '',
        toolUnit: '',
        bigType: '',
        toolTeam: '',
        toolWarehourse: '',
        userUnit: ''
      },
      title: '',
      dispatchDialogFormVisible: false,
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
      unitID: '',
      toolTypesOptions: [],
      dataForm: {
        courseName: '',
        courseDept: '',
        Id: '',
        toolName: '',
        toolId: '',
        bigType: '',
        unitName: '',
        useState: '',
        toolPhoto: '',
        buyTime: '',
        toolNote: '',
        toolWarehourse: '',
        toolState: '',
        toolStateName: '',
        toolUnit: '',
        toolTeam: '',
        nextTime: '',
        thisTime: '',
        code: '',
        startTime: '',
        endTime: '',
        state: '',
        deptId: -1,
        prop: '',
        order: '',
        handleId: '',
        multipleSelection: [],
        userInfo: [],
        warehourseId: '',
        warehourseName: '',
        thisWarnTime: '',
        nextWarnTime: '',
        warnPeople: '',
        warnUnit: '',
        warnResult: '',
        warnNote: '',
        type: '工具',
        subType: '',
        warnType: '试验',
        equipmentId: '',
        expirationDate: ''
      },
      // 表单校验
      dataRule: {
        toolName: [{ required: true, message: '工具名称不能为空', trigger: 'blur' }], // courseDept: [{ required: true, message: '培训部门不能为空', trigger: 'blur' }],
        thisTime: [{ required: true, message: '开始时间不能为空', trigger: 'blur' }],
        teamName: [{ required: true, message: '班组不能为空', trigger: 'blur' }],
        unitName: [{ required: true, message: '单位不能为空', trigger: 'blur' }],
        nextTime: [{ required: true, message: '结束时间不能为空', trigger: 'blur' }],
        toolState: [{ required: true, message: '状态不能为空', trigger: 'blur' }]
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
    this.getType()
    this.$forceUpdate()
  },
  methods: {
    parseTime,
    getCourseList: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      params.append('userUnit', this.unitID)
      fetchWarnList(params).then(response => {
        this.loading = false
        this.tableData = response.data.data.records
        this.total = response.data.data.total
      })
    },
    // 获取试验信息并分页显示（待条件的查询）
    fetchWarnList: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      params.append('toolName', this.query.toolName)
      params.append('toolUnit', this.query.toolUnit)
      params.append('toolTeam', this.query.toolTeam)
      params.append('userUnit', this.unitID)
      params.append('toolWarehourse', this.query.toolWarehourse)
      params.append('bigType', this.query.bigType)
      fetchWarnList(params).then(response => {
        this.loading = false
        this.tableData = response.data.data.records
        console.log('表格获取的数据')
        console.log(this.tableData)
        this.total = response.data.data.total
      })
    },
    // 处理日期和数字相加的函数
    AddDayNumsDate: function(p_date, DayNums) {
      if (!DayNums && DayNums === '') {
        return null
      }
      console.log(p_date)
      DayNums = parseInt(DayNums)
      var t_date = new Date(p_date)
      t_date.setDate(t_date.getDate() + parseInt(DayNums))
      const str = moment(t_date).format('YYYY-MM-DD hh:mm:ss')
      console.log(str)

      return str
    },
    // 获取预警策略相关的信息
    getOneWarnStrategyInfo: function(message) {
      this.loading = true
      const params = new URLSearchParams()
      params.append('unitId', this.dataForm.toolUnit)
      params.append('subType', this.dataForm.bigType)
      params.append('type', '工具')
      params.append('warnType', '试验')
      getOneWarnStrategyInfo(params).then(response => {
        this.loading = false
        // eslint-disable-next-line no-constant-condition
        if (response.data.data === null) {
          this.$message({
            showClose: true,
            message: '预警策略信息缺失，请配置相应的预警策略信息',
            type: 'warning'
          })
        } else {
          this.dataForm.expirationDate = response.data.data.expirationDate
          this.dataForm.nextWarnTime = this.AddDayNumsDate(this.dataForm.thisWarnTime, this.dataForm.expirationDate)
          console.log('获取到的预警策略数据')
          console.log(response.data.data)
          console.log(this.dataForm.expirationDate)
          console.log(this.dataForm.nextWarnTime)
        }
      })
    },
    // 处理查找事件
    handleFind: function() {
      this.fetchWarnList()
    },
    // 重置功能呢
    handleReset: function() {
      this.query = {
        toolName: '',
        toolUnit: '',
        bigType: '',
        toolTeam: '',
        toolWarehourse: ''
      }
      this.fetchWarnList()
    },
    // 换页
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.fetchWarnList()
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
    // 获取用户信息
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
        this.getCourseList()
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
      console.log(this.query.toolUnit)
      if (this.query.toolUnit !== '') {
        this.getTeamByUnit(this.query.toolUnit)
      }
    },
    // 编辑单位改变的事件
    unitCurrentChangeHandle2(data) {
      this.$forceUpdate()
      console.log('编辑页面的单位变了')
      console.log(data)
      this.dataForm.toolUnit = data
      this.dataForm.toolTeam = ''
      this.dataForm.teamName = ''
      this.dataForm.toolWarehourse = ''
      console.log(this.dataForm.toolUnit)
      if (this.dataForm.toolUnit !== '') {
        this.getTeamByUnit2(this.dataForm.toolUnit)
      }
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
    // 查询页面班组改变
    teamCurrentChangeHandle(data) {
      console.log('查询条件中的班组变了')
      console.log(this.query.toolTeam)
      this.query.toolTeam = data
      this.getWareInfo()
      this.$forceUpdate()
      console.log(data)
    },
    // 查询页面班组改变
    teamCurrentChangeHandle2(data) {
      this.dataForm.toolTeam = data
      this.getWareInfo2()
      console.log('编辑页面中的班组变了')
      console.log('班组变为了值：' + data)
      this.$forceUpdate()
    },
    // 编辑页面班组改变
    wareCurrentChangeHandle2(data) {
      this.dataForm.toolWarehourse = data
      this.dataForm.warehourseName = data
      console.log('查询条件中的库房变了')
      console.log(data)
    },
    // 编辑页面的本次试验时间更改
    thisTimeChange(data) {
      this.dataForm.thisWarnTime = data
      this.getOneWarnStrategyInfo()
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
      this.dataForm.toolState = Number(this.dataForm.toolState)
      this.dataForm.subType = this.dataForm.bigType
      this.dataForm.warnType = '试验'
      this.dataForm.equipmentId = this.dataForm.toolId
      this.dataForm.type = '工具'
      console.log('下拉框中状态的值为' + this.dataForm.toolState)
      const params = new URLSearchParams()
      params.append('teamUnitid', this.dataForm.toolUnit)
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
      const that = this
      this.$confirm('此操作将删除租户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteCourse(row.id).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.getCourseList()
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
    /* sortTime(first, second) {
      return first - second
    },*/
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
          deleteBatchCourse(this.multipleSelection.map(v => v.id)).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.getCourseList()
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
              console.log('提交的时候表格的数据')
              this.dataForm.handleId = this.userInfo.userId
              console.log(this.dataForm)
              addToolWarnInfo(this.dataForm).then((res) => {
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.isEditForm = false
                this.getCourseList()
              })
            })
          }
        })
      } else {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              console.log(this.dataForm)
              addCourse(this.dataForm).then((res) => {
                this.editLoading = true
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.getCourseList()
              })
            })
          }
        })
      }
    }
  }
}
</script>
