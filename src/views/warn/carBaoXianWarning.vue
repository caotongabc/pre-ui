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
      <label>车牌号：</label>
      <el-input
        v-model="query.carNumber"
        clearable
        class="filter-item"
        style="width: 200px;"
        size="small"
        placeholder="请输入车牌号"
        @keyup.enter.native="handleFind"
      />
      <label>单位：</label>
      <el-select v-model="query.unitId" filterable clearable placeholder="请选择" @change="unitCurrentChangeHandle">
        <el-option
          v-for="item in options"
          :key="item.deptId"
          :label="item.name"
          :value="item.deptId"
        />
      </el-select>
      <label>班组：</label>
      <el-select v-model="query.teamId" clearable placeholder="请选择" @change="teamCurrentChangeHandle">
        <el-option
          v-for="item in teamOptions"
          :key="item.teamId"
          :label="item.teamName"
          :value="item.teamId"
        />
      </el-select>
      <label>库房：</label>
      <el-select v-model="query.warehourseId" clearable placeholder="请选择">
        <el-option
          v-for="item in wareOptions"
          :key="item.warehourseId"
          :label="item.warehourseName"
          :value="item.warehourseId"
        />
      </el-select>
      <label>车辆种类：</label>
      <el-select v-model="query.carType" clearable placeholder="请选择">
        <el-option
          v-for="item in carTypesOptions"
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
    <el-table v-loading="loading" :data="tableData" border style="width: 100% " :default-sort="{ prop: 'startTime', order: 'ascending' }" @selection-change="handleSelectionChange">      <el-table-column type="selection" />
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所属单位" width="150" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.unitName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属班组" width="150" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.teamName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="车牌号" width="180" align="center" sortable prop="carNumber">
        <template slot-scope="scope">
          <span style="color: #2C7BFB ;cursor: pointer" @click="goDetail(scope.row.carNumber)">{{ scope.row.carNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="车辆种类" width="180" align="center" sortable prop="bigType">
        <template slot-scope="scope">
          <span>{{ scope.row.carType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="使用状态" width="150" align="center" sortable prop="useState">
        <template slot-scope="scope">
          <span>{{ scope.row.carUseState }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属库房" width="180" align="center" sortable prop="toolWarehourse">
        <template slot-scope="scope">
          <span>{{ scope.row.warehourseName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下次保险时间" width="200" align="center" sortable prop="nextTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.nextInsuranceTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120" align="center">
        <template slot-scope="scope">
          <div>
            <el-tag  style="margin-bottom: 2px" v-if="scope.row.insuranceState=== 2" size="small" type="info">保险不合格</el-tag>
            <el-tag  style="margin-bottom: 2px" v-else-if="scope.row.insuranceState=== 1" size="small" >保险合格</el-tag>
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
      :title="!dataForm.id ? '车辆保险处理' : '车辆保险处理'"
      width="70%"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-collapse v-model="activeNames">
        <el-collapse-item title="车辆详情" name="1">
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
                <el-form-item label="车牌号" prop="carNumber" :label-width="formLabelWidth">
                  <el-input v-model="dataForm.carNumber"  :disabled="true" placeholder="请输入车牌号" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属单位" prop="unitName" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="dataForm.unitName"  :disabled="true" filterable clearable placeholder="请选择" @change="unitCurrentChangeHandle2">
                    <el-option
                      v-for="item in options"
                      :key="item.deptId"
                      :label="item.name"
                      :value="item.deptId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属班组" prop="teamName" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="dataForm.teamName"  :disabled="true" clearable placeholder="请选择" @change="teamCurrentChangeHandle2">
                    <el-option
                      v-for="item in teamOptions"
                      :key="item.teamId"
                      :label="item.teamName"
                      :value="item.teamId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="所属仓库" prop="warehourseName" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="dataForm.warehourseName" :disabled="true"  clearable placeholder="请选择" @click.native="warehoueseClick" @change="wareCurrentChangeHandle2">
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
                <el-form-item label="大类" prop="carType" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="dataForm.carType"  :disabled="true" clearable placeholder="请选择">
                    <el-option
                      v-for="item in carTypesOptions"
                      :key="item.code"
                      :label="item.value"
                      :value="item.value"
                    />
                    <!-- <el-input v-model="dataForm.bigType" placeholder="请输入大类" /> -->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车辆状态" prop="carState" :label-width="formLabelWidth">
                  <el-select v-model="dataForm.carState"  :disabled="true" placeholder="请选择状态">
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
              <el-col :span="8">
                <el-form-item label="车长(m)" prop="carLength" :label-width="formLabelWidth">
                  <el-input-number v-model="dataForm.carLength"  :disabled="true" :min="0" :controls="false" :precision="2" placeholder="请输入车长" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车宽(m)" prop="carWidth" :label-width="formLabelWidth">
                  <el-input-number v-model="dataForm.carWidth"  :disabled="true" :min="0" :controls="false" :precision="2" placeholder="请输入车宽" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车高(m)" prop="carHeight" :label-width="formLabelWidth">
                  <el-input-number v-model="dataForm.carHeight" :disabled="true"  :min="0" :controls="false" :precision="2" placeholder="请输入车高" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="车重(t)" prop="carWeight" :label-width="formLabelWidth">
                  <el-input-number v-model="dataForm.carWeight"  :disabled="true" :min="0" :controls="false" :precision="2" placeholder="请输入车重" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="载重量(t)" prop="carZaizhong" :label-width="formLabelWidth">
                  <el-input-number v-model="dataForm.carZaizhong"  :disabled="true" :min="0" :controls="false" :precision="2" placeholder="请输入载重量(t)" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="备注" prop="carNote" :label-width="formLabelWidth">
                  <el-input v-model="dataForm.carNote" maxlength="256" :disabled="true"  show-word-limit rows="2" type="textarea" placeholder="请输入备注" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="车辆保险信息" name="2">
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
                <el-form-item label="本次保险时间" prop="thisTime" :label-width="formLabelWidth">
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
                <el-form-item label="下次保险时间" prop="nextTime" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model="dataForm.nextWarnTime"
                    disabled
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择结束日期时间"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="试验人员" prop="peopleName" :label-width="formLabelWidth">
                  <el-input v-model="dataForm.warnPeople" placeholder="请输入试验人员" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="保险单位" prop="peopleName" :label-width="formLabelWidth">
                  <el-input v-model="dataForm.warnUnit" placeholder="请输入单位" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="保险结果" prop="peopleName" :label-width="formLabelWidth">
                  <el-select v-model="dataForm.warnResult" placeholder="请选择试验结果">
                    <el-option label="合格" value="合格" />
                    <el-option value="不合格" label="不合格" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="备注" prop="warnNote" :label-width="formLabelWidth">
                  <el-input v-model="dataForm.warnNote" type="textarea" placeholder="请输入备注" />
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

  </div>
</template>

<script>
import { fetchList, addCourse, updateCourse, deleteCourse, deleteBatchCourse, isExistToolId } from '@/api/tool'
import { fetchCarList, fetchCarWarnList, fetchCarWarnInsuranceList, addCar, updateCar, deleteCar, deleteBatchCar, isExistCarNumber } from '@/api/car'
import { parseTime } from '@/utils/index'
import { getDept, getDeptArray, getLowDept } from '@/api/dept'
import { getType } from '@/api/interface'
import PopupTreeInput from '@/components/PopupTreeInput'
import initDict from '@/mixins/initDict'
import { getRoleList } from '@/api/roles'
import { getUserInfo } from '@/api/user'
import { getTeamByUnit } from '@/api/team'
import { getWareInfo } from '@/api/warehourse'
import { addCarWarnTestInfo, addCarWarnInsuranceInfo } from '@/api/warning'
import { getFullWarnStrategyInfo, getOneWarnStrategyInfo } from '@/api/warnStrategy'
import moment from 'moment'
export default {
  mixins: [initDict],
  data() {
    return {
      activeNames: ['1', '2'],
      checkId: null,
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
        },
        {
          value: 8,
          label: '保险不合格'
        }
      ],
      query: {
        carNumber: '',
        unitId: '',
        carType: '',
        teamId: '',
        warehourseId: ''
      },
      title: '',
      isExist: 0,
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
      carTypesOptions: [],
      dataForm: {
        courseName: '',
        courseDept: '',
        handleId: '',
        id: '',
        carNumber: '',
        toolId: '',
        carType: '',
        unitName: '',
        carUseState: '',
        carLength: '',
        carWidth: '',
        carWeight: '',
        carHeight: '',
        carZaizhong: '',
        buyTime: '',
        toolPhoto: '',
        carNote: '',
        warehourseId: '',
        carState: '',
        carStateName: '',
        unitId: '',
        teamId: '',
        expirationDate: '',
        nextTestTime: '',
        thisTestTime: '',
        thisInsuranceTime: '',
        nextInsuranceTime: '',
        code: '',
        startTime: '',
        endTime: '',
        state: '',
        deptId: -1,
        prop: '',
        order: '',
        multipleSelection: [],
        userInfo: [],
        warehourseName: '',
        thisWarnTime: '',
        nextWarnTime: '',
        warnPeople: '',
        warnUnit: '',
        warnResult: '',
        warnNote: '',
        type: '车辆',
        subType: '',
        warnType: '试验',
        equipmentId: ''
      },
      // 表单校验
      dataRule: {
        carNumber: [{ required: true, message: '车牌号不能为空', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' },
          { validator: this.isExistCarNumber2, trigger: 'blur' }],
        unitName: [{ required: true, message: '单位名称不能为空', trigger: 'blur' }], // courseDept: [{ required: true, message: '培训部门不能为空', trigger: 'blur' }],
        teamName: [{ required: true, message: '班组不能为空', trigger: 'blur' }],
        warehourseName: [{ required: true, message: '库房不能为空', trigger: 'blur' }],
        carType: [{ required: true, message: '车辆种类不能为空', trigger: 'blur' }],
        buyTime: [{ required: true, message: '购置时间不能为空', trigger: 'blur' }],
        carState: [{ required: true, message: '状态不能为空', trigger: 'blur' }],
        nextTestTime: [{ required: true, message: '下次试验时间不能为空', trigger: 'blur' }], // courseDept: [{ required: true, message: '培训部门不能为空', trigger: 'blur' }],
        thisInsuranceTime: [{ required: true, message: '本次保养时间不能为空', trigger: 'blur' }],
        nextInsuranceTime: [{ required: true, message: '下次保养时间不能为空', trigger: 'blur' }],
        thisTestTime: [{ required: true, message: '本次试验时间不能为空', trigger: 'blur' }]
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
    getCarList1: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      params.append('userUnit', this.unitID)
      fetchCarList(params).then(response => {
        this.loading = false
        this.tableData = response.data.data.records
        this.total = response.data.data.total
      })
    },
    // 获取车辆信息并分页显示（待条件的查询）
    fetchCarWarnInsuranceList: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      params.append('carNumber', this.query.carNumber)
      params.append('unitId', this.query.unitId)
      params.append('teamId', this.query.teamId)
      params.append('userUnit', this.unitID)
      params.append('warehourseId', this.query.warehourseId)
      params.append('carType', this.query.carType)
      fetchCarWarnInsuranceList(params).then(response => {
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
    // 获取预警策略相关的信息(试验)
    getOneWarnStrategyInfo: function(message) {
      this.loading = true
      const params = new URLSearchParams()
      params.append('unitId', this.dataForm.unitId)
      params.append('subType', this.dataForm.carType)
      params.append('type', '车辆')
      params.append('warnType', '保险')
      getOneWarnStrategyInfo(params).then(response => {
        this.loading = false
        // eslint-disable-next-line no-constant-condition
        if (response.data.data === null) {
          this.$message({
            showClose: true,
            message: '预警策略信息缺失，请配置相应的预警策略信息',
            type: 'warning'
          })
          this.dataForm.nextWarnTime = null
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
    // 获取预警策略相关的信息(保险)
    getOneWarnStrategyInfo2: function(message) {
      this.loading = true
      const params = new URLSearchParams()
      params.append('unitId', this.dataForm.unitId)
      params.append('subType', this.dataForm.carType)
      params.append('type', '车辆')
      params.append('warnType', '保险')
      getOneWarnStrategyInfo(params).then(response => {
        this.loading = false
        // eslint-disable-next-line no-constant-condition
        if (response.data.data === null) {
          this.$message({
            showClose: true,
            message: '预警策略信息缺失，请配置相应的预警策略信息',
            type: 'warning'
          })
          this.dataForm.nextInsuranceTime = null
        } else {
          this.dataForm.expirationDate = response.data.data.expirationDate
          this.dataForm.nextInsuranceTime = this.AddDayNumsDate(this.dataForm.thisInsuranceTime, this.dataForm.expirationDate)
          console.log('获取到的预警策略数据')
          console.log(response.data.data)
          console.log(this.dataForm.expirationDate)
          console.log(this.dataForm.nextInsuranceTime)
        }
      })
    },
    // 处理查找事件
    handleFind: function() {
      this.fetchCarWarnInsuranceList()
    },
    // 重置功能呢
    handleReset: function() {
      this.query = {
        carNumber: '',
        unitId: '',
        carType: '',
        teamId: '',
        warehourseId: ''
      }
      this.fetchCarWarnInsuranceList()
    },
    // 换页
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.fetchCarWarnInsuranceList()
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
          // console.log(this.wareHourseOptions)
        })
      }
    },
    // 编辑界面获取仓库信息
    getWareInfo2: function() {
      const params = new URLSearchParams()
      params.append('unitId', this.dataForm.unitId)
      params.append('teamId', this.dataForm.teamId)
      if (this.dataForm.teamId !== '' && this.dataForm.unitId !== null) {
        getWareInfo(params).then((res) => {
          this.wareOptions = res.data.data
          this.$forceUpdate()
          console.log('库房的信息')
          console.log(this.wareOptions)
        })
      }
    },
    // 获取工具的类型
    getType: function() {
      const params = new URLSearchParams()
      params.append('type', 'cartype')
      getType(params).then((res) => {
        this.carTypesOptions = res.data.data
        console.log('工具的类型')
        console.log(this.carTypesOptions)
        console.log(this.carTypesOptions)
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
        this.fetchCarWarnInsuranceList()
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
        console.log(this.carTypesOptions)
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
      this.query.warehourseId = ''
      console.log(this.query.unitId)
      if (this.query.unitId !== '') {
        this.getTeamByUnit(this.query.unitId)
      }
    },
    // 验证工具id是否存在
    async isExistCarNumber2(rule, value, callback) {
      var a = true
      if (value) {
        const plateNumber = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})$/
        if (!plateNumber.test(value)) {
          a = false
          callback(new Error('请输入正确的车牌号'))
        }
      }
      console.log(a)
      console.log('编辑页面中的工具id值' + this.dataForm.toolId)
      // 判断是否是修改操作,如果是修改操作,判断code是否修改,如果修改,也需要验证是否与数据库重复
      if (value && a === true) {
        // 发起异步请求,后端查询数据库code是否存在,返回true为存在
        console.log('传入的id的值为：' + this.checkId)
        // 发送请求，查询数据库当前表单内容是否已存在
        // 这里必须等待请求结束才能执行之后的代码
        // 否则 res 一直等于 false 即校验通过
        const params = new URLSearchParams()
        params.append('carNumber', value)
        params.append('id', this.checkId)
        await isExistCarNumber(params).then((data) => {
          this.isExist = data.data.data
          console.log(this.isExist)
          console.log('执行完了')
          console.log(this.isExist)
        })

        if (this.isExist === 1) {
          callback(new Error('该车牌号已经存在!'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    // 编辑单位改变的事件
    unitCurrentChangeHandle2(data) {
      this.$forceUpdate()
      console.log('编辑页面的单位变了')
      console.log(data)
      this.dataForm.unitId = data
      this.dataForm.teamId = ''
      this.dataForm.teamName = ''
      this.dataForm.warehourseId = ''
      this.dataForm.warehourseName = ''
      console.log(this.dataForm.unitId)
      if (this.dataForm.unitId !== '') {
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
    // 查询页面班组改变
    teamCurrentChangeHandle(data) {
      console.log('查询条件中的班组变了')
      console.log(this.query.teamId)
      this.query.teamId = data
      this.getWareInfo()
      this.$forceUpdate()
      console.log(data)
    },
    // 编辑页面班组改变
    teamCurrentChangeHandle2(data) {
      this.dataForm.teamId = data
      this.getWareInfo2()
      console.log('编辑页面中的班组变了')
      console.log('班组变为了值：' + data)
      this.$forceUpdate()
    },
    // 编辑页面库房改变
    wareCurrentChangeHandle2(data) {
      this.dataForm.warehourseId = data
      this.dataForm.warehourseName = data
      this.$forceUpdate()
      console.log('编辑页面中的库房变了')
      console.log(this.dataForm.warehourseId)
    },
    warehoueseClick(data) {
      this.getWareInfo2()
      this.$forceUpdate()
      this.dataForm.warehourseId = this.dataForm.warehourseName
    },
    // 编辑页面的本次试验时间更改
    thisTimeChange(data) {
      this.dataForm.thisWarnTime = data
      this.getOneWarnStrategyInfo()
    },
    thisInsuranceTimeChange(data) {
      this.dataForm.thisTime = data
      this.getOneWarnStrategyInfo2()
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
      this.checkId = 0
      this.dataForm = {
        id: 0,
        courseName: '',
        courseDept: '',
        unitId: '',
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
      console.log('添加工具页面的id的值为：' + this.dataForm.id)
    },
    // 编辑界面
    handleEdit: function(row) {
      this.isEditForm = true
      this.dialogVisible = true
      this.dataForm = {
        courseDept: '',
        unitId: ''
      }
      this.dataForm.courseDept = ''
      this.dataForm.unitId = ''
      this.dataForm = Object.assign({}, row)
      this.dataForm.toolState = Number(this.dataForm.toolState)
      console.log('下拉框中状态的值为' + this.dataForm.toolState)
      console.log('编辑页面的id2:' + this.dataForm.id)
      this.checkId = this.dataForm.id
      this.dataForm.equipmentId = this.dataForm.carNumber
      this.dataForm.type = '车辆'
      this.dataForm.subType = this.dataForm.carType
      this.dataForm.warnType = '保险'
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
      const that = this
      this.$confirm('此操作将删除车辆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteCar(row.id).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.fetchCarWarnInsuranceList()
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
      this.$confirm('此操作将删除车辆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteBatchCar(this.multipleSelection.map(v => v.id)).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.getCarList()
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
      this.$router.push({ name: '车辆详情', params: { id }})
    },
    submitEditForm: function() {
      if (this.isEditForm) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true
              this.dataForm.handleId = this.userInfo.userId
              addCarWarnInsuranceInfo(this.dataForm).then((res) => {
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.isEditForm = false
                this.fetchCarWarnInsuranceList()
              })
            })
          }
        })
      } else {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              console.log(this.dataForm)
              addCar(this.dataForm).then((res) => {
                this.editLoading = true
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.fetchCarWarnInsuranceList()
              })
            })
          }
        })
      }
    }
  }
}
</script>
