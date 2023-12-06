<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container" style="margin: 10px 0 10px 0;">
    <!--  <el-tree
        :data="deptData"
        :props="deptTreeProps"
        :expand-on-click-node="false"
        default-expand-all
        @node-click="handleNodeClick"
      />-->
      <label>课程：</label>
      <el-input
        v-model="query.courseName"
        clearable
        class="filter-item"
        style="width: 200px;"
        size="small"
        placeholder="请输入课程名称"
        @keyup.enter.native="handleFind"
      />
      <label>部门：</label>
      <el-select v-model="query.courseDept" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.deptId"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFind">查询
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-refresh" size="small" @click="handleReset">重置
      </el-button>
      <el-button class="filter-item" size="small" type="primary" icon="el-icon-plus" @click="handleAdd">添加课程</el-button>
    </div>

    <el-table v-loading="loading" :data="tableData"  border style="width: 100%" :default-sort="{ prop: 'startTime', order: 'ascending' }">

      <el-table-column type="selection" />
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="课程名称" width="120" align="center" sortable prop="courseName">
        <template slot-scope="scope">
          <span>{{ scope.row.courseName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="培训部门" width="150" align="center" sortable prop="courseDept">
        <template slot-scope="scope">
          <span>{{ scope.row.courseDept }}</span>
        </template>
      </el-table-column>

      <el-table-column label="开课时间" width="160" align="center" sortable prop="startTime" >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column  prop="endTime" sortable  label="结课时间" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="160" align="center">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.state === 0" size="small">正常</el-tag>
            <el-tag v-else-if="scope.row.state === 9" size="small" type="info">停用</el-tag>
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
      :title="!dataForm.id ? '新增租户' : '修改租户'"
      width="40%"
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
        <el-form-item label="课程名称" prop="courseName" :label-width="formLabelWidth">
          <el-input v-model="dataForm.courseName" placeholder="请输入课程名称" />
        </el-form-item>
        <el-form-item label="培训部门" prop="courseDept" :label-width="formLabelWidth">
          <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
          <popup-tree-input
            :data="deptData"
            :props="deptTreeProps"
            :prop="dataForm.courseDept"
            :node-key="dataForm.deptId"
            :current-change-handle="deptTreeCurrentChangeHandle"
          />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime" :label-width="formLabelWidth">
          <el-date-picker
            v-model="dataForm.startTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择开始日期时间"
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime" :label-width="formLabelWidth">
          <el-date-picker
            v-model="dataForm.endTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择结束日期时间"
          />
        </el-form-item>
        <el-form-item label="状态" prop="state" :label-width="formLabelWidth">
          <el-select v-model="dataForm.state" placeholder="请选择状态">
            <el-option label="正常" value="0" />
            <el-option label="停用" value="9" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :size="size" @click="dialogVisible = false">取消</el-button>
        <el-button :size="size" type="primary" :loading="editLoading" @click="submitEditForm">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, addCourse, updateCourse, deleteCourse, fetchOrderList } from '@/api/course'
import { parseTime } from '@/utils/index'
import { getDept, getDeptArray } from '@/api/dept'
import PopupTreeInput from '@/components/PopupTreeInput'
import initDict from '@/mixins/initDict'
import { getRoleList } from '@/api/roles'

export default {
  components: {
    PopupTreeInput
  },
  mixins: [initDict],
  data() {
    return {
      size: 'small',
      tableData: [],
      query: {
        courseName: '',
        courseDept: ''
      },
      title: '',
      dialogFormVisible: false, // 控制弹出框
      formLabelWidth: '120px',
      isEditForm: false,
      currentPage: 1,
      pageSize: 5,
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
      /* options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      */
      dataForm: {
        courseName: '',
        courseDept: '',
        code: '',
        startTime: '',
        endTime: '',
        state: '',
        deptId: -1,
        prop: '',
        order: ''
      },
      // 表单校验
      dataRule: {
        courseName: [{ required: true, message: '课程名称不能为空', trigger: 'blur' }], // courseDept: [{ required: true, message: '培训部门不能为空', trigger: 'blur' }],
        startTime: [{ required: true, message: '开始时间不能为空', trigger: 'blur' }],
        endTime: [{ required: true, message: '结束时间不能为空', trigger: 'blur' }],
        state: [{ required: true, message: '状态不能为空', trigger: 'blur' }]
      },
      loading: false,
      dialogVisible: false,
      editLoading: false

    }
  },
  created() {
    this.findDeptTree()
    // 加载数据字典
    this.getCourseList()
    this.findDeptArray()
  },
  methods: {
    parseTime,
    getCourseList: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      fetchList(params).then(response => {
        this.loading = false
        this.tableData = response.data.data.records
        this.total = response.data.data.total
      })
    },
    /*
    // 加载用户角色信息
    findUserRoles: function() {
      const params = new URLSearchParams()
      params.append('courseDept', '')
      getRoleList(params).then((res) => {
        this.options = res.data.data
      })
    },*/
    // 实现排序
    /* sortChange: function(column, prop, order) {
      if (column.prop == null || column.order == null) {
        this.dataForm.prop = ''
        this.dataForm.order = ''
      } else {
        this.dataForm.prop = column.prop
        this.dataForm.order = column.order
      }
      this.getOrderList()
    },
    getOrderList: function() {
      this.loading = true
      fetchOrderList(this.dataForm).then(response => {
        this.loading = false
        this.tableData = response.data.data.records
        this.total = response.data.data.total
      })
    },*/
    fetchList: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      params.append('courseName', this.query.courseName)
      params.append('courseDept', this.query.courseDept)
      fetchList(params).then(response => {
        this.loading = false
        this.tableData = response.data.data.records
        this.total = response.data.data.total
        this.query.courseDept = ''
      })
    },
    // 查找
    handleFind: function() {
      this.fetchList()
    },
    handleReset: function() {
      this.query = {
        courseName: '',
        courseDept: ''
      }
      this.getCourseList()
    },
    // 换页
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.getCourseList()
    },
    // 加载部门列表
    findDeptTree: function() {
      getDept().then((res) => {
        this.deptData = res.data.data
      })
    },
    findDeptArray: function() {
      getDeptArray().then((res) => {
        this.options = res.data.data
        console.log('111111111')
        console.log(this.options)
      })
    },

    // 部门树的显示
    deptTreeCurrentChangeHandle(data) {
      debugger
      this.dataForm.deptId = data.deptId
      this.dataForm.courseDept = data.name
      // this.$set(this.dataForm, 'courseDept', data.name)
    },
    // 显示新增界面
    handleAdd: function() {
      this.dialogVisible = true
      this.dataForm = {
        courseName: '',
        courseDept: '',
        code: '',
        startTime: '',
        endTime: '',
        state: '',
        deptId: -1
      }
    },
    // 编辑界面
    handleEdit: function(row) {
      this.isEditForm = true
      this.dialogVisible = true
      this.dataForm = row
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
    submitEditForm: function() {
      if (this.isEditForm) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true
              updateCourse(this.dataForm).then((res) => {
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
