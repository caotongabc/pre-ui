<template>
  <div class="app-container">
    <el-row :gutter="12">
      <el-col :xs="24" :sm="24">
        <el-card class="user-center">
          <el-tabs v-model="activeName"  @tab-click="handleClick">
            <el-tab-pane label="工具详情"  name="first">
              <div class="user"   style="width: 95%">
                <el-form ref="tool" :model="tool" label-width="100px">
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="工具ID">
                        <el-input  :disabled="true"  class="rt-input" v-model="tool.toolId" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="9">
                      <el-form-item label="工具名称">
                        <el-input :disabled="true" class="rt-input"  v-model="tool.toolName" />
                      </el-form-item>
                    </el-col>
                    </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="所属单位">
                        <el-input  :disabled="true"  class="rt-input"  v-model="tool.unitName" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="9">
                      <el-form-item label="所属班组">
                        <el-input  :disabled="true"  class="rt-input"  v-model="tool.teamName" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="所属仓库">
                        <el-input  :disabled="true" class="rt-input"  v-model="tool.warehourseName" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="9">
                      <el-form-item label="大类">
                        <el-input  :disabled="true"  class="rt-input"  v-model="tool.bigType" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="购置时间">
                        <el-date-picker
                          class="rt-input"
                          :disabled="true"
                          v-model="tool.buyTime"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择购置日期时间"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="9">
                      <el-form-item label="本次试验时间">
                        <el-date-picker
                          class="rt-input"
                          :disabled="true"
                          v-model="tool.thisTime"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择本次试验时间"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="下次试验时间">
                        <el-date-picker
                          class="rt-input"
                          :disabled="true"
                          v-model="tool.nextTime"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择本次试验时间"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="9">
                      <el-form-item label="工器具状态" prop="toolState">
                        <el-input   :disabled="true"  class="rt-input"  v-model="tool.toolState"  />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-form-item label="工具图片" prop="toolPhoto" :label-width="formLabelWidth">
                      <img v-if="tool.toolPhoto" :src="tool.toolPhoto" style="width: 150px;height: 120px" class="avatar">
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="备注" prop="toolNote" >
                      <el-input   maxlength="256"  show-word-limit rows=5 v-bind:disabled="true" type="textarea" style="color: #2C7BFB" v-model="tool.toolNote" placeholder="请输入备注" />
                    </el-form-item>
                  </el-row>
                </el-form>
              </div>

            </el-tab-pane>

            <el-tab-pane label="工具试验信息" name="second">
              <el-table v-loading="loading" :data="warntableData" border style="width: 100% " :default-sort="{ prop: 'startTime', order: 'ascending' }" ><el-table-column type="selection" />
                <el-table-column label="序号" width="80" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="工具名称" width="180" align="center" sortable prop="toolName">
                  <template slot-scope="scope">
                    <span>{{ scope.row.equipmentName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="工具编号" width="180" align="center" sortable prop="toolId">
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
import { uploadpciture, uploadRequirePciture } from '@/api/file'
import { fetchList, getSingleToolInfo, addCourse, updateCourse, deleteCourse, deleteBatchCourse, fetchOrderList } from '@/api/tool'
export default {
  name: 'Index',
  // eslint-disable-next-line vue/no-unused-components
  components: { PanThumb },
  mixins: [initDict],
  data() {
    return {
      loading: false,
      tableData: [],
      warntableData: [],
      toolIdParams: this.$route.params.id,
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
    this.getSingleToolInfo()
    this.getToolDetailWarnInfo()
  },

  methods: {
    parseTime,
    // formatEmail(mail) {
    //   return regEmail(mail)
    // },
    // 文件上传之前的处理
    beforeAvatarUpload(file) {
      this.dataForm.toolPhoto = ''
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 上传文件
    // 文件上传
    uploadFile(params) {
      console.log('uploadFile', params)
      // this.dataForm.toolPhoto = ''
      this.dataForm.multipartFile = params.file
      const isLt2M = this.dataForm.multipartFile.size / 1024 / 1024 < 2
      // 通过 FormData 对象上传文件
      if (!isLt2M) {
        this.$message.error('请上传2M以下的.xlsx文件')
        return false
      }
      console.log('通过方法不是action来访问接口')
      // 发起请求
      var formData = new FormData()
      formData.append('multipartFile', this.dataForm.multipartFile)
      formData.append('id', this.dataForm.id)
      uploadpciture(formData).then(res => {
        this.dataForm.toolPhoto = res.data.data
        console.log('_RequestUploads_', res)
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '图片上传成功'
          })

          // 隐藏弹出框
          this.importDialog = false
        } else {
          this.$message({
            type: 'warning',
            message: res.msg
          })
        }
      })
    },
    handleAvatarSuccess(res, file) {
      // this.dataForm.toolPhoto = URL.createObjectURL(file.raw)
      console.log(this.dataForm.toolPhoto)
      // const data = new FormData()
      // data.append('token', '')
      // data.append('file', file[0])
      // axiosInstance({
      //   method: 'POST',
      //   url: 'http://up.qiniu.com',
      //   data: data
      // })
      //   .then(function(res) {
      //     // console.log('res',res)
      //     const { base_url, path } = res.data
      //     // 页面所用字段
      //     self.previewAvatar = `${base_url}${path}?imageView2/1/w/154/h/154`
      //     // 传给后台不完整
      //     self.formData.avatar = `${path}`
      //   })
      //   .catch(function(err) {
      //     console.log('err', err)
      //   })
    },
    // 加载工具的信息
    getSingleToolInfo: function() {
      const params = new URLSearchParams()
      params.append('toolId', this.toolIdParams)
      getSingleToolInfo(params).then((res) => {
        this.tableData = res.data.data
        this.tool = this.tableData
        if (this.tool.toolState === 0) {
          this.tool.toolState = '正常'
        } else {
          this.tool.toolState = '试验不合格'
        }
        console.log('表格获取的数据')
        console.log(this.tableData)
        console.log(this.tool)
      })
    },
    // 查询工具的试验信息
    getToolDetailWarnInfo: function() {
      this.loading = true
      var a = this.toolIdParams
      a.toString()
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      params.append('equipmentId', a)
      getToolDetailWarnInfo(params).then((res) => {
        this.loading = false
        this.warntableData = res.data.data.records
        this.total = res.data.data.total
        console.log('试验信息表格获取的数据')
        console.log(res.data.data.total)
        console.log(this.warntableData)
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
    height: 740px;
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
