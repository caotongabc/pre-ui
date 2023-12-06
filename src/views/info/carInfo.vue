<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24">
        <el-card  STYLE="height: 70%" class="user-center">
          <el-tabs v-model="activeName"  style="height: 70%" @tab-click="handleClick">
            <el-tab-pane  style="height: 70%" label="车辆详情"  name="first">
              <div class="user"  style="height: 70%;width: 95%">
                <el-form ref="car" :model="car" label-width="100px">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="车牌号">
                        <el-input  :disabled="true"  class="rt-input" v-model="car.carNumber" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="所属单位">
                        <el-input :disabled="true" class="rt-input"  v-model="car.unitName" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="所属班组">
                        <el-input  :disabled="true"  class="rt-input"  v-model="car.teamName" />
                      </el-form-item>
                    </el-col>
                    </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="所属库房">
                        <el-input  :disabled="true"  class="rt-input"  v-model="car.warehourseName" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="车辆类别">
                        <el-input  :disabled="true" class="rt-input"  v-model="car.carType" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="购置时间">
                        <el-date-picker
                          class="rt-input"
                          :disabled="true"
                          v-model="car.buyTime"
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
                      <el-form-item label="本次试验时间">
                        <el-date-picker
                          class="rt-input"
                          :disabled="true"
                          v-model="car.thisTestTime"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择本次试验时间"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="下次试验时间">
                        <el-date-picker
                          class="rt-input"
                          :disabled="true"
                          v-model="car.nextTestTime"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择下次试验时间"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="本次保险时间">
                        <el-date-picker
                          class="rt-input"
                          :disabled="true"
                          v-model="car.thisInsuranceTime"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择本次保养时间"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="下次保险时间">
                        <el-date-picker
                          class="rt-input"
                          :disabled="true"
                          v-model="car.nextInsuranceTime"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择下次保养时间"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="车辆状态" prop="toolState">
                        <el-input   :disabled="true"  class="rt-input"  v-model="car.carState"  />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="车长(m)" prop="toolState">
                        <el-input   :disabled="true"  class="rt-input"  v-model="car.carLength"  />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="车宽(m)" prop="toolState">
                      <el-input   :disabled="true"  class="rt-input"  v-model="car.carWidth"  />
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="车高(m)" prop="toolState">
                        <el-input   :disabled="true"  class="rt-input"  v-model="car.carHeight"  />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="车重(t)" prop="toolState">
                        <el-input   :disabled="true"  class="rt-input"  v-model="car.carWeight"  />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="载重量(t)" prop="toolState">
                        <el-input   :disabled="true"  class="rt-input"  v-model="car.carWeight"  />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-form-item label="备注" prop="toolNote" >
                    <el-input   maxlength="256"  show-word-limit rows=5 v-bind:disabled="true" type="textarea" style="color: #2C7BFB" v-model="car.carNote" placeholder="请输入备注" />
                  </el-form-item>
                  </el-row>
                </el-form>
              </div>

            </el-tab-pane>
            <el-tab-pane label="车辆试验信息" name="second">
              <el-table v-loading="loading" :data="warnTsetTableData" border style="width: 100% " :default-sort="{ prop: 'startTime', order: 'ascending' }" ><el-table-column type="selection" />
                <el-table-column label="序号" width="80" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="车牌号" width="180" align="center" sortable prop="toolId">
                  <template slot-scope="scope">
                    <span>{{ scope.row.equipmentId }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="试验人员" width="180" align="center" sortable prop="useState">
                  <template slot-scope="scope">
                    <span>{{ scope.row.warnPeople }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="试验单位" width="180" align="center" sortable prop="toolWarehourse">
                  <template slot-scope="scope">
                    <span>{{ scope.row.warnUnit }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="试验结果" width="180" align="center" sortable prop="bigType">
                  <template slot-scope="scope">
                    <span>{{ scope.row.warnResult }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="本次试验时间" width="180" align="center" sortable prop="nextTime">
                  <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.thisWarnTime) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="下次试验时间" width="180" align="center" sortable prop="nextTime">
                  <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.nextWarnTime) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="试验结果" width="172" align="center">
                  <template slot-scope="scope">
                    <div>
                      <el-tag v-if="scope.row.warnResult === '合格'" size="small">合格</el-tag>
                      <el-tag v-else-if="scope.row.warnResult=== '不合格'" size="small" type="info">不合格</el-tag>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="备注" width="198" align="center" sortable prop="nextTime">
                  <template slot-scope="scope">
                    <span type="textarea">{{ scope.row.warnNote }}</span>
                  </template>
                </el-table-column>
              </el-table>
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
            </el-tab-pane>
            <el-tab-pane label="车辆保险信息" name="third">
              <el-table v-loading="loading" :data="warnInsuranceTableData" border style="width: 100% " :default-sort="{ prop: 'startTime', order: 'ascending' }" ><el-table-column type="selection" />
                <el-table-column label="序号" width="80" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="车牌号" width="180" align="center" sortable prop="toolId">
                  <template slot-scope="scope">
                    <span>{{ scope.row.equipmentId }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="保险人员" width="180" align="center" sortable prop="useState">
                  <template slot-scope="scope">
                    <span>{{ scope.row.warnPeople }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="保险单位" width="180" align="center" sortable prop="toolWarehourse">
                  <template slot-scope="scope">
                    <span>{{ scope.row.warnUnit }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="试验结果" width="180" align="center" sortable prop="bigType">
                  <template slot-scope="scope">
                    <span>{{ scope.row.warnResult }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="本次保险时间" width="180" align="center" sortable prop="nextTime">
                  <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.thisWarnTime) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="下次保险时间" width="180" align="center" sortable prop="nextTime">
                  <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.nextWarnTime) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="试验结果" width="172" align="center">
                  <template slot-scope="scope">
                    <div>
                      <el-tag v-if="scope.row.warnResult === '合格'" size="small">合格</el-tag>
                      <el-tag v-else-if="scope.row.warnResult=== '不合格'" size="small" type="info">不合格</el-tag>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="备注" width="198" align="center" sortable prop="nextTime">
                  <template slot-scope="scope">
                    <span type="textarea">{{ scope.row.warnNote }}</span>
                  </template>
                </el-table-column>
              </el-table>
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
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import { getUserInfo, updatePass, resetEmail, updateEmail } from '@/api/user'
import { getToolDetailWarnInfo } from '@/api/warning'
import initDict from '@/mixins/initDict'
import { parseTime } from '@/utils/index' // 用于转换时间格式
import { fetchList, addCourse, updateCourse, deleteCourse, deleteBatchCourse, fetchOrderList } from '@/api/tool'
import { fetchCarList, fetchCarOne } from '@/api/car'
import { getCarDetailTestWarnInfo, getCarDetailInsuranceWarnInfo } from '@/api/warning'
export default {
  name: 'Index',
  // eslint-disable-next-line vue/no-unused-components
  components: { PanThumb },
  mixins: [initDict],
  data() {
    return {
      loading: false,
      tableData: [],
      warnTsetTableData: [],
      warnInsuranceTableData: [],
      carNumberParams: this.$route.params.id,
      tool: {
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
        state: '',
        deptId: -1,
        prop: '',
        order: '',
        multipleSelection: [],
        userInfo: [],
        warehourseId: '',
        warehourseName: ''
      },
      car: {
        id: '',
        carNumber: '',
        carLength: '',
        carWeight: '',
        carWidth: '',
        carHeight: '',
        carZaizhong: '',
        carType: '',
        unitName: '',
        unitId: '',
        teamId: '',
        teamName: '',
        warehourseName: '',
        warehourseId: '',
        thisTestTime: '',
        thisInsuranceTime: '',
        nextTestTime: '',
        nextInsuranceTime: '',
        buyTime: '',
        carState: '',
        carNote: ''
      },
      formLabelWidth: '120px',
      currentPage: 1,
      pageSize: 8,
      total: 0,
      user: {
        avatar: '',
        username: '',
        phone: 0,
        email: '',
        deptName: '',
        jobName: '',
        createTime: ''
      },
      activeName: 'first'
    }
  },
  computed: {
    avatar() {
      return require(`@/assets/avatar/c7c4ee7be3eb4e73a19887dc713505145.jpg`)
    }
  },
  created() {
    this.findUserInfo()
    this.fetchCarOne()
    this.getCarDetailTestWarnInfo()
    this.getCarDetailInsuranceWarnInfo()
  },

  methods: {
    parseTime,
    // formatEmail(mail) {
    //   return regEmail(mail)
    // },
    // 加载工具的信息
    fetchCarOne: function() {
      const params = new URLSearchParams()
      params.append('carNumber', this.carNumberParams)
      fetchCarOne(params).then((res) => {
        this.tableData = res.data.data
        this.car = this.tableData
        if (this.car.carState === 0) {
          this.car.carState = '正常'
        } else if (this.car.carState === 9) {
          this.car.carState = '试验不合格'
        } else {
          this.car.carState = '保险不合格'
        }
        console.log('表格获取的数据')
        console.log(this.tableData)
        console.log(this.car)
      })
    },
    // 查询工具的试验信息
    getCarDetailTestWarnInfo: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      params.append('equipmentId', this.carNumberParams)
      params.append('warnType', '试验')
      getCarDetailTestWarnInfo(params).then((res) => {
        this.loading = false
        this.warnTsetTableData = res.data.data.records
        this.total = res.data.data.total
        console.log('试验信息表格获取的数据')
        console.log(res.data.data.total)
        console.log(this.warnTsetTableData)
        console.log(this.total)
      })
    },
    // 查询工具的试验信息
    getCarDetailInsuranceWarnInfo: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      params.append('equipmentId', this.carNumberParams)
      getCarDetailInsuranceWarnInfo(params).then((res) => {
        this.loading = false
        this.warnInsuranceTableData = res.data.data.records
        this.total = res.data.data.total
        console.log('保险信息表格获取的数据')
        console.log(res.data.data.total)
        console.log(this.warnInsuranceTableData)
        console.log(this.total)
      })
    },
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.getToolDetailWarnInfo()
    },
    // 加载用户个人信息
    findUserInfo: function() {
      getUserInfo().then((res) => {
        this.user = res.data.data
        const a = this.user.avatar
        this.$store.dispatch('setUseradvatar', a)
      })
    },

    refresh() {
      this.ico = 'el-icon-loading'
      this.$refs.log.init()
      setTimeout(() => {
        this.ico = 'el-icon-refresh'
      }, 300)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields()
      }
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
  input:disabled,textarea:disabled{
    opacity: 1;
    -webkit-text-fill-color: red;
  }
  .user-center{
    height: 900px;
    overflow-y:auto;
  }
  .box-center {
    margin: 0 auto;
    display: table;
  }

  .text-muted {
    color: #777;
  }

  .user-profile {
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }

    .box-social {
      padding-top: 30px;

      .el-table {
        border-top: 1px solid #dfe6ec;
      }
    }

    .user-follow {
      padding-top: 20px;
    }
  }

  .user-bio {
    margin-top: 20px;
    color: #606266;

    span {
      padding-left: 4px;
    }
    .logo-wrapper {
      display: inline-block;
      margin: 10px 0;
      img {
        width: 1.4rem;
        display: inline-block;
        margin: 0 .6rem;
        cursor: pointer;
        &.unbind {
          -webkit-filter: grayscale(100%);
          -moz-filter: grayscale(100%);
          -o-filter: grayscale(100%);
          filter: grayscale(100%);
        }
        &.radius {
          border-radius: 50%;
        }
      }
    }
    .user-bio-section {
      font-size: 14px;
      padding: 15px 0;

      .user-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
  }
</style>
