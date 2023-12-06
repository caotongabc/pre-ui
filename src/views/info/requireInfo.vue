<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24">
        <el-card style="height: 50%" class="user-center">
          <el-tabs v-model="activeName" style="height: 50%" @tab-click="handleClick">
            <el-tab-pane style="height: 50%" label="需求详情" name="first">
              <el-collapse v-model="activeNames">
                <el-collapse-item title="基本信息" name="2" >
              <div class="user" style="height: 70%;width: 95%">
                <el-form
                  ref="dataForm"
                  :model="dataForm"
                  label-width="80px"
                  style="text-align:left;"
                  @keyup.enter.native="submitForm()"
                >
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="需求编号" prop="requireId" :label-width="formLabelWidth">
                        <el-input v-model="dataForm.requireId" :disabled="true" placeholder="请输入工具编号" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="工程名称" prop="projectName" :label-width="formLabelWidth">
                        <el-input v-model="dataForm.projectName" :disabled="true" placeholder="请输入工程名称" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="工程类型" prop="projectType" :label-width="formLabelWidth">
                        <el-input v-model="dataForm.projectType" :disabled="true" :readonly="true" clearable placeholder="请选择" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="需求类型" prop="requireType" :label-width="formLabelWidth">
                        <el-select v-model="dataForm.requireType" :disabled="true" clearable placeholder="请选择">
                          <el-option
                            v-for="item in requireTypeOptions"
                            :key="item.code"
                            :label="item.value"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="所属变电站" prop="unitName" :label-width="formLabelWidth">
                        <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                        <el-select v-model="dataForm.stationName" :disabled="true" filterable clearable placeholder="请选择">
                          <el-option
                            v-for="item in stationOptions"
                            :key="item.stationId"
                            :label="item.stationName"
                            :value="item.stationId"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="所属线路" prop="lineId" :label-width="formLabelWidth">
                        <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                        <el-select v-model="dataForm.lineName" :disabled="true" clearable placeholder="请选择">
                          <el-option
                            v-for="item in lineOptions"
                            :key="item.lineId"
                            :label="item.lineName"
                            :value="item.lineId"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="所属台区" prop="tgId" :label-width="formLabelWidth">
                        <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                        <el-select v-model="dataForm.tgName" :disabled="true" clearable placeholder="请选择">
                          <el-option
                            v-for="item in tgOptions"
                            :key="item.tgId"
                            :label="item.tgName"
                            :value="item.tgId"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="16">
                      <el-form-item label="作业地点" prop="toolNote" :label-width="formLabelWidth">
                        <el-input v-model="dataForm.workAddress" :disabled="true" placeholder="请输入作业地点" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="申请单位" prop="unitName" :label-width="formLabelWidth">
                        <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                        <el-select v-model="dataForm.unitName" :disabled="true" filterable clearable placeholder="请选择">
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
                      <el-form-item label="申请人" prop="peopleName" :label-width="formLabelWidth">
                        <el-input v-model="dataForm.applyPeople" :disabled="true" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="申请人电话" prop="peopleTel" :label-width="formLabelWidth">
                        <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                        <el-input v-model="dataForm.applyPeopletel" :disabled="true" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row v-if="dataForm.tgName === 'weuibab'">
                    <el-col :span="22">
                      <el-form-item label="附件" prop="toolPhoto" :label-width="formLabelWidth">
                        <el-upload
                          class="upload-demo"
                          action="/pre/file/upload"
                          :show-file-list="false"
                          :http-request="uploadFile"
                          :on-remove="handleAvatarSuccess"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload"
                        >
                          <img v-if="dataForm.toolPhoto" :src="dataForm.toolPhoto" style="width: 150px;height: 120px" class="avatar">
                          <i v-else class="el-icon-plus  avatar-uploader-icon" />
                        </el-upload>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row />
                  <el-row>
                    <el-col :span="22">
                      <el-form-item label="作业内容" prop="toolNote" :label-width="formLabelWidth">
                        <el-input v-model="dataForm.workContent" :disabled="true" maxlength="256" show-word-limit rows="5" type="textarea" placeholder="请输入作业内容" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
                </el-collapse-item >
                <el-collapse-item title="审核信息" name="3">
                  <div style="text-align: center" v-if="this.dataForm.auditResult == null" >
                    <img src="@/assets/nodata/empty.png" style="width: 300px; height: 250px">
                  </div>
                  <el-form
                    v-if="this.dataForm.auditResult != null"
                    ref="dataForm"
                    :model="dataForm"
                    label-width="80px"
                    style="text-align:left;"
                    @keyup.enter.native="submitForm()"
                  >
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="审核结果" prop="auditResult" :label-width="formLabelWidth">
                          <el-select v-model="dataForm.auditResult" :disabled="true" clearable placeholder="请选择">
                            <el-option
                              label="通过"
                              value="通过"
                            />
                            <el-option
                              label="不通过"
                              value="不通过"
                            />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="审核人" prop="auditPeople" :label-width="formLabelWidth">
                          <el-input v-model="dataForm.auditPeople" :disabled="true" placeholder="请输入审核人" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="审核时间" prop="safeMeasures" :label-width="formLabelWidth">
                          <el-date-picker
                            v-model="dataForm.auditTime"
                            :disabled="true"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择审核时间"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="22">
                        <el-form-item label="审核原因" prop="toolNote" :label-width="formLabelWidth">
                          <el-input v-model="dataForm.auditResaon" :disabled="true" maxlength="256" show-word-limit rows="5" type="textarea" placeholder="请输入作业内容" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="需求派单详情" style="height: 50%" name="second">
              <el-table v-loading="loading" :data="dispatchInfoTableData" border style="width: 100% " :default-sort="{ prop: 'startTime', order: 'ascending' }"><el-table-column type="selection" />
                <el-table-column label="序号" width="60" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="需求编号" width="200" align="center" sortable prop="toolId">
                  <template slot-scope="scope">
                    <span>{{ scope.row.requireId }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="派单状态" width="148" align="center">
                  <template slot-scope="scope">
                    <div>
                      <el-tag v-if="scope.row.dispatchState === 0 " size="small">待接单</el-tag>
                      <el-tag v-else-if="scope.row.dispatchState=== 1" size="small">已接单</el-tag>
                      <el-tag v-else-if="scope.row.dispatchState=== 2" size="small" type="danger">已退单</el-tag>
                      <el-tag v-else-if="scope.row.dispatchState=== 3" size="small">已回复</el-tag>
                      <el-tag v-else-if="scope.row.dispatchState=== 4" size="small" type="success">审核通过</el-tag>
                      <el-tag v-else-if="scope.row.dispatchState=== 5" size="small" type="danger">审核不通过</el-tag>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="派单单位" width="140" align="center" sortable prop="useState">
                  <template slot-scope="scope">
                    <span>{{ scope.row.dispatchUnitName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="派单人员" width="150" align="center" sortable prop="bigType">
                  <template slot-scope="scope">
                    <span>{{ scope.row.dispatchUserName2 }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="接单单位" width="150" align="center" sortable prop="useState">
                  <template slot-scope="scope">
                    <span>{{ scope.row.jiedanUnitName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="接单班组" width="140" align="center" sortable prop="toolWarehourse">
                  <template slot-scope="scope">
                    <span>{{ scope.row.jiedanTeamName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="接单人员" width="150" align="center" sortable prop="bigType">
                  <template slot-scope="scope">
                    <span>{{ scope.row.manageNameReall }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="派单时间" width="200" align="center" sortable prop="nextTime">
                  <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="最后处理时间" width="200" align="center" sortable prop="nextTime">
                  <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.updateTime) }}</span>
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
            <el-tab-pane label="需求勘测详情" style="height: 50%" name="third">
              <el-collapse v-model="activeNames">
                <el-collapse-item title="勘探接单信息" name="2" >
                  <div style="text-align: center" v-if="this.didpatchDataForm == null" >
                    <img src="@/assets/nodata/empty.png" style="width: 300px; height: 250px">

                  </div>
                  <el-form
                    v-if="this.didpatchDataForm != null"
                    ref="didpatchDataForm"
                    :model="didpatchDataForm"
                    label-width="80px"
                    :size="size"
                    style="text-align:left;"
                    @keyup.enter.native="submitForm()"
                  >
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="勘探单位" prop="jiedanUnit" :label-width="formLabelWidth">
                          <el-select v-model="didpatchDataForm.jiedanUnitName" :disabled="true" filterable clearable placeholder="请选择">
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
                        <el-form-item label="勘探班组" prop="jiedanTeam" :label-width="formLabelWidth">
                          <el-select v-model="didpatchDataForm.jiedanTeamName" :disabled="true" clearable placeholder="请选择" >
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
                        <el-form-item label="勘探负责人" prop="manage" :label-width="formLabelWidth">
                          <el-select v-model="didpatchDataForm.manageNameReall" :disabled="true" clearable placeholder="请选择" >
                            <el-option
                              v-for="item in userInfo2"
                              :key="item.userId"
                              :label="item.username"
                              :value="item.userId"
                            />
                            <!-- <el-input v-model="dataForm.bigType" placeholder="请输入大类" /> -->
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="勘探负责人电话" prop="managePhone" :label-width="formLabelWidth">
                          <el-input v-model="didpatchDataForm.managePhone" :disabled="true" placeholder="勘探负责人电话" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="接单时间" prop="dispatchTime" :label-width="formLabelWidth">
                          <el-date-picker
                            v-model="didpatchDataForm.handleTime"
                            type="datetime"
                            :disabled="true"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择接单时间"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-collapse-item>
                <el-collapse-item title="回复信息" name="3">
                  <div style="text-align: center" v-if="this.handleDataForm == null" >
                    <img src="@/assets/nodata/empty.png" style="width: 300px; height: 250px">

                  </div>
                  <el-form
                    v-if="this.handleDataForm != null"
                    ref="handleDataForm"
                    :model="handleDataForm"
                    label-width="80px"
                    :size="size"
                    style="text-align:left;"
                    @keyup.enter.native="submitForm()"
                  >
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="勘察开始时间" prop="dispatchTime" :label-width="formLabelWidth">
                          <el-date-picker
                            v-model="handleDataForm.watchStartTime"
                            type="datetime"
                            :disabled="true"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择勘察开始时间"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="勘察结束时间" prop="dispatchTime" :label-width="formLabelWidth">
                          <el-date-picker
                            v-model="handleDataForm.watchEndTime"
                            type="datetime"
                            :disabled="true"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择勘察结束时间"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="勘察回复时间" prop="dispatchTime" :label-width="formLabelWidth">
                          <el-date-picker
                            v-model="handleDataForm.createTime"
                            type="datetime"
                            :disabled="true"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择勘察结束时间"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="22">
                        <el-form-item label="作业条件" prop="toolNote" :label-width="formLabelWidth">
                          <el-input v-model="handleDataForm.workCondition" :disabled="true" maxlength="256" show-word-limit rows="5" type="textarea" placeholder="请输入作业内容" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="22">
                        <el-form-item label="作业环境" prop="toolNote" :label-width="formLabelWidth">
                          <el-input v-model="handleDataForm.workEnvironment" :disabled="true" maxlength="256" show-word-limit rows="5" type="textarea" placeholder="请输入作业内容" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="22">
                        <el-form-item label="危险实现" prop="toolNote" :label-width="formLabelWidth">
                          <el-input v-model="handleDataForm.dangerPoint" :disabled="true" maxlength="256" show-word-limit rows="5" type="textarea" placeholder="请输入作业内容" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="22">
                        <el-form-item label="安全措施" prop="toolNote" :label-width="formLabelWidth">
                          <el-input v-model="handleDataForm.safeMeasures" :disabled="true" maxlength="256" show-word-limit rows="5" type="textarea" placeholder="请输入作业内容" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="勘察结果" prop="projectType" :label-width="formLabelWidth">
                          <el-select v-model="handleDataForm.watchResult" :disabled="true" clearable placeholder="请选择" @click.native="getProjectType">
                            <el-option
                              label="满足作业条件"
                              value="满足作业条件"
                            />
                            <el-option
                              label="不满足作业条件"
                              value="不满足作业条件"
                            />
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="22">
                        <el-form-item label="现场图片" prop="toolPhoto" :label-width="formLabelWidth">
                          <el-upload
                            :disabled="true"
                            class="upload-demo"
                            action="/pre/file/uploadRequirePhoto"
                            :show-file-list="false"
                            :http-request="uploadFile"
                            :on-remove="handleAvatarSuccess"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                          >
                            <img v-if="handleDataForm.livePhoto" :src="handleDataForm.livePhoto" style="width: 150px;height: 120px" class="avatar">
                            <i v-else class="el-icon-plus  avatar-uploader-icon" />
                          </el-upload>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-collapse-item>
              </el-collapse>
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
import { fetchCarList } from '@/api/car'
import { getCarDetailTestWarnInfo, getCarDetailInsuranceWarnInfo } from '@/api/warning'
import { getWorkRequireInfoByPage, getOneWorkRequireInfo, getWorkerRequireInfoByPage, submitList, recallList, updateWorkRequire, addWorkRequire, deleteWorkRequire, addFeedBackInfo, updateFeedBackInfo, getHandleInfoOne, getWorkRequireInfoByRequireId } from '@/api/workRequire'
import { uploadpciture, uploadRequirePciture } from '@/api/file'
import { getStationInfo } from '@/api/station'
import { getLineInfo } from '@/api/line'
import { getTgInfo } from '@/api/tg'
import { getUserInfoList } from '@/api/user'
import { addRequireDispatchInfo, acceptDispath, recallDispatch, getRecallDispatchInfo, getAcceptDispatchInfo, getDispatchInfoInDetails } from '@/api/dispatch'

export default {
  name: 'Index',
  // eslint-disable-next-line vue/no-unused-components
  components: { PanThumb },
  mixins: [initDict],
  data() {
    return {
      activeNames: ['1', '2', '3', '4'],
      checkId: null,
      showText: '展开收索',
      size: 'small',
      loading: false,
      tableData: [],
      dispatchInfoTableData: [],
      options: [],
      deptOptions: [],
      stationOptions: [],
      lineOptions: [],
      tgOptions: [],
      teamOptions: [],
      wareOptions: [],
      userInfo2: [],
      userInfo: {

      },
      dialogImageUrl: '',
      dialogVisible2: false,
      unitID: 5,
      toolTypesOptions: [],
      projectTypeOptions: [],
      requireTypeOptions: [],
      warnInsuranceTableData: [],
      requireIdParams: this.$route.params.id,
      dataForm: {
        id: '',
        requireId: '',
        requireIdd: '',
        projectName: '',
        requireStatus: '',
        projectType: '',
        requireType: '',
        stationId: '',
        workAddress: '',
        workContent: '',
        stationName: '',
        lineId: '',
        lineName: '',
        tgName: '',
        tgId: '',
        applyPeople: '',
        applyPeopleId: '',
        applyUnit: '',
        applyPeopletel: '',
        applyUnitName: '',
        applyTime: '',
        createTime: '',
        updateTime: '',
        auditResult: '',
        auditPeople: '',
        auditTime: '',
        auditResaon: '',
        multipartFile: '',
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
        expirationDate: '',
        nextTime: '',
        thisTime: '',
        code: '',
        startTime: '',
        endTime: '',
        state: '',
        deptId: -1,
        prop: '',
        order: '',
        multipleSelection: [],
        userInfo: [],
        warehourseId: '',
        warehourseName: '',
        dispatchUserId: '',
        dispatchUserName: '',
        dispathUnitId: '',
        jiedanUnit: '',
        jiedanTeam: '',
        manage: '',
        manageName: '',
        managePhone: '',
        dispatchNote: '',
        dispatchTime: '',
        handleTime: '',
        handleReason: ''
      },
      didpatchDataForm: {
        requireId: '',
        jiedanUnitName: '',
        jiedanTeamName: '',
        manageNameReall: '',
        managePhone: '',
        handleTime1: '',
        handleTime: '',
        handleReason: ''
      },
      // 回复处理信息表单
      handleDataForm: {
        multipartFile: '',
        requireId: '',
        jiedanUnitName: '',
        jiedanTeamName: '',
        manageNameReall: '',
        managePhone: '',
        handleTime1: '',
        handleReason: '',
        handleId: '',
        dispatchId: '',
        watchStartTime: '',
        watchEndTime: '',
        workCondition: '',
        workEnvironment: '',
        dangerPoint: '',
        safeMeasures: '',
        livePhoto: '',
        watchResult: '',
        multiPhoto: '',
        mode: [],
        picList: [],
        fileList: []
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
    this.getOneWorkRequireInfo()
    this.getDispatchInfoInDetails()
    this.handleInfoDetails()
    // this.getCarDetailTestWarnInfo()
    // this.getCarDetailInsuranceWarnInfo()
  },

  methods: {
    parseTime,
    // 处理上传之前的操作
    handleBeforeUpload(file) {
      const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      const size = file.size / 1024 / 1024
      /* if (extension !== "bin") {
        this.$refs.upload.clearFiles();
        this.$myTools.showMessage("warning", "只能上传后缀是bin的文件");
        return false;
      } */
      if (size > 2) {
        this.$refs.upload.clearFiles()
        this.$myTools.showMessage('warning', '文件大小不得超过0.2M')
        //
        this.mode = []
        this.$refs.zform.validateField('file')
        //
        return false
      }
    },
    // 图片上传
    modeUpload(item) {
      const formData = new FormData()
      formData.append('multipartFile', item.file)
      const uid = item.file.uid
      const that = this
      uploadRequirePciture(formData).then(res => {
        if (that.handleDataForm.picList === null) {
          that.handleDataForm.picList = []
        }
        console.log('传照片的是相应数据')
        console.log(that.handleDataForm.picList)
        that.handleDataForm.picList.push({ key: uid, value: res.data.data })
        console.log(that.handleDataForm.fileList)
        this.$forceUpdate()
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
    // 清空上传组件
    emptyUpload() {
      const mainImg = this.$refs.upload
      if (mainImg) {
        if (mainImg.length) {
          mainImg.forEach(item => {
            item.clearFiles()
          })
        } else {
          this.$refs.upload.clearFiles()
        }
      }
    },
    // 限制传文件个数
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    // 处理图片去除
    handleRemove(file, fileList) {
      for (const i in this.handleDataForm.picList) {
        if (this.handleDataForm.picList[i].key === file.uid) {
          this.handleDataForm.picList.splice(i, 1)
        }
      }
    },
    // 处理图片预览功能
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible2 = true
    },
    // 处理审核的信息
    handleInfoDetails: function(row) {
      this.handleDataForm.requireIdd = this.requireIdParams
      this.dataForm.auditPeople = this.user.username
      // await this.getLineByStation2(this.dataForm.stationId)
      //  console.log(this.dataForm.tgId)
      const params = new URLSearchParams()
      params.append('requireId', this.requireIdParams)
      getAcceptDispatchInfo(params).then(response => {
        console.log('t回复界面获取的派单信息为：')
        console.log(response.data.data)
        this.didpatchDataForm = response.data.data
        // this.handleDataForm = response.data.data
        var date = new Date()
        // alert(date)
        // console.log(date.replaceAll('T', ' '))
        this.dataForm.auditTime1 = date
        // this.didpatchDataForm.handleTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate()) + ' ' + (date.getHours()) + ':' + (date.getMinutes()) + ':' + (date.getSeconds())
      })
      const params1 = new URLSearchParams()
      params1.append('requireId', this.requireIdParams)
      getHandleInfoOne(params1).then(response => {
        console.log('t回复界面获取的回复信息为：')
        console.log(response.data.data)
        this.handleDataForm = response.data.data
      })
      this.$forceUpdate()
    },
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
    // 加载需求的基本信息（报考审核信息）
    getOneWorkRequireInfo: function() {
      const params = new URLSearchParams()
      params.append('requireId', this.requireIdParams)
      getOneWorkRequireInfo(params).then((res) => {
        this.tableData = res.data.data
        this.dataForm = this.tableData
        console.log('表格获取的需求的数据')
        console.log(res.data.data.records)
        // console.log(this.dataForm)
      })
    },
    // 查询工具的试验信息
    getDispatchInfoInDetails: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('requireId', this.requireIdParams)
      getDispatchInfoInDetails(params).then((res) => {
        this.loading = false
        this.dispatchInfoTableData = res.data.data.records
        this.total = res.data.data.total
        console.log('派单信息表格获取的数据')
        console.log(res.data.data.total)
        console.log(this.dispatchInfoTableData)
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
    height: 890px;
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
