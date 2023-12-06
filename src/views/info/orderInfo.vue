<template>
  <div class="app-container">
    <el-row :gutter="19">
      <el-col :xs="24" :sm="24">
        <el-card style="height: 55%" class="user-center">
          <el-tabs v-model="activeName" style="height: 70%" @tab-click="handleClick">
            <el-tab-pane style="height: 70%" label="工单详情" name="first">
              <el-collapse v-model="activeNames">
                <el-collapse-item title="基本信息" name="2">
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
                          <el-form-item label="工单编号" prop="requireId" :label-width="formLabelWidth">
                            <el-input v-model="dataForm.orderId" :disabled="true" placeholder="请输入工具编号" />
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
                      <el-row>
                        <el-col :span="22">
                          <el-form-item label="作业条件" prop="biTian13" :label-width="formLabelWidth">
                            <el-input v-model="dataForm.workCondition" maxlength="256" :disabled="true" show-word-limit rows="3" type="textarea" placeholder="请输入作业内容" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="22">
                          <el-form-item label="作业环境" prop="biTian13" :label-width="formLabelWidth">
                            <el-input v-model="dataForm.workEnvironment" maxlength="256" :disabled="true" show-word-limit rows="3" type="textarea" placeholder="请输入作业内容" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="22">
                          <el-form-item label="危险事项" prop="biTian13" :label-width="formLabelWidth">
                            <el-input v-model="dataForm.dangerPoint" maxlength="256" :disabled="true" show-word-limit rows="3" type="textarea" placeholder="请输入作业内容" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="22">
                          <el-form-item label="安全措施" prop="biTian13" :label-width="formLabelWidth">
                            <el-input v-model="dataForm.safeMeasures" maxlength="256" :disabled="true" show-word-limit rows="3" type="textarea" placeholder="请输入作业内容" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="审核信息" name="3">
                  <div v-if="this.dataForm.auditResult === '-1'|| this.dataForm.auditResult === null " style="text-align: center">
                    <img src="@/assets/nodata/empty.png" style="width: 300px; height: 250px">
                  </div>
                  <el-form
                    v-if="this.dataForm.auditResult !== '-1'&& this.dataForm.auditResult !== null "
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
                          <el-input v-model="dataForm.auditReason" :disabled="true" maxlength="256" show-word-limit rows="5" type="textarea" placeholder="请输入作业内容" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="工单派单详情" name="second">
              <el-table v-loading="loading" :data="dispatchInfoTableData" border style="width: 100% " :default-sort="{ prop: 'startTime', order: 'ascending' }"><el-table-column type="selection" />
                <el-table-column label="序号" width="60" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="工单编号" width="200" align="center" sortable prop="toolId">
                  <template slot-scope="scope">
                    <span>{{ scope.row.orderId }}</span>
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
                      <el-tag v-else-if="scope.row.dispatchState=== 6" size="small">已领取装备</el-tag>
                      <el-tag v-else-if="scope.row.dispatchState=== 7" size="small">到达现场</el-tag>
                      <el-tag v-else-if="scope.row.dispatchState=== 8" size="small">已开工</el-tag>
                      <el-tag v-else-if="scope.row.dispatchState=== 9" size="small" type="success">已完工</el-tag>
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
                    <span>{{ scope.row.manageNameRecall }}</span>
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
            <el-tab-pane label="装备领取详情" name="third">
              <el-collapse v-model="activeNames">
                <el-collapse-item title="工具信息" name="1">
                  <el-table v-loading="loading" :data="equipmentInfoTableData" border style="width: 100% " :default-sort="{ prop: 'startTime', order: 'ascending' }"><el-table-column type="selection" />
                    <el-table-column label="序号" width="89" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.$index + 1 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="工具编号" width="210" align="center" sortable prop="toolId">
                      <template slot-scope="scope">
                        <span>{{ scope.row.toolId }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="工具名称" width="210" align="center" sortable prop="useState">
                      <template slot-scope="scope">
                        <span>{{ scope.row.toolName }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="工具类别" width="210" align="center" sortable prop="bigType">
                      <template slot-scope="scope">
                        <span>{{ scope.row.bigType }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="所属单位" width="210" align="center" sortable prop="bigType">
                      <template slot-scope="scope">
                        <span>{{ scope.row.unitName }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="所属班组" width="209" align="center" sortable prop="bigType">
                      <template slot-scope="scope">
                        <span>{{ scope.row.teamName }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="所属库房" width="200" align="center" sortable prop="bigType">
                      <template slot-scope="scope">
                        <span>{{ scope.row.warehourseName }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="领取时间" width="200" align="center" sortable prop="nextTime">
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
                </el-collapse-item>
                <el-collapse-item title="车辆信息" name="2">
                  <div v-if="this.handleDataForm === null || this.handleDataForm.carNumber === null" style="text-align: center">
                    <img src="@/assets/nodata/empty.png" style="width: 300px; height: 250px">
                  </div>
                  <el-form
                    v-if="this.handleDataForm !== null &&this.handleDataForm.carNumber !== null"
                    ref="handleDataForm"
                    :model="handleDataForm"
                    label-width="80px"
                    :size="size"
                    style="text-align:left;"
                    @keyup.enter.native="submitForm()"
                  >
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="所属仓库" prop="warehourseName" :label-width="formLabelWidth">
                          <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                          <el-select v-model="handleDataForm.warehourseName" :disabled="true" style="width: 300px;margin-right: 15px" clearable placeholder="请选择" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="车辆类别" prop="carType" :label-width="formLabelWidth">
                          <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                          <el-select v-model="handleDataForm.carType" :disabled="true" style="width: 300px;margin-right: 15px" clearable placeholder="请选择" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="车辆号" prop="carType" :label-width="formLabelWidth">
                          <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                          <el-select v-model="handleDataForm.carNumber" :disabled="true" style="width: 300px;margin-right: 15px" clearable placeholder="请选择">
                          <!-- <el-input v-model="dataForm.bigType" placeholder="请输入大类" /> -->
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="工单处理详情" name="four">
              <el-collapse v-model="activeNames">
                <el-collapse-item title="接单信息" name="1">
                  <div v-if="this.didpatchDataForm === null" style="text-align: center">
                    <img src="@/assets/nodata/empty.png" style="width: 300px; height: 250px">

                  </div>
                  <el-form
                    v-if="this.didpatchDataForm !== null"
                    ref="didpatchDataForm"
                    :model="didpatchDataForm"
                    label-width="80px"
                    :size="size"
                    style="text-align:left;"
                    @keyup.enter.native="submitForm()"
                  >
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="工作单位" prop="jiedanUnit" :label-width="formLabelWidth">
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
                        <el-form-item label="工作班组" prop="jiedanTeam" :label-width="formLabelWidth">
                          <el-select v-model="didpatchDataForm.jiedanTeamName" :disabled="true" clearable placeholder="请选择">
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
                        <el-form-item label="工作负责人" prop="manage" :label-width="formLabelWidth">
                          <el-select v-model="didpatchDataForm.manageNameRecall" :disabled="true" clearable placeholder="请选择">
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
                        <el-form-item label="负责人电话" prop="managePhone" :label-width="formLabelWidth">
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
                <el-collapse-item title="到达现场" name="2">
                  <div v-if="this.handleDataForm === null || this.handleDataForm.liveCondition === null" style="text-align: center">
                    <img src="@/assets/nodata/empty.png" style="width: 300px; height: 250px">

                  </div>
                  <el-form
                    v-if="this.handleDataForm !== null && this.handleDataForm.liveCondition !== null"
                    ref="handleDataForm"
                    :model="handleDataForm"
                    label-width="80px"
                    :size="size"
                    style="text-align:left;"
                    @keyup.enter.native="submitForm()"
                  >
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="到达时间" prop="arriveTime" :label-width="formLabelWidth">
                          <el-date-picker
                            v-model="handleDataForm.arriveTime"
                            :disabled="true"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择到达现场时间"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="负责人" prop="carType" :label-width="formLabelWidth">
                          <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                          <el-select v-model="handleDataForm.manage" :disabled="true" style="width: 300px;margin-right: 15px" clearable placeholder="请选择">
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
                        <el-form-item label="车牌号" prop="carNumber" :label-width="formLabelWidth">
                          <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                          <el-select v-model="handleDataForm.carNumber" :disabled="true" style="width: 300px;margin-right: 15px" clearable placeholder="请选择">
                            <el-option
                              v-for="item in carOptions"
                              :key="item.id"
                              :label="item.carNumber"
                              :value="item.carNumber"
                            />
                            <!-- <el-input v-model="dataForm.bigType" placeholder="请输入大类" /> -->
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="22">
                        <el-form-item label="现场情况" prop="liveCondition" :label-width="formLabelWidth">
                          <el-input v-model="handleDataForm.liveCondition" :disabled="true" maxlength="256" show-word-limit rows="5" type="textarea" placeholder="请输入现场情况" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-collapse-item>
                <el-collapse-item title="开工信息" name="3">
                  <div v-if="this.handleDataForm === null || this.handleDataForm.workBeforePhoto === null" style="text-align: center">
                    <img src="@/assets/nodata/empty.png" style="width: 300px; height: 250px">

                  </div>
                  <el-form
                    v-if="this.handleDataForm !== null && this.handleDataForm.workBeforePhoto !== null"
                    ref="handleDataForm"
                    :model="handleDataForm"
                    label-width="80px"
                    :size="size"
                    style="text-align:left;"
                    @keyup.enter.native="submitForm()"
                  >
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="开工时间" prop="startWorkTime" :label-width="formLabelWidth">
                          <el-date-picker
                            v-model="handleDataForm.startWorkTime"
                            :disabled="true"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择开工时间"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="负责人" prop="carType" :label-width="formLabelWidth">
                          <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                          <el-select v-model="handleDataForm.manage" :disabled="true" style="width: 300px;margin-right: 15px" clearable placeholder="请选择">
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
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="现场人员照片" :label-width="formLabelWidth">
                          <el-upload
                            ref="upload"
                            action=""
                            :limit="3"
                            :disabled="true"
                            :on-exceed="handleExceed"
                            list-type="picture-card"
                            :before-upload="handleBeforeUpload"
                            :on-success="handleAvatarSuccess2"
                            :on-remove="handleRemove"
                            :http-request="modeUpload"
                            :file-list="this.handleDataForm.fileList"
                          >
                            <i class="el-icon-plus" />
                          </el-upload>
                          <el-dialog :visible.sync="dialogVisible2">
                            <img width="100%" :src="dialogImageUrl" alt="">
                          </el-dialog>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="开工前照片" :label-width="formLabelWidth">
                          <el-upload
                            ref="upload"
                            action=""
                            :limit="3"
                            :disabled="true"
                            :on-exceed="handleExceed"
                            list-type="picture-card"
                            :before-upload="handleBeforeUpload"
                            :on-success="handleAvatarSuccess2"
                            :on-remove="handleRemove"
                            :http-request="modeUpload2"
                            :file-list="this.handleDataForm.fileList2"
                          >
                            <i class="el-icon-plus" />
                          </el-upload>
                          <el-dialog :visible.sync="dialogVisible2">
                            <img width="100%" :src="dialogImageUrl" alt="">
                          </el-dialog>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-collapse-item>
                <el-collapse-item title="完工信息" name="4">
                  <div v-if="this.handleDataForm === null || this.handleDataForm.workAfterPhoto === null" style="text-align: center">
                    <img src="@/assets/nodata/empty.png" style="width: 300px; height: 250px">

                  </div>
                  <el-form
                    v-if="this.handleDataForm !== null && this.handleDataForm.workAfterPhoto !== null"
                    ref="handleDataForm"
                    :model="handleDataForm"
                    label-width="80px"
                    :size="size"
                    style="text-align:left;"
                    @keyup.enter.native="submitForm()"
                  >
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="完工时间" prop="finishWorkTime" :label-width="formLabelWidth">
                          <el-date-picker
                            v-model="handleDataForm.finishWorkTime"
                            type="datetime"
                            :disabled="true"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择完工时间"
                            :picker-options="editStopOptions"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="22">
                        <el-form-item label="完工情况" prop="finishNote" :label-width="formLabelWidth">
                          <el-input v-model="handleDataForm.finishNote" maxlength="256" :disabled="true" show-word-limit rows="5" type="textarea" placeholder="请输完工情况" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="22">
                        <el-form-item label="完工后照片" :label-width="formLabelWidth">
                          <el-upload
                            ref="upload"
                            action=""
                            :disabled="true"
                            :limit="3"
                            :on-exceed="handleExceed"
                            list-type="picture-card"
                            :before-upload="handleBeforeUpload"
                            :on-success="handleAvatarSuccess2"
                            :on-remove="handleRemove3"
                            :http-request="modeUpload3"
                            :file-list="this.handleDataForm.fileList3"
                          >
                            <i class="el-icon-plus" />
                          </el-upload>
                          <el-dialog :visible.sync="dialogVisible2">
                            <img width="100%" :src="dialogImageUrl" alt="">
                          </el-dialog>
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
import { getCarDetailTestWarnInfo, getCarDetailInsuranceWarnInfo } from '@/api/warning'
import { getOneWorkOrderInfo, getOrderHandleInfoOne, getOrderCarInfo, getOrderToolInfo, handleOrderInfoDetails } from '@/api/workOrder'
import { uploadpciture, uploadRequirePciture } from '@/api/file'
import { getStationInfo } from '@/api/station'
import { getLineInfo } from '@/api/line'
import { getTgInfo } from '@/api/tg'
import { getUserInfoList } from '@/api/user'
import { getAcceptDispatchInfo, getDispatchInfoInDetails, getOrderDispatchInfoInDetails, getOrderAcceptDispatchInfo } from '@/api/dispatch'

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
      equipmentInfoTableData: [],
      options: [],
      deptOptions: [],
      stationOptions: [],
      lineOptions: [],
      tgOptions: [],
      teamOptions: [],
      wareOptions: [],
      carTypesOptions: [],
      toolTypesOptions: [],
      carOptions: [],
      toolOptions1: [],
      toolOptions2: [],
      toolOptions3: [],
      toolOptions4: [],
      toolOptions5: [],
      toolOptions6: [],
      userInfo2: [],
      userInfo: {

      },
      dialogImageUrl: '',
      dialogVisible2: false,
      unitID: 5,
      projectTypeOptions: [],
      requireTypeOptions: [],
      warnInsuranceTableData: [],
      orderIdParams: this.$route.params.id,
      dataForm: {
        id: '',
        orderId: '',
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
        auditReason: '',
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
        orderId: '',
        jiedanUnitName: '',
        jiedanTeamName: '',
        manageNameRecall: '',
        managePhone: '',
        handleTime1: '',
        handleTime: '',
        handleReason: ''
      },
      // 回复处理信息表单
      handleDataForm: {
        dialogName: '',
        h: '',
        m: '',
        s: '',
        pickerDate: false,
        toolOne: '',
        toolTwo: '',
        toolThree: '',
        toolFour: '',
        toolFive: '',
        toolSix: '',
        manage: '',
        linquTime: '',
        carNumber: '',
        multipartFile: '',
        orderId: '',
        carType: '',
        toolType1: '',
        toolType2: '',
        toolType3: '',
        toolType4: '',
        toolType5: '',
        toolType6: '',
        warehourseName1: '',
        warehourseName2: '',
        warehourseName3: '',
        warehourseName4: '',
        warehourseName5: '',
        warehourseName6: '',
        warehourseName: '',
        jiedanUnitName: '',
        jiedanTeamName: '',
        manageNameRecall: '',
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
        arriveTime: '',
        liveCondition: '',
        multiPhoto: '',
        watchResult: '',
        mode: [],
        startWorkTime: '',
        workerPhoto: '',
        workBeforePhoto: '',
        workAfterPhoto: '',
        finishWorkTime: '',
        finishNote: '',
        pickList: [],
        fileList: [],
        fileList2: [],
        fileList3: []
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
      editStopOptions: {
        disabledDate: time => {
          // this.handleDataForm.startWorkTime 是上一条数据的开始时间
          const date = new Date(this.handleDataForm.startWorkTime)
          const minutes = date.getMinutes() + 1
          const seconds = date.getSeconds() + 1
          // h和m 是将日期只取时分
          this.handleDataForm.h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
          this.handleDataForm.m = (minutes < 10 ? '0' + minutes : minutes + ':')
          this.handleDataForm.s = (seconds < 10 ? '0' + seconds : seconds)
          // pickerDate 判断当前选择时间是否等于上条数据时间
          // 若等于时，限制时间从00：00：00 - 上条数据开始时间，不等于时，24小时可选
          this.handleDataForm.pickerDate = date.toDateString() === new Date(this.handleDataForm.finishWorkTime).toDateString()
          return (
            time.getTime() <= new Date(this.handleDataForm.startWorkTime).getTime() - 86400000 ||
            time.getTime() < new Date(1970 - 1 - 1).getTime() // 禁止选择1970年以前的日期
          )
        }
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
    this.getOneWorkOrderInfo()
    this.getOrderDispatchInfoInDetails()
    this.handleInfoDetails()
    this.getHandleEquipmentInfo()
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
    modeUpload2(item) {
      const formData = new FormData()
      formData.append('multipartFile', item.file)
      const uid = item.file.uid
      const that = this
      uploadRequirePciture(formData).then(res => {
        if (that.handleDataForm.fileList2 === null) {
          that.handleDataForm.fileList2 = []
        }
        if (that.handleDataForm.fileList2 === undefined) {
          that.handleDataForm.fileList2 = []
        }
        console.log('上传照片时相应数据fileList2')
        that.handleDataForm.fileList2.push({ key: parseInt(that.handleDataForm.fileList2.length), uid: uid, url: res.data.data })
        console.log('fileList2的数据是：')
        console.log(that.handleDataForm.fileList2)
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
    modeUpload3(item) {
      const formData = new FormData()
      formData.append('multipartFile', item.file)
      const uid = item.file.uid
      const that = this
      uploadRequirePciture(formData).then(res => {
        if (that.handleDataForm.fileList3 === null) {
          that.handleDataForm.fileList3 = []
        }
        if (that.handleDataForm.fileList3 === undefined) {
          that.handleDataForm.fileList3 = []
        }
        console.log('上传照片时相应数据fileList3')
        that.handleDataForm.fileList3.push({ key: parseInt(that.handleDataForm.fileList3.length), uid: uid, url: res.data.data })
        console.log('fileList3的数据是：')
        console.log(that.handleDataForm.fileList3)
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
    handleRemove2(file, fileList) {
      console.log('去除前的fileList和this.handleDataForm.fileList2')
      console.log(fileList)
      console.log(this.handleDataForm.fileList2)
      for (const i in this.handleDataForm.fileList2) {
        if (this.handleDataForm.fileList2[i].uid === file.uid) {
          this.handleDataForm.fileList2.splice(i, 1)
        }
      }
      console.log('处理相应的图片去除之后的相应的fileList2')
      console.log(fileList)
      console.log(this.handleDataForm.fileList2)
    },
    handleRemove3(file, fileList) {
      console.log('去除前的fileList和this.handleDataForm.fileList3')
      console.log(fileList)
      console.log(this.handleDataForm.fileList3)
      for (const i in this.handleDataForm.fileList3) {
        if (this.handleDataForm.fileList3[i].uid === file.uid) {
          this.handleDataForm.fileList3.splice(i, 1)
        }
      }
      console.log('处理相应的图片去除之后的相应的fileList3')
      console.log(fileList)
      console.log(this.handleDataForm.fileList3)
    },
    // 处理审核的信息
    handleInfoDetails: function(row) {
      this.handleDataForm.requireIdd = this.orderIdParams
      this.dataForm.auditPeople = this.user.username
      // await this.getLineByStation2(this.dataForm.stationId)
      //  console.log(this.dataForm.tgId)
      const params = new URLSearchParams()
      params.append('orderId', this.orderIdParams)
      getOrderAcceptDispatchInfo(params).then(response => {
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
      params1.append('orderId', this.orderIdParams)
      getOrderHandleInfoOne(params1).then(response => {
        console.log('回复界面获取的处理信息为：')
        console.log(response.data.data)
        this.handleDataForm = response.data.data
        if (this.handleDataForm !== null) {
          var that = this
          var List
          if (this.handleDataForm.workerPhoto === '' || this.handleDataForm.workBeforePhoto === null) {
            List = null
          } else {
            List = this.handleDataForm.workerPhoto.split('#')
          }
          this.handleDataForm.fileList = []
          console.log('获取的照片list')
          console.log(List)
          if (List != null) {
            List.forEach(function(value, key, arr) {
              console.log(key, arr[key])
              that.handleDataForm.fileList.push({ key: key, url: arr[key] })
            })
          }
          var List3
          if (this.handleDataForm.workAfterPhoto === '' || this.handleDataForm.workAfterPhoto === null) {
            List3 = null
          } else {
            List3 = this.handleDataForm.workAfterPhoto.split('#')
          }
          this.handleDataForm.fileList3 = []
          console.log('获取的照片list3')
          console.log(List3)
          if (List3 != null) {
            List3.forEach(function(value, key, arr) {
              console.log(key, arr[key])
              that.handleDataForm.fileList3.push({ key: key, url: arr[key] })
            })
          }
          var List2
          if (this.handleDataForm.workBeforePhoto === '' || this.handleDataForm.workBeforePhoto === null) {
            List2 = null
          } else {
            List2 = this.handleDataForm.workBeforePhoto.split('#')
          }
          this.handleDataForm.fileList2 = []
          console.log('获取的照片list2')
          console.log(List2)
          if (List2 != null) {
            List2.forEach(function(value, key, arr) {
              console.log(key, arr[key])
              that.handleDataForm.fileList2.push({ key: key, url: arr[key] })
            })
          }
        }
        this.$forceUpdate()
      })
    },
    // 查询装备领取的信息
    getHandleEquipmentInfo: function(row) {
      this.handleDataForm.requireIdd = this.orderIdParams
      this.dataForm.auditPeople = this.user.username
      // await this.getLineByStation2(this.dataForm.stationId)
      //  console.log(this.dataForm.tgId)
      const params = new URLSearchParams()
      params.append('orderId', this.orderIdParams)
      getOrderToolInfo(params).then(response => {
        this.loading = false
        console.log('获取的领取的工具信息为：')
        console.log(response.data.data)
        if (response.data.data !== null) {
          this.equipmentInfoTableData = response.data.data.records
          this.total = response.data.data.total
        } else {
          this.equipmentInfoTableData = null
        }

        // this.handleDataForm = response.data.data
        var date = new Date()
        // alert(date)
        // console.log(date.replaceAll('T', ' '))
        this.dataForm.auditTime1 = date
        // this.didpatchDataForm.handleTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate()) + ' ' + (date.getHours()) + ':' + (date.getMinutes()) + ':' + (date.getSeconds())
      })
      const params1 = new URLSearchParams()
      params1.append('orderId', this.orderIdParams)
      getOrderCarInfo(params1).then(response => {
        console.log('获取的领取的车辆信息为：')
        console.log(response.data.data)
        if (response.data.data !== null) {
          this.handleDataForm.carNumber = response.data.data.carNumber
          this.handleDataForm.carType = response.data.data.carType
          this.handleDataForm.warehourseName = response.data.data.carNote
        }
        this.$forceUpdate()
      })
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
    // 处理照片强的上传
    handleAvatarSuccess2(res, file) {
      console.log(URL.createObjectURL(file.raw))
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
    getOneWorkOrderInfo: function() {
      const params = new URLSearchParams()
      params.append('orderId', this.orderIdParams)
      getOneWorkOrderInfo(params).then((res) => {
        this.tableData = res.data.data
        this.dataForm = this.tableData
        console.log('表格获取的工作单的数据')
        console.log(res.data.data)
        console.log(this.dataForm)
      })
    },
    // 查询工具的试验信息
    getOrderDispatchInfoInDetails: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('orderId', this.orderIdParams)
      getOrderDispatchInfoInDetails(params).then((res) => {
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
