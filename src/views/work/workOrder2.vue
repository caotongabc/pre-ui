<template xmlns:font-color="http://www.w3.org/1999/xhtml">
  <div class="app-container" style="min-height: 100%">
    <!-- 查询和其他操作 -->
    <div class="filter-container" style="margin: 10px 0 10px 0; min-height: 70%">
      <el-form style="align:right" :inline="false">
        <el-row>
          <el-col :span="5" style="text-align: right">
            <label>工单编号：</label>
            <el-input
              v-model="query.orderId"
              clearable
              class="filter-item"
              style="width: 200px; margin-right: 15px"
              size="small"
              placeholder="请输入需求编号"
              @keyup.enter.native="handleFind"
            />
          </el-col>
          <el-col :span="5" style="text-align: right">
            <label>工程名称：</label>
            <el-input
              v-model="query.projectName"
              clearable
              class="filter-item"
              style="width: 200px;margin-right: 15px"
              size="small"
              placeholder="请输入工程名称"
              @keyup.enter.native="handleFind"
            />
          </el-col>
          <el-col :span="5" style="text-align: right">
            <label>工程类型：</label>
            <el-select v-model="query.projectType" filterable clearable style="width: 200px;margin-right: 15px" placeholder="请选择" @click.native="getProjectType">
              <el-option
                v-for="item in projectTypeOptions"
                :key="item.code"
                style="width: 200px;margin-right: 15px"
                :label="item.value"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="5" style="text-align: right">
            <label style="width: 40px;text-align: right">需求状态：</label>
            <el-select v-model="query.orderStatus" filterable clearable placeholder="请选择" style="width: 200px;margin-right: 15px">
              <el-option value="1">待派单</el-option>
              <el-option value="2">待接单</el-option>
              <el-option value="3">待勘察</el-option>
              <el-option value="4">待回复</el-option>
            </el-select>
          </el-col>
          <el-button style="border: none ; background-color:white; color: #00ccff" @click.native="showSearch" v-text="showText" />
        </el-row>
        <el-row v-show="isShow" style="margin-top: 10px">
          <el-col :span="5" style="text-align: right">
            <label>需求类型：</label>
            <el-select v-model="query.requireType" filterable clearable placeholder="请选择" style="width: 200px;margin-right: 15px" @click.native="getRequireType">
              <el-option
                v-for="item in requireTypeOptions"
                :key="item.code"
                style="width: 200px;margin-right: 15px"
                :label="item.value"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="5" style="text-align: right">
            <label>变电站：</label>
            <el-select v-model="query.stationId" filterable clearable placeholder="请选择" style="width: 200px;margin-right: 15px" @change="stationCurrentChangeHandle">
              <el-option
                v-for="item in stationOptions"
                :key="item.stationId"
                style="width: 200px;margin-right: 15px"
                :label="item.stationName"
                :value="item.stationId"
              />
            </el-select>
          </el-col>
          <el-col :span="5" style="text-align: right">
            <label>线路：</label>
            <el-select v-model="query.lineId" filterable clearable placeholder="请选择" style="width: 200px;margin-right: 15px" @change="lineCurrentChangeHandle">
              <el-option
                v-for="item in lineOptions"
                :key="item.lineId"
                style="width: 200px;margin-right: 15px"
                :label="item.lineName"
                :value="item.lineId"
              />
            </el-select>
          </el-col>
          <el-col :span="5" style="text-align: right">
            <label>台区：</label>
            <el-select v-model="query.tgId" filterable clearable placeholder="请选择" style="width: 200px;margin-right: 15px" @change="tgCurrentChangeHandle">
              <el-option
                v-for="item in tgOptions"
                :key="item.tgId"
                style="width: 200px;margin-right: 15px"
                :label="item.tgName"
                :value="item.tgId"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row v-show="isShow" style="margin-top: 10px">
          <el-col :span="5" style="text-align: right">
            <label style="width: 40px;text-align: right">派单单位：</label>
            <el-select v-model="query.applyUnit" filterable clearable placeholder="请选择" style="width: 200px;margin-right: 15px" @change="stationCurrentChangeHandle">
              <el-option
                v-for="item in deptOptions"
                :key="item.deptId"
                style="width: 200px;margin-right: 15px"
                :label="item.name"
                :value="item.deptId"
              />
            </el-select>
          </el-col>
          <el-col :span="5" style="text-align: right">
            <label style="width: 40px;text-align: right">派单人：</label>
            <el-input
              v-model="query.applyPeople"
              clearable
              class="filter-item"
              style="width: 200px;margin-right: 15px"
              size="small"
              placeholder="请输入需求状态"
              @keyup.enter.native="handleFind"
            />
          </el-col>
          <el-col :span="10">
            <label style="margin-left: 38px">派单时间：</label>
            <el-date-picker
              v-model="query.applyTime"
              style="width: 500px"
              type="daterange"
              format="yyyy-MM-dd "
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              @change="applyTimeFormat"
            />
          </el-col>
        </el-row>
      </el-form>
      <br>
      <el-button class="filter-item" style="margin-top: 9px" size="small" type="primary" icon="el-icon-search" @click="handleFind">查询
      </el-button>
      <el-button class="filter-item" style="margin-top: 9px" type="primary" icon="el-icon-refresh" size="small" @click="handleReset">重置</el-button>
    </div>
    <!-- 表格内容显示区域 -->
    <el-table v-loading="loading" :data="tableData" border style="width: 100% " :default-sort="{ prop: 'startTime', order: 'ascending' }" @selection-change="handleSelectionChange">
      <el-table-column type="selection" />
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工程名称" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.projectName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工程类型" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.projectType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工单编号" width="160" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <!--          <span>{{ scope.row.orderId }}</span>-->
          <span style="color: #2C7BFB ;cursor: pointer" @click="goDetail(scope.row.orderId)">{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工单状态" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.orderStatus === 0" size="small" type="info">待提交</el-tag>
            <el-tag v-else-if="scope.row.orderStatus=== 1" size="small" type="info">待派单</el-tag>
            <el-tag v-else-if="scope.row.orderStatus=== 2" size="small" type="info">待接单</el-tag>
            <el-tag v-else-if="scope.row.orderStatus=== 3" size="small" type="info">已接单</el-tag>
            <el-tag v-else-if="scope.row.orderStatus=== 4" size="small" type="danger">已退单</el-tag>
            <el-tag v-else-if="scope.row.orderStatus=== 5" size="small" type="info">待审核</el-tag>
            <el-tag v-else-if="scope.row.orderStatus=== 6" size="small" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.orderStatus=== 7" size="small" type="danger">审核不通过</el-tag>
            <el-tag v-else-if="scope.row.orderStatus=== 8" size="small" type="info">到达现场</el-tag>
            <el-tag v-else-if="scope.row.orderStatus=== 9" size="small" type="info">已开工</el-tag>
            <el-tag v-else-if="scope.row.orderStatus=== 10" size="small" type="info">已完工</el-tag>
            <el-tag v-else-if="scope.row.orderStatus=== 11" size="small" type="info">已领装备</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="需求类型" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.requireType === '日常需求'" size="small" type="info">日常需求</el-tag>
            <el-tag v-if="scope.row.requireType === '一般需求'" size="small">一般需求</el-tag>
            <el-tag v-if="scope.row.requireType === '紧急需求'" size="small" type="danger">紧急需求</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="变电站" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.stationName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="线路" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.lineName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="台区" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.tgName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="派单单位" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.unitName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="派单人" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.applyPeople }}</span>
        </template>
      </el-table-column>
      <el-table-column label="派单人电话" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.applyPeopletel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="150" align="center">
        <template slot-scope="scope">
          <el-button v-if=" scope.row.orderStatus === 2 && (RoleSrting.indexOf('5') !== -1 || RoleSrting.indexOf('4') !== -1)" type="text" icon="el-icon-edit" style="cursor: pointer" @click="handleAcceptDispatch(scope.row)">接单</el-button>
          <el-button v-if=" scope.row.orderStatus === 2 && (RoleSrting.indexOf('5') !== -1 || RoleSrting.indexOf('4') !== -1)" type="text" icon="el-icon-edit" style="cursor: pointer" @click="handleRecallDispatch(scope.row)">退单</el-button>
          <el-button v-if=" scope.row.orderStatus === 0 && (RoleSrting.indexOf('5') !== -1 || RoleSrting.indexOf('4') !== -1)" type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button v-if=" scope.row.orderStatus === 8 && (RoleSrting.indexOf('5') !== -1 || RoleSrting.indexOf('4') !== -1)" type="text" icon="el-icon-edit" style="cursor: pointer" @click="handleStartWork(scope.row)">开工</el-button>
          <el-button v-if=" scope.row.orderStatus === 3 && (RoleSrting.indexOf('5') !== -1 || RoleSrting.indexOf('4') !== -1)" type="text" icon="el-icon-edit" style="cursor: pointer" @click="handleEquipment(scope.row)">装备领取</el-button>
          <el-button v-if=" scope.row.orderStatus === 11 && (RoleSrting.indexOf('5') !== -1 || RoleSrting.indexOf('4') !== -1)" type="text" icon="el-icon-edit" style="cursor: pointer" @click="handleArrive(scope.row)">到达现场</el-button>
          <el-button v-if=" scope.row.orderStatus === 7 && (RoleSrting.indexOf('5') !== -1 || RoleSrting.indexOf('4') !== -1)" type="text" icon="el-icon-edit" style="cursor: pointer" @click="handleWorkAgain(scope.row)">返工</el-button>
          <el-button v-if=" scope.row.orderStatus === 9 && (RoleSrting.indexOf('5') !== -1 || RoleSrting.indexOf('4') !== -1)" type="text" icon="el-icon-edit" @click="handleFinishWork(scope.row)">完工</el-button>
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
      :title="!dataForm.id ? '新增需求' : '修改需求'"
      width="70%"
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
            <el-form-item label="需求编号" prop="orderId" :label-width="formLabelWidth">
              <el-input v-model="dataForm.orderId" :disabled="true" placeholder="请输入工具编号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工程名称" prop="projectName" :label-width="formLabelWidth">
              <el-input v-model="dataForm.projectName" placeholder="请输入工程名称" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工程类型" prop="projectType" :label-width="formLabelWidth">
              <el-select v-model="dataForm.projectType" clearable placeholder="请选择" @click.native="getProjectType">
                <el-option
                  v-for="item in projectTypeOptions"
                  :key="item.code"
                  :label="item.value"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="需求类型" prop="requireType" :label-width="formLabelWidth">
              <el-select v-model="dataForm.requireType" clearable placeholder="请选择" @click.native="getRequireType">
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
              <el-select v-model="dataForm.stationName" filterable clearable placeholder="请选择" @change="stationCurrentChangeHandle2">
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
              <el-select v-model="dataForm.lineName" clearable placeholder="请选择" @click.native="lineClick" @change="lineCurrentChangeHandle2">
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
              <el-select v-model="dataForm.tgName" clearable placeholder="请选择" @click.native="tgClick" @change="tgCurrentChangeHandle2">
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
              <el-input v-model="dataForm.workAddress" placeholder="请输入作业地点" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请单位" prop="unitName" :label-width="formLabelWidth">
              <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
              <el-select v-model="dataForm.unitName" :disabled="true" filterable clearable placeholder="请选择" @change="applyUnitCurrentChangeHandle2">
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
              <el-input v-model="dataForm.workContent" maxlength="256" show-word-limit rows="5" type="textarea" placeholder="请输入作业内容" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :size="size" @click="recall">取消</el-button>
        <el-button :size="size" type="primary" :loading="editLoading" @click="submitEditForm">确定</el-button>
      </span>
    </el-dialog>
    <!-- 装备领取界面 -->
    <el-dialog
      title="装备领取"
      width="70%"
      :visible.sync="equipmentDialogVisible"
      :close-on-click-modal="false"
    >
      <el-collapse v-model="activeNames">
        <el-collapse-item title="工具领取" name="1">
          <el-form
            ref="handleDataForm"
            :model="handleDataForm"
            :rules="dataRule"
            label-width="80px"
            :size="size"
            style="text-align:left;"
            @keyup.enter.native="submitForm()"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="需求编号" prop="orderId" :label-width="formLabelWidth">
                  <el-input v-model="dataForm.orderId" style="width: 300px;margin-right: 15px" :disabled="true" placeholder="请输入工具编号" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="所属仓库" prop="warehourseName1" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.warehourseName1" style="width: 300px;margin-right: 15px" clearable placeholder="请选择" @click.native="warehoueseClick" @change="warehoueseClick">
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
                <el-form-item label="工具类别" prop="toolType1" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.toolType1" style="width: 300px;margin-right: 15px" clearable placeholder="请选择" @change="toolTypeClick1">
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
                <el-form-item label="工具id" prop="toolOne" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.toolOne" multiple style="width: 300px;margin-right: 15px" clearable placeholder="请选择">
                    <el-option
                      v-for="item in toolOptions1"
                      :key="item.id"
                      :label="item.toolName"
                      :value="item.toolId"
                    />
                    <!-- <el-input v-model="dataForm.bigType" placeholder="请输入大类" /> -->
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="this.handleDataForm.toolOne.length !== 0 ">
              <el-col :span="8">
                <el-form-item label="所属仓库" prop="warehourseName2" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.warehourseName2" style="width: 300px;margin-right: 15px" clearable placeholder="请选择" @click.native="warehoueseClick" @change="warehoueseClick">
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
                <el-form-item label="工具类别" prop="toolType2" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.toolType2" style="width: 300px;margin-right: 15px" clearable placeholder="请选择" @change="toolTypeClick2">
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
                <el-form-item label="工具id" prop="toolTwo" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.toolTwo" multiple style="width: 300px;margin-right: 15px" clearable placeholder="请选择">
                    <el-option
                      v-for="item in toolOptions2"
                      :key="item.id"
                      :label="item.toolName"
                      :value="item.toolId"
                    />
                    <!-- <el-input v-model="dataForm.bigType" placeholder="请输入大类" /> -->
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="this.handleDataForm.toolTwo.length !== 0">
              <el-col :span="8">
                <el-form-item label="所属仓库" prop="warehourseName3" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.warehourseName3" style="width: 300px;margin-right: 15px" clearable placeholder="请选择" @click.native="warehoueseClick" @change="warehoueseClick">
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
                <el-form-item label="工具类别" prop="toolType3" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.toolType3" style="width: 300px;margin-right: 15px" clearable placeholder="请选择" @change="toolTypeClick3">
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
                <el-form-item label="工具id" prop="toolThree" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.toolThree" multiple style="width: 300px;margin-right: 15px" clearable placeholder="请选择">
                    <el-option
                      v-for="item in toolOptions3"
                      :key="item.id"
                      :label="item.toolName"
                      :value="item.toolId"
                    />
                    <!-- <el-input v-model="dataForm.bigType" placeholder="请输入大类" /> -->
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="this.handleDataForm.toolThree.length !== 0">
              <el-col :span="8">
                <el-form-item label="所属仓库" prop="warehourseName4" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.warehourseName4" style="width: 300px;margin-right: 15px" clearable placeholder="请选择" @click.native="warehoueseClick" @change="warehoueseClick">
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
                <el-form-item label="工具类别" prop="toolType4" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.toolType4" style="width: 300px;margin-right: 15px" clearable placeholder="请选择" @change="toolTypeClick4">
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
                <el-form-item label="工具id" prop="toolFour" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.toolFour" multiple style="width: 300px;margin-right: 15px" clearable placeholder="请选择">
                    <el-option
                      v-for="item in toolOptions4"
                      :key="item.id"
                      :label="item.toolName"
                      :value="item.toolId"
                    />
                    <!-- <el-input v-model="dataForm.bigType" placeholder="请输入大类" /> -->
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="this.handleDataForm.toolFour.length !== 0">
              <el-col :span="8">
                <el-form-item label="所属仓库" prop="warehourseName5" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.warehourseName5" style="width: 300px;margin-right: 15px" clearable placeholder="请选择" @click.native="warehoueseClick" @change="warehoueseClick">
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
                <el-form-item label="工具类别" prop="toolType5" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.toolType5" style="width: 300px;margin-right: 15px" clearable placeholder="请选择" @change="toolTypeClick5">
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
                <el-form-item label="工具id" prop="toolFive" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.toolFive" multiple style="width: 300px;margin-right: 15px" clearable placeholder="请选择">
                    <el-option
                      v-for="item in toolOptions5"
                      :key="item.id"
                      :label="item.toolName"
                      :value="item.toolId"
                    />
                    <!-- <el-input v-model="dataForm.bigType" placeholder="请输入大类" /> -->
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="this.handleDataForm.toolFive.length !== 0">
              <el-col :span="8">
                <el-form-item label="所属仓库" prop="warehourseName6" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.warehourseName6" style="width: 300px;margin-right: 15px" clearable placeholder="请选择" @click.native="warehoueseClick" @change="warehoueseClick">
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
                <el-form-item label="工具类别" prop="toolType6" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.toolType6" style="width: 300px;margin-right: 15px" clearable placeholder="请选择" @change="toolTypeClick6">
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
                <el-form-item label="工具id" prop="toolSix" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.toolSix" multiple style="width: 300px;margin-right: 15px" clearable placeholder="请选择">
                    <el-option
                      v-for="item in toolOptions6"
                      :key="item.id"
                      :label="item.toolName"
                      :value="item.toolId"
                    />
                    <!-- <el-input v-model="dataForm.bigType" placeholder="请输入大类" /> -->
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="车辆领取" name="2">
          <el-form
            ref="handleDataForm"
            :model="handleDataForm"
            :rules="dataRule"
            label-width="80px"
            :size="size"
            style="text-align:left;"
            @keyup.enter.native="submitForm()"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="所属仓库" prop="warehourseName" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.warehourseName" style="width: 300px;margin-right: 15px" clearable placeholder="请选择" @click.native="warehoueseClick" @change="warehoueseClick">
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
                <el-form-item label="车辆类别" prop="carType" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.carType" style="width: 300px;margin-right: 15px" clearable placeholder="请选择" @change="carTypeClick">
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
                <el-form-item label="车辆号" prop="carType" :label-width="formLabelWidth">
                  <!--<el-input v-model="dataForm.courseDept" placeholder="请输培训部门" />-->
                  <el-select v-model="handleDataForm.carNumber" style="width: 300px;margin-right: 15px" clearable placeholder="请选择">
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
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <span slot="footer" class="dialog-footer">
        <el-button :size="size" @click="recall">取消</el-button>
        <el-button :size="size" type="primary" :loading="editLoading" @click="submitEditForm">确定</el-button>
      </span>
    </el-dialog>
    <!-- 退单界面 -->
    <el-dialog
      :title="!dataForm.id ? '退单' : '退单'"
      width="70%"
      :visible.sync="dispatchdialogVisible"
      :close-on-click-modal="false"
    >
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基本信息" name="1">
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
                <el-form-item label="需求编号" prop="orderId" :label-width="formLabelWidth">
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
                  <el-select v-model="dataForm.projectType" :disabled="true" clearable placeholder="请选择" @click.native="getProjectType">
                    <el-option
                      v-for="item in projectTypeOptions"
                      :key="item.code"
                      :label="item.value"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="需求类型" prop="requireType" :label-width="formLabelWidth">
                  <el-select v-model="dataForm.requireType" :disabled="true" clearable placeholder="请选择" @click.native="getRequireType">
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
                  <el-select v-model="dataForm.stationName" :disabled="true" filterable clearable placeholder="请选择" @change="stationCurrentChangeHandle2">
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
                  <el-select v-model="dataForm.lineName" :disabled="true" clearable placeholder="请选择" @click.native="lineClick" @change="lineCurrentChangeHandle2">
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
                  <el-select v-model="dataForm.tgName" :disabled="true" clearable placeholder="请选择" @click.native="tgClick" @change="tgCurrentChangeHandle2">
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
                  <el-input v-model="dataForm.workContent" maxlength="256" :disabled="true" show-word-limit rows="5" type="textarea" placeholder="请输入作业内容" />
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
        </el-collapse-item>
        <el-collapse-item title="退单信息" name="2">
          <el-form
            ref="didpatchDataForm"
            :model="didpatchDataForm"
            :rules="dataRule"
            label-width="80px"
            :size="size"
            style="text-align:left;"
            @keyup.enter.native="submitForm()"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="勘探单位" prop="jiedanUnit" :label-width="formLabelWidth">
                  <el-select v-model="didpatchDataForm.jiedanUnitName" :disabled="true" filterable clearable placeholder="请选择" @change="applyUnitCurrentChangeHandle2">
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
                  <el-select v-model="didpatchDataForm.jiedanTeamName" :disabled="true" clearable placeholder="请选择" @change="teamCurrentChangeHandle2">
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
                  <el-select v-model="didpatchDataForm.manageNameRecall" :disabled="true" clearable placeholder="请选择" @change="peopleCurrentChangeHandle2">
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
                <el-form-item label="退单时间" prop="managePhone" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model="didpatchDataForm.handleTime1"
                    type="datetime"
                    :disabled="true"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择退单时间"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="退单原因" prop="handleReason" :label-width="formLabelWidth">
                  <el-input v-model="didpatchDataForm.handleReason" maxlength="256" show-word-limit rows="5" type="textarea" placeholder="请输入退单原因" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <span slot="footer" class="dialog-footer">
        <el-button :size="size" @click="recall">取消</el-button>
        <el-button :size="size" type="primary" :loading="editLoading" @click="submitEditForm">确定</el-button>
      </span>
    </el-dialog>
    <!-- 工作单处理界面 -->
    <el-dialog
      :title="handleDataForm.dialogName"
      :fullscreen="true"
      :visible.sync="handleDispatchDialogVisible"
      :close-on-click-modal="false"
    >
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基本信息" name="1">
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
                <el-form-item label="需求编号" prop="orderId" :label-width="formLabelWidth">
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
                  <el-select v-model="dataForm.projectType" :disabled="true" clearable placeholder="请选择" @click.native="getProjectType">
                    <el-option
                      v-for="item in projectTypeOptions"
                      :key="item.code"
                      :label="item.value"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="需求类型" prop="requireType" :label-width="formLabelWidth">
                  <el-select v-model="dataForm.requireType" :disabled="true" clearable placeholder="请选择" @click.native="getRequireType">
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
                  <el-select v-model="dataForm.stationName" :disabled="true" filterable clearable placeholder="请选择" @change="stationCurrentChangeHandle2">
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
                  <el-select v-model="dataForm.lineName" :disabled="true" clearable placeholder="请选择" @click.native="lineClick" @change="lineCurrentChangeHandle2">
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
                  <el-select v-model="dataForm.tgName" :disabled="true" clearable placeholder="请选择" @click.native="tgClick" @change="tgCurrentChangeHandle2">
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
              <el-col :span="22">
                <el-form-item label="作业内容" prop="toolNote" :label-width="formLabelWidth">
                  <el-input v-model="dataForm.workContent" maxlength="256" :disabled="true" show-word-limit rows="5" type="textarea" placeholder="请输入作业内容" />
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
        </el-collapse-item>
        <el-collapse-item title="勘探信息" name="2">
          <el-form
            ref="didpatchDataForm"
            :model="didpatchDataForm"
            :rules="dataRule"
            label-width="80px"
            :size="size"
            style="text-align:left;"
            @keyup.enter.native="submitForm()"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="勘探单位" prop="jiedanUnit" :label-width="formLabelWidth">
                  <el-select v-model="didpatchDataForm.jiedanUnitName" :disabled="true" filterable clearable placeholder="请选择" @change="applyUnitCurrentChangeHandle2">
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
                  <el-select v-model="didpatchDataForm.jiedanTeamName" :disabled="true" clearable placeholder="请选择" @change="teamCurrentChangeHandle2">
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
                  <el-select v-model="didpatchDataForm.manageNameRecall" :disabled="true" clearable placeholder="请选择" @change="peopleCurrentChangeHandle2">
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
                    v-model="didpatchDataForm.handleTime1"
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
        <el-collapse-item title="到达现场" name="3">
          <el-form
            ref="handleDataForm"
            :model="handleDataForm"
            :rules="dataRule"
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
                    :disabled="isStartWork || isFinishWork || isHandleAgain"
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
                  <el-input v-model="handleDataForm.liveCondition" :disabled="isStartWork || isFinishWork || isHandleAgain" maxlength="256" show-word-limit rows="5" type="textarea" placeholder="请输入现场情况" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item v-if="dataForm.orderStatus === 5||dataForm.orderStatus === 6||dataForm.orderStatus === 7||dataForm.orderStatus === 8 ||dataForm.orderStatus === 9 ||dataForm.orderStatus === 10" title="开工信息" name="4">
          <el-form
            ref="handleDataForm"
            :model="handleDataForm"
            :rules="dataRule"
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
                    :disabled="isFinishWork  || isHandleAgain"
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
              <el-col :span="8">
                <el-form-item label="现场人员照片" :label-width="formLabelWidth">
                  <el-upload
                    ref="upload"
                    action=""
                    :limit="3"
                    :disabled="isFinishWork || isHandleAgain"
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
              <el-col :span="8">
                <el-form-item label="开工前照片" :label-width="formLabelWidth">
                  <el-upload
                    ref="upload"
                    action=""
                    :limit="3"
                    :on-exceed="handleExceed"
                    list-type="picture-card"
                    :disabled="isFinishWork || isHandleAgain"
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
        <el-collapse-item v-if="dataForm.orderStatus === 5||dataForm.orderStatus === 6||dataForm.orderStatus === 7||dataForm.orderStatus === 9 " title="完工信息" name="5">
          <el-form
            ref="handleDataForm"
            :model="handleDataForm"
            :rules="dataRule"
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
                  <el-input v-model="handleDataForm.finishNote" maxlength="256" show-word-limit rows="5" type="textarea" placeholder="请输完工情况" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                  <el-form-item label="完工后照片" :label-width="formLabelWidth">
                    <el-upload
                      ref="upload"
                      action=""
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
      <span slot="footer" class="dialog-footer">
        <el-button :size="size" @click="recall">取消</el-button>
        <el-button :size="size" type="primary" :loading="editLoading" @click="submitEditForm">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { deleteBatchCourse, isExistToolId, getFreeToolInfo } from '@/api/tool'
import { parseTime } from '@/utils/index'
import { getDept, getDeptArray, getLowDept } from '@/api/dept'
import { getType } from '@/api/interface'
import initDict from '@/mixins/initDict'
import { getUserInfo } from '@/api/user'
import { getWareInfo } from '@/api/warehourse'
import { getFreeCarInfo } from '@/api/car'
import { getTeamByUnit } from '@/api/team'
import { getFullWarnStrategyInfo, getOneWarnStrategyInfo } from '@/api/warnStrategy'
import moment from 'moment'
import { takeEquipment, submitList, recallList, updateWorkRequire, addWorkRequire, deleteWorkRequire, addFeedBackInfo, updateFeedBackInfo, getHandleInfoOne } from '@/api/workRequire'
import { uploadpciture, uploadRequirePciture } from '@/api/file'
import { getStationInfo } from '@/api/station'
import { getLineInfo } from '@/api/line'
import { getTgInfo } from '@/api/tg'
import { getUserInfoList } from '@/api/user'
import { getWorkOrderInfoByPage, getWorkerOrderInfoByPage, getOrderHandleInfoOne, updateOrderArriveHandleInfo, updateOrderStartWorkHandleInfo, updateOrderFinishWorkHandleInfo, updateOrderWorkAgainHandleInfo } from '@/api/workOrder'
import { getAcceptDispatchInfo, getOrderAcceptDispatchInfo, acceptOrderDispath, getRecallOrderDispatchInfo, recallOrderDispatch } from '@/api/dispatch'

export default {
  mixins: [initDict],
  data() {
    return {
      activeNames: ['1', '2', '3'],
      checkId: null,
      showText: '展开收索',
      size: 'small',
      tableData: [],
      user: {
        avatar: '',
        username: '',
        multipartFile: '',
        phone: 0,
        email: '',
        deptName: '',
        jobName: '',
        deptId: '',
        createTime: ''
      },
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
        orderId: '',
        projectName: '',
        orderStatus: '',
        projectType: '',
        requireType: '',
        stationId: '',
        lineId: '',
        tgId: '',
        applyPeople: '',
        applyUnit: '',
        applyTime: '',
        startapplytime: '',
        endapplytime: ''
      },
      title: '',
      isExist: 0,
      userId: '',
      dialogFormVisible: false, // 控制弹出框
      formLabelWidth: '120px',
      isEditForm: false,
      isEquipment: false,
      isAdd: false,
      isStartWork: false,
      isFinishWork: false,
      isRecall: false,
      isArrive: false,
      isHandleAgain: false,
      currentPage: 1,
      pageSize: 8,
      RoleSrting: '',
      total: 0, // 总数量
      // 分类菜单列表
      deptData: [],
      value: '',
      // tree配置项
      deptTreeProps: {
        label: 'name',
        children: 'children'
      },
      isShow: false,
      options: [],
      deptOptions: [],
      stationOptions: [],
      lineOptions: [],
      tgOptions: [],
      userInfo: {

      },
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
      unitID: 5,
      projectTypeOptions: [],
      requireTypeOptions: [],
      dataForm: {
        id: '',
        orderId: '',
        requireIdd: '',
        projectName: '',
        orderStatus: '',
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
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
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
      // 表单校验
      dataRule: {
        toolId: [{ required: true, message: '工具名称不能为空', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' },
          { validator: this.isExistToolId2, trigger: 'blur' }],
        toolName: [{ required: true, message: '工具名称不能为空', trigger: 'blur' }], // courseDept: [{ required: true, message: '培训部门不能为空', trigger: 'blur' }],
        thisTime: [{ required: true, message: '开始时间不能为空', trigger: 'blur' }],
        warehourseName: [{ required: true, message: '库房不能为空', trigger: 'blur' }],
        buyTime: [{ required: true, message: '购置时间不能空', trigger: 'blur' }],
        bigType: [{ required: true, message: '类别不能空', trigger: 'blur' }],
        nextTime: [{ required: true, message: '结束时间不能为空', trigger: 'blur' }],
        toolState: [{ required: true, message: '状态不能为空', trigger: 'blur' }],
        orderId: [{ required: true, message: '需求编号不能为空', trigger: 'blur' }],
        projectName: [{ required: true, message: '工程名称不能为空', trigger: 'blur' }],
        projectType: [{ required: true, message: '工程类别不能为空', trigger: 'blur' }],
        requireType: [{ required: true, message: '需求类别不能为空', trigger: 'blur' }],
        workContent: [{ required: true, message: '作业内容不能为空', trigger: 'blur' }],
        stationName: [{ required: true, message: '变电站不能为空', trigger: 'blur' }],
        jiedanUnit: [{ required: true, message: '接单单位不能为空', trigger: 'blur' }],
        lineName: [{ required: true, message: '线路不能为空', trigger: 'blur' }],
        tgName: [{ required: true, message: '台区不能为空', trigger: 'blur' }],
        unitName: [{ required: true, message: '申请单位不能为空', trigger: 'blur' }],
        applyPeople: [{ required: true, message: '申请人不能为空', trigger: 'blur' }],
        applyPeopletel: [{ required: true, message: '申请人电话不能为空', trigger: 'blur' }],
        workAddress: [{ required: true, message: '工作地点不能为空', trigger: 'blur' }],
        jiedanTeam: [{ required: true, message: '勘探班组不能为空', trigger: 'blur' }],
        manage: [{ required: true, message: '负责人不能为空', trigger: 'blur' }],
        managePhone: [{ required: true, message: '负责人电话不能为空', trigger: 'blur' }],
        auditResaon: [{ required: true, message: '审核原因不能为空', trigger: 'blur' }],
        auditPeople: [{ required: true, message: '审核人不能为空', trigger: 'blur' }],
        auditResult: [{ required: true, message: '审核结果不能为空', trigger: 'blur' }],
        auditTime1: [{ required: true, message: '审核时间不能为空', trigger: 'blur' }],
        handleReason: [{ required: true, message: '退单原因不能为空', trigger: 'blur' }],
        livePhoto: [{ required: true, message: '现场照片不能为空', trigger: 'blur' }],
        watchStartTime: [{ required: true, message: '勘察开始时间不能为空', trigger: 'blur'
        }],
        watchEndTime: [{ required: true, message: '勘察结束时间不能为空', trigger: 'blur' }],
        workCondition: [{ required: true, message: '作业条件不能为空', trigger: 'blur' }],
        workEnvironment: [{ required: true, message: '作业环境不能为空', trigger: 'blur' }],
        dangerPoint: [{ required: true, message: '危险事项不能为空', trigger: 'blur' }],
        safeMeasures: [{ required: true, message: '安全措施不能为空', trigger: 'blur' }],
        watchResult: [{ required: true, message: '勘察结果不能为空', trigger: 'blur' }]
      },
      loading: false,
      dialogImageUrl: '',
      dialogVisible2: false,
      dialogVisible: false,
      dispatchdialogVisible: false,
      equipmentDialogVisible: false,
      handleDispatchDialogVisible: false,
      editLoading: false

    }
  },
  created() {
    // 加载数据字典
    this.getUserInfo()
    this.findDeptTree()
    this.$forceUpdate()
    this.findUserInfo()
  },
  methods: {
    parseTime,
    // 加载用户个人信息
    async findUserInfo() {
      await getUserInfo().then((res) => {
        console.log(res.data.data)
        this.user = res.data.data
      })
      const a = this.user.avatar
      this.$store.dispatch('setUseradvatar', a)
    },
    // 详情处理事件
    goDetail: function(id) {
      this.$router.push({ name: '工单详情', params: { id }})
    },
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
        if (that.handleDataForm.fileList === null) {
          that.handleDataForm.fileList = []
        }
        if (that.handleDataForm.fileList === undefined) {
          that.handleDataForm.fileList = []
        }
        console.log('上传照片时相应数据fileList')
        that.handleDataForm.fileList.push({ key: parseInt(that.handleDataForm.fileList.length), uid: uid, url: res.data.data })
        console.log('fileList的数据是：')
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
      console.log('去除前的fileList和this.handleDataForm.fileList')
      console.log(fileList)
      console.log(this.handleDataForm.fileList)
      for (const i in this.handleDataForm.fileList) {
        if (this.handleDataForm.fileList[i].uid === file.uid) {
          this.handleDataForm.fileList.splice(i, 1)
        }
      }
      console.log('处理相应的图片去除之后的相应的fileList')
      console.log(fileList)
      console.log(this.handleDataForm.fileList)
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
    // 处理图片预览功能
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      console.log(file.url)
      this.dialogVisible2 = true
    },
    // 获取相应的开始时间和结束时间
    applyTimeFormat: function() {
      if (this.query.applyTime !== null) {
        this.query.startapplytime = this.query.applyTime[0]
        this.query.endapplytime = this.query.applyTime[1]
      }
    },
    // 处理返工的信息
    handleWorkAgain: function(row) {
      this.isRecall = false
      this.isEquipment = false
      this.isAdd = false
      this.isStartWork = false
      this.isFinishWork = false
      this.activeNames = ['3', '4', '5']
      this.isHandleAgain = true
      this.handleDispatchDialogVisible = true
      this.dataForm = Object.assign({}, row)
      this.checkId = this.dataForm.id
      this.handleDataForm.requireIdd = this.dataForm.orderId
      this.dataForm.auditPeople = this.userInfo.username
      // await this.getLineByStation2(this.dataForm.stationId)
      //  console.log(this.dataForm.tgId)
      const params = new URLSearchParams()
      params.append('orderId', this.dataForm.orderId)
      getOrderAcceptDispatchInfo(params).then(response => {
        console.log('回复界面获取的派单信息为：')
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
      params1.append('orderId', this.dataForm.orderId)
      getOrderHandleInfoOne(params1).then(response => {
        console.log('回复界面获取的处理信息为：')
        console.log(response.data.data)
        this.handleDataForm = response.data.data
        var that = this
        var List
        if (this.handleDataForm.workerPhoto === '') {
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
        if (this.handleDataForm.workAfterPhoto === '') {
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
        if (this.handleDataForm.workBeforePhoto === '') {
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
        console.log('复勘界面获取的图片fileList1：')
        console.log(this.handleDataForm.fileList)
        console.log('复勘界面获取的图片fileList2：')
        console.log(this.handleDataForm.fileList2)
      })
      this.$forceUpdate()
      this.getTgInfo2(this.dataForm.lineId)
      this.$forceUpdate()
    },
    // 获取用户信息
    getUserInfo: function() {
      const params = new URLSearchParams()
      getUserInfo().then((res) => {
        this.userInfo = res.data.data
        console.log('用户的信息1')
        console.log(this.userInfo)
        this.userId = this.userInfo.userId
        console.log(this.userInfo.userId)
        this.RoleSrting = res.data.data.roleString
        console.log('获取到的角色id为：')
        console.log(this.RoleSrting)
        console.log(res.data.data.roleString)
        this.unitID = res.data.data.deptId
        console.log(this.unitID)
        this.$forceUpdate()
        this.getDeptChilren()
        this.getStationChilren()
        this.getCourseList()
      })
    },
    // 获取仓库信息
    // 获取仓库信息
    getWareInfo: function() {
      const params = new URLSearchParams()
      params.append('unitId', this.userInfo.deptId)
      params.append('teamId', this.userInfo.teamId)
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
    // 获取车辆的类型
    getType: function() {
      const params = new URLSearchParams()
      params.append('type', 'cartype')
      getType(params).then((res) => {
        this.carTypesOptions = res.data.data
        console.log('车辆的类型')
        console.log(this.carTypesOptions)
        console.log(this.carTypesOptions)
      })
    },
    // 获取工具的类型
    getToolType: function() {
      const params = new URLSearchParams()
      params.append('type', 'tooltype')
      getType(params).then((res) => {
        this.toolTypesOptions = res.data.data
        console.log('工具的类型')
        console.log(this.toolTypesOptions)
        console.log(this.toolTypesOptions)
      })
    },
    getCourseList: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      // alert(this.userId)
      params.append('manage', this.userId)
      params.append('userUnit', this.unitID)
      getWorkerOrderInfoByPage(params).then(response => {
        this.loading = false
        this.tableData = response.data.data.records
        this.total = response.data.data.total
      })
    },
    // 获取需求信息并分页显示（待条件的查询）
    getWorkerOrderInfoByPage: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      params.append('orderId', this.query.orderId)
      params.append('projectName', this.query.projectName)
      params.append('projectType', this.query.projectType)
      params.append('orderStatus', this.query.orderStatus)
      params.append('requireType', this.query.requireType)
      params.append('stationId', this.query.stationId)
      params.append('lineId', this.query.lineId)
      params.append('tgId', this.query.tgId)
      params.append('userUnit', this.unitID)
      params.append('applyPeople', this.query.applyPeople)
      params.append('applyUnit', this.query.applyUnit)
      params.append('startapplytime', this.query.startapplytime)
      params.append('endapplytime', this.query.endapplytime)
      console.log(this.userInfo.userId)
      // alert(this.userInfo.userId)
      params.append('manage', this.userInfo.userId)
      console.log(this.query.applyTime)
      console.log(this.query.startapplytime)
      console.log(this.query.endapplytime)
      // params.append('toolUnit', this.query.toolUnit)
      // params.append('toolTeam', this.query.toolTeam)
      // params.append('toolWarehourse', this.query.toolWarehourse)
      // params.append('bigType', this.query.bigType)
      getWorkerOrderInfoByPage(params).then(response => {
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
    // 文件上传之前的处理
    beforeAvatarUpload(file) {
      this.dataForm.toolPhoto = ''
      const isJPG = file.type === 'image/jpeg'
      const isLt4M = file.size / 1024 / 1024 < 4
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt4M) {
        this.$message.error('上传头像图片大小不能超过 4MB!')
      }
      return isJPG && isLt4M
    },
    // 获取预警信息
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
          this.dataForm.nextTime = null
        } else {
          this.dataForm.expirationDate = response.data.data.expirationDate
          this.dataForm.nextTime = this.AddDayNumsDate(this.dataForm.thisTime, this.dataForm.expirationDate)
          console.log('获取到的预警策略数据')
          console.log(response.data.data)
          console.log(this.dataForm.expirationDate)
          console.log(this.dataForm.nextTime)
        }
      })
    },
    // 处理查找事件
    handleFind: function() {
      this.getWorkerOrderInfoByPage()
    },
    // 申请人变动,自动赋值申请人电话
    peopleCurrentChangeHandle2(data) {
      const that = this
      this.dataForm.manage = data
      this.dataForm.managePhone = ''
      this.userInfo2.forEach((item, index) => {
        if (item.userId === this.dataForm.manage) {
          console.log(item.username)
          // console.log(that.dataForm.peopleTel)
          console.log('赋值操作在执行：把电话赋值')
          this.dataForm.managePhone = item.phone
          this.$forceUpdate()
        }
      })
    },
    // 处理搜索框的显示
    showSearch: function() {
      this.isShow = !this.isShow
      if (this.isShow === true) {
        this.showText = '收缩条件'
      } else {
        this.showText = '展开条件'
      }
    },
    // 发布需求信息
    handleSubmit: function() {
      const that = this
      // let ids = this.multipleSelection.map(v => v.toolId)
      console.log(this.multipleSelection.map(v => v.id))
      this.$confirm('此操作将提交需求, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          submitList(this.multipleSelection.map(v => v.id)).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.getWorkerOrderInfoByPage()
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
            message: '已取发布'
          })
        })
    },
    // 撤销取消发布需求信息
    handleRecall: function() {
      const that = this
      // let ids = this.multipleSelection.map(v => v.toolId)
      console.log(this.multipleSelection.map(v => v.id))
      this.$confirm('此操作将撤回提交, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          recallList(this.multipleSelection.map(v => v.id)).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.getWorkerOrderInfoByPage()
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
            message: '已取消撤回'
          })
        })
    },
    // 重置功能呢
    handleReset: function() {
      this.query = {
        orderId: '',
        projectName: '',
        orderStatus: '',
        projectType: '',
        requireType: '',
        stationId: '',
        lineId: '',
        tgId: '',
        applyPeople: '',
        applyUnit: '',
        applyTime: '',
        startapplytime: '',
        endapplytime: ''
      }
      this.getWorkerOrderInfoByPage()
    },
    // 换页
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.getWorkerOrderInfoByPage()
    },
    // 加载部门列表
    findDeptTree: function() {
      getDept().then((res) => {
        this.deptData = res.data.data
      })
    },
    // 获取台区信息
    getTgInfo: function() {
      const params = new URLSearchParams()
      params.append('lineId', this.query.lineId)
      if (this.query.stationId !== '' && this.query.lineId !== null) {
        getTgInfo(params).then((res) => {
          this.tgOptions = res.data.data
          this.$forceUpdate()
          console.log('台区的信息')
          console.log(this.tgOptions)
        })
      }
    },

    // 编辑界面获取仓库信息
    getTgInfo2: function() {
      const params = new URLSearchParams()
      params.append('lineId', this.dataForm.lineId)
      console.log('传入的数据')
      console.log(this.dataForm.lineId)
      if (this.dataForm.lineId !== '' && this.dataForm.stationId !== null) {
        getTgInfo(params).then((res) => {
          this.tgOptions = res.data.data
          this.$forceUpdate()
          console.log('台区的信息')
          console.log(this.tgOptions)
        })
      }
      this.$forceUpdate()
    },
    warehoueseClick(data) {
      this.handleDataForm.warehourseId = data
      this.getWareInfo()
      this.$forceUpdate()
    },
    carTypeClick(data) {
      this.getFreeCar()
      this.$forceUpdate()
    },
    toolTypeClick1(data) {
      this.getFreeTool1()
      this.$forceUpdate()
    },
    toolTypeClick2(data) {
      this.getFreeTool2()
      this.$forceUpdate()
    },
    toolTypeClick3(data) {
      this.getFreeTool3()
      this.$forceUpdate()
    },
    toolTypeClick4(data) {
      this.getFreeTool4()
      this.$forceUpdate()
    },
    toolTypeClick5(data) {
      this.getFreeTool5()
      this.$forceUpdate()
    },
    toolTypeClick6(data) {
      this.getFreeTool6()
      this.$forceUpdate()
    },
    // 获取工程的类型
    getProjectType: function() {
      const params = new URLSearchParams()
      params.append('type', 'projectType')
      getType(params).then((res) => {
        this.projectTypeOptions = res.data.data
        console.log('工程类型')
        console.log(this.projectTypeOptions)
      })
    },
    // 获取空闲的车辆
    getFreeCar: function() {
      const params = new URLSearchParams()
      params.append('unitId', this.userInfo.deptId)
      params.append('teamId', this.userInfo.teamId)
      params.append('warehourseId', this.handleDataForm.warehourseId)
      params.append('carType', this.handleDataForm.carType)
      getFreeCarInfo(params).then((res) => {
        this.carOptions = res.data.data
        console.log('车牌号')
        console.log(this.carOptions)
      })
    },
    // 获取空闲的工具
    getFreeTool1: function() {
      const params = new URLSearchParams()
      params.append('warehourseId', this.handleDataForm.warehourseName1)
      params.append('toolType', this.handleDataForm.toolType1)
      getFreeToolInfo(params).then((res) => {
        this.toolOptions1 = res.data.data
        console.log('工具编号1')
        console.log(this.toolOptions1)
      })
    },
    // 获取空闲的工具
    getFreeTool2: function() {
      const params = new URLSearchParams()
      params.append('warehourseId', this.handleDataForm.warehourseName2)
      params.append('toolType', this.handleDataForm.toolType2)
      getFreeToolInfo(params).then((res) => {
        this.toolOptions2 = res.data.data
        console.log('工具编号2')
        console.log(this.toolOptions2)
      })
    },
    // 获取空闲的工具
    getFreeTool3: function() {
      const params = new URLSearchParams()
      params.append('warehourseId', this.handleDataForm.warehourseName3)
      params.append('toolType', this.handleDataForm.toolType3)
      getFreeToolInfo(params).then((res) => {
        this.toolOptions3 = res.data.data
        console.log('工具编号3')
        console.log(this.toolOptions3)
      })
    },
    // 获取空闲的工具
    getFreeTool4: function() {
      const params = new URLSearchParams()
      params.append('warehourseId', this.handleDataForm.warehourseName4)
      params.append('toolType', this.handleDataForm.toolType4)
      getFreeToolInfo(params).then((res) => {
        this.toolOptions4 = res.data.data
        console.log('工具编号4')
        console.log(this.toolOptions4)
      })
    },
    // 获取空闲的工具
    getFreeTool5: function() {
      const params = new URLSearchParams()
      params.append('warehourseId', this.handleDataForm.warehourseName5)
      params.append('toolType', this.handleDataForm.toolType5)
      getFreeToolInfo(params).then((res) => {
        this.toolOptions5 = res.data.data
        console.log('工具编号5')
        console.log(this.toolOptions5)
      })
    },
    // 获取空闲的工具
    getFreeTool6: function() {
      const params = new URLSearchParams()
      params.append('warehourseId', this.handleDataForm.warehourseName6)
      params.append('toolType', this.handleDataForm.toolType6)
      getFreeToolInfo(params).then((res) => {
        this.toolOptions6 = res.data.data
        console.log('工具编号6')
        console.log(this.toolOptions6)
      })
    },
    //  获取需求类型
    getRequireType: function() {
      const params = new URLSearchParams()
      params.append('type', 'requireType')
      getType(params).then((res) => {
        this.requireTypeOptions = res.data.data
        console.log('需求类型')
        console.log(this.requireTypeOptions)
      })
    },
    // 上传文件
    // 文件上传
    uploadFile(params) {
      console.log('uploadFile', params)
      // this.dataForm.toolPhoto = ''
      this.handleDataForm.multipartFile = params.file
      const isLt4M = this.handleDataForm.multipartFile.size / 1024 / 1024 < 4
      // 通过 FormData 对象上传文件
      if (!isLt4M) {
        this.$message.error('请上传4M以下的.xlsx文件')
        return false
      }
      console.log('通过方法不是action来访问接口')
      // 发起请求
      var formData = new FormData()
      formData.append('multipartFile', this.handleDataForm.multipartFile)
      uploadRequirePciture(formData).then(res => {
        console.log(this.handleDataForm.livePhoto)
        this.handleDataForm.livePhoto = res.data.data
        console.log('_RequestUploads_', res)
        console.log(this.handleDataForm.livePhoto)
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
      // this.handleDataForm.livePhoto = URL.createObjectURL(file.raw)
      console.log(this.handleDataForm.livePhoto)
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
    // 加载下级的部门
    getDeptChilren: function() {
      const params = new URLSearchParams()
      params.append('deptId', this.unitID)
      getLowDept(params).then((res) => {
        this.options = res.data.data
        this.deptOptions = res.data.data
        console.log('下级单位')
        console.log(this.options)
        console.log(this.projectTypeOptions)
      })
    },
    // 加载下级的部门
    getStationChilren: function() {
      const params = new URLSearchParams()
      params.append('deptId', this.unitID)
      getStationInfo(params).then((res) => {
        this.stationOptions = res.data.data
        console.log('下级单位')
        console.log(this.stationOptions)
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
    stationCurrentChangeHandle(data) {
      this.$forceUpdate()
      console.log('查询条件中的单位变了')
      this.query.lineId = ''
      this.query.tgId = ''
      console.log(this.query.stationId)
      if (this.query.stationId !== '') {
        this.getLineInfo(this.query.stationId)
      }
    },
    // 验证工具id是否存在
    async isExistToolId2(rule, value, callback) {
      var a = true
      if (value) {
        if (/[\u4E00-\u9FA5]/g.test(value)) {
          a = false
          callback(new Error('内容不能包含汉字!'))
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
        params.append('toolId', value)
        params.append('id', this.checkId)
        await isExistToolId(params).then((data) => {
          this.isExist = data.data.data
          console.log(this.isExist)
          console.log('执行完了')
          console.log(this.isExist)
        })

        if (this.isExist === 1) {
          callback(new Error('该工具id已经存在!'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    // 编辑勘探单位改变的事件
    applyUnitCurrentChangeHandle2(data) {
      this.$forceUpdate()
      this.dataForm.jiedanTeam = ''
      this.dataForm.manage = ''
      this.dataForm.managePhone = ''
      if (this.dataForm.jiedanUnit !== '') {
        this.getTeamByUnit2(this.dataForm.jiedanUnit)
      }
    },
    // 编辑页面班组改变，获取班组内人员信息
    teamCurrentChangeHandle2(data) {
      this.dataForm.jiedanTeam = data
      this.dataForm.manage = ''
      this.dataForm.managePhone = ''
      const params = new URLSearchParams()
      if (this.dataForm.jiedanTeam !== '') {
        params.append('teamId', this.dataForm.jiedanTeam)
        getUserInfoList(params).then((res) => {
          this.userInfo2 = res.data.data
          console.log('编辑页面用户的信息')
          console.log(this.userInfo2)
          this.$forceUpdate()
        })
      }
      console.log('编辑页面中的班组变了')
      console.log('班组变为了值：' + data)
      this.$forceUpdate()
    },
    // 编辑页面获取班组并赋值
    getTeamByUnit2: function() {
      const params = new URLSearchParams()
      params.append('teamUnitid', this.dataForm.jiedanUnit)
      getTeamByUnit(params).then((res) => {
        this.teamOptions = res.data.data
        console.log('编辑页面班组的信息')
        console.log(this.teamOptions)
      })
    },
    // 编辑变电站改变的事件
    stationCurrentChangeHandle2(data) {
      this.$forceUpdate()
      console.log('编辑页面的线路变了')
      console.log(data)
      this.dataForm.stationId = data
      this.dataForm.lineId = ''
      this.dataForm.tgId = ''
      this.dataForm.lineName = ''
      this.dataForm.tgName = ''
      console.log(this.dataForm.stationId)
      if (this.dataForm.stationId !== '') {
        this.getLineByStation2(this.dataForm.stationId)
      }
    },
    // 获取线路并赋值
    getLineInfo: function() {
      const params = new URLSearchParams()
      params.append('stationId', this.query.stationId)
      getLineInfo(params).then((res) => {
        this.lineOptions = res.data.data
        console.log('线路的信息')
        console.log(this.lineOptions)
      })
    },
    // 编辑页面获取班组并赋值
    getLineByStation2: function() {
      const params = new URLSearchParams()
      params.append('stationId', this.dataForm.stationId)
      getLineInfo(params).then((res) => {
        this.lineOptions = res.data.data
        console.log('编辑页面线路的信息')
        console.log(this.lineOptions)
      })
      this.getTgInfo2()
    },
    // 查询页面班组改变
    lineCurrentChangeHandle(data) {
      console.log('查询条件中的线路变了')
      console.log(this.query.lineId)
      this.query.lineId = data
      this.query.tgId = ''
      this.getTgInfo()
      this.$forceUpdate()
      console.log(data)
    },
    // 查询页面线路改变
    lineCurrentChangeHandle2(data) {
      this.dataForm.lineId = data
      this.getTgInfo2()
      console.log('编辑页面中的线路变了')
      console.log('线路变为了值：' + data)
      this.$forceUpdate()
    },
    tgCurrentChangeHandle(data) {
      console.log('查询条件中的台区变了')
      this.getTgInfo()
      this.$forceUpdate()
      console.log(data)
    },
    // 编辑页面台区改变
    tgCurrentChangeHandle2(data) {
      this.dataForm.tgId = data
      console.log('查询条件中的台区变了')
      console.log(data)
      this.$forceUpdate()
    },
    //   线路点击实际
    lineClick(data) {
      this.getLineByStation2()
    },
    //  台区点击事件
    tgClick(data) {
      this.getTgInfo2()
    },
    // 编辑页面的本次试验时间更改
    thisTimeChange(data) {
      this.dataForm.thisTime = data
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
      this.isAdd = true
      this.isEquipment = false
      this.isStartWork = false
      this.isFinishWork = false
      this.isRecall = false
      this.isArrive = false
      this.isHandleAgain = false
      this.checkId = 0
      this.dataForm = {
        id: 0,
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
        thisTime: '',
        applyTime: ''
      }
      var num = '' // 定义用户编号
      for (var i = 0; i < 4; i++) {
        num += Math.floor(Math.random() * 9)
      }
      num = new Date().getTime() + num // 时间戳，用来生成用户编号。
      this.dataForm.orderId = num
      this.dataForm.applyUnit = this.userInfo.deptId
      this.dataForm.unitName = this.userInfo.deptId
      this.dataForm.applyPeople = this.userInfo.username
      this.dataForm.applyPeopleId = this.userInfo.userId
      this.dataForm.applyPeopletel = this.userInfo.phone
      console.log('添加工具页面的id的值为：' + this.dataForm.id)
    },
    // 处理派单的信息
    handleAcceptDispatch: function(row) {
      const that = this
      this.$confirm('此操作进行接单,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // alert(row.orderId)
          acceptOrderDispath(row.orderId).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.getWorkerOrderInfoByPage()
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
            message: '未接单'
          })
        })
    },
    // 处理退单的信息
    handleRecallDispatch: function(row) {
      this.isRecall = true
      this.isEquipment = false
      this.isAdd = false
      this.isStartWork = false
      this.isFinishWork = false
      this.isArrive = false
      this.isHandleAgain = false
      this.dispatchdialogVisible = true
      this.dataForm = Object.assign({}, row)
      this.checkId = this.dataForm.id
      this.dataForm.requireIdd = this.dataForm.orderId
      // await this.getLineByStation2(this.dataForm.stationId)
      //  console.log(this.dataForm.tgId)
      const params = new URLSearchParams()
      params.append('orderId', this.dataForm.orderId)
      getRecallOrderDispatchInfo(params).then(response => {
        console.log('t退单界面获取的信息为：')
        console.log(response.data.data)
        this.didpatchDataForm = response.data.data
        var date = new Date()
        // alert(date)
        // console.log(date.replaceAll('T', ' '))
        this.didpatchDataForm.handleTime1 = date
        // this.didpatchDataForm.handleTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate()) + ' ' + (date.getHours()) + ':' + (date.getMinutes()) + ':' + (date.getSeconds())
      })
      this.$forceUpdate()
      this.getTgInfo2(this.dataForm.lineId)
      this.$forceUpdate()
    },
    // 处理开工
    handleStartWork: function(row) {
      this.isRecall = false
      this.activeNames = []
      this.activeNames = ['3', '4']
      this.isEquipment = false
      this.isAdd = false
      this.isStartWork = true
      this.isFinishWork = false
      this.isArrive = false
      this.isHandleAgain = false
      this.handleDispatchDialogVisible = true
      this.dataForm = Object.assign({}, row)
      this.checkId = this.dataForm.id
      this.handleDataForm.requireIdd = this.dataForm.orderId
      // await this.getLineByStation2(this.dataForm.stationId)
      //  console.log(this.dataForm.tgId)
      const params = new URLSearchParams()
      params.append('orderId', this.dataForm.orderId)
      getOrderAcceptDispatchInfo(params).then(response => {
        console.log('t回复界面获取的信息为：')
        console.log(response.data.data)
        this.didpatchDataForm = response.data.data
        var date = new Date()
        // alert(date)
        // console.log(date.replaceAll('T', ' '))
        this.didpatchDataForm.handleTime1 = date
        // this.didpatchDataForm.handleTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate()) + ' ' + (date.getHours()) + ':' + (date.getMinutes()) + ':' + (date.getSeconds())
      })
      const params2 = new URLSearchParams()
      params2.append('orderId', this.dataForm.orderId)
      getOrderHandleInfoOne(params2).then(response => {
        console.log('回复界面获取的处理信息为：')
        console.log(response.data.data)
        this.handleDataForm = response.data.data
      })
      this.$forceUpdate()
      this.getTgInfo2(this.dataForm.lineId)
      this.$forceUpdate()
    },
    // 处理完工操作
    handleFinishWork: function(row) {
      this.isRecall = false
      this.activeNames = []
      this.activeNames = ['4', '5']
      this.isEquipment = false
      this.isAdd = false
      this.isStartWork = false
      this.isFinishWork = true
      this.isArrive = false
      this.isHandleAgain = false
      this.handleDispatchDialogVisible = true
      this.dataForm = Object.assign({}, row)
      this.checkId = this.dataForm.id
      this.handleDataForm.requireIdd = this.dataForm.orderId
      // await this.getLineByStation2(this.dataForm.stationId)
      //  console.log(this.dataForm.tgId)
      const params = new URLSearchParams()
      params.append('orderId', this.dataForm.orderId)
      getOrderAcceptDispatchInfo(params).then(response => {
        console.log('t回复界面获取的派单信息为：')
        console.log(response.data.data)
        this.didpatchDataForm = response.data.data
        var date = new Date()
        // alert(date)
        // console.log(date.replaceAll('T', ' '))
        this.didpatchDataForm.handleTime1 = date
        // this.didpatchDataForm.handleTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate()) + ' ' + (date.getHours()) + ':' + (date.getMinutes()) + ':' + (date.getSeconds())
      })
      const params2 = new URLSearchParams()
      params2.append('orderId', this.dataForm.orderId)
      getOrderHandleInfoOne(params2).then(response => {
        console.log('回复界面获取的处理信息为：')
        console.log(response.data.data)
        this.handleDataForm = response.data.data
        var that = this
        var List
        if (this.handleDataForm.workerPhoto === '') {
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
        var List2
        if (this.handleDataForm.workBeforePhoto === '') {
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
        console.log('复勘界面获取的图片fileList1：')
        console.log(this.handleDataForm.fileList)
        console.log('复勘界面获取的图片fileList2：')
        console.log(this.handleDataForm.fileList2)
      })
      this.$forceUpdate()
      this.getTgInfo2(this.dataForm.lineId)
      this.$forceUpdate()
    },
    // 处理到达现场
    handleArrive: function(row) {
      this.isRecall = false
      this.isEquipment = false
      this.isAdd = false
      this.isArrive = true
      this.isStartWork = false
      this.isFinishWork = false
      this.isHandleAgain = false
      this.handleDispatchDialogVisible = true
      this.dataForm = Object.assign({}, row)
      this.checkId = this.dataForm.id
      this.handleDataForm.requireIdd = this.dataForm.orderId
      // await this.getLineByStation2(this.dataForm.stationId)
      //  console.log(this.dataForm.tgId)
      const params = new URLSearchParams()
      params.append('orderId', this.dataForm.orderId)
      getOrderAcceptDispatchInfo(params).then(response => {
        console.log('回复界面获取的派单信息为：')
        console.log(response.data.data)
        this.didpatchDataForm = response.data.data
        var date = new Date()
        // alert(date)
        // console.log(date.replaceAll('T', ' '))
        this.didpatchDataForm.handleTime1 = date
        // this.didpatchDataForm.handleTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate()) + ' ' + (date.getHours()) + ':' + (date.getMinutes()) + ':' + (date.getSeconds())
      })
      const params2 = new URLSearchParams()
      params2.append('orderId', this.dataForm.orderId)
      getOrderHandleInfoOne(params2).then(response => {
        console.log('回复界面获取的处理信息为：')
        console.log(response.data.data)
        this.handleDataForm = response.data.data
      })
      this.$forceUpdate()
      this.getTgInfo2(this.dataForm.lineId)
      this.$forceUpdate()
    },
    // 装备领取界面界面
    handleEquipment: function(row) {
      this.isEquipment = true
      this.isRecall = false
      this.isStartWork = false
      this.isFinishWork = false
      this.isAdd = false
      this.isArrive = false
      this.equipmentDialogVisible = true
      this.isHandleAgain = false
      this.handleDataForm = {
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
        multiPhoto: '',
        watchResult: '',
        mode: [],
        pickList: [],
        fileList: []
      }
      this.dataForm = Object.assign({}, row)
      this.handleDataForm.orderId = this.dataForm.orderId
      // await this.getLineByStation2(this.dataForm.stationId)
      console.log('装备领取界面的信息：')
      console.log(this.handleDataForm)
      this.$forceUpdate()
      this.getType()
      this.getToolType()
      this.getWareInfo()
      this.$forceUpdate()
    },
    // 编辑界面
    handleEdit: async function(row) {
      this.isEquipment = true
      this.isRecall = false
      this.isAdd = false
      this.isStartWork = false
      this.isFinishWork = false
      this.isArrive = false
      this.dialogVisible = true
      this.isHandleAgain = false
      this.dataForm = Object.assign({}, row)
      console.log('编辑页面的id2:' + this.dataForm.id)
      this.checkId = this.dataForm.id
      // await this.getLineByStation2(this.dataForm.stationId)
      console.log(this.dataForm.tgId)
      this.$forceUpdate()
      await this.getTgInfo2(this.dataForm.lineId)
      this.$forceUpdate()
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    handleDelete: function(row) {
      const that = this
      this.$confirm('此操作将删除需求, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteWorkRequire(row.id).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.getWorkerOrderInfoByPage()
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
              that.getWorkerOrderInfoByPage()
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
    // eslint-disable-next-line no-dupe-keys
    recall: function() {
      if (this.isArrive) {
        this.$refs['handleDataForm'].resetFields()
        this.handleDispatchDialogVisible = false
      }
      if (this.isFinishWork) {
        this.$refs['handleDataForm'].resetFields()
        this.handleDispatchDialogVisible = false
        this.handleDataForm.fileList = []
        this.handleDataForm.fileList2 = []
        this.handleDataForm.fileList3 = []
      }
      if (this.isStartWork) {
        this.$refs['handleDataForm'].resetFields()
        this.handleDispatchDialogVisible = false
        this.handleDataForm.fileList = []
        this.handleDataForm.fileList2 = []
        this.handleDataForm.fileList3 = []
      }
      if (this.isHandleAgain) {
        this.$refs['handleDataForm'].resetFields()
        this.handleDispatchDialogVisible = false
        this.handleDataForm.fileList = []
        this.handleDataForm.fileList2 = []
        this.handleDataForm.fileList3 = []
      }
      if (this.isRecall) {
        this.$refs['didpatchDataForm'].resetFields()
        this.dispatchdialogVisible = false
      }
      if (this.isAdd) {
        this.$refs['dataForm'].resetFields()
        this.dialogVisible = false
      }
      if (this.isEquipment) {
        this.$refs['handleDataForm'].resetFields()
        this.equipmentDialogVisible = false
      }
    },
    submitEditForm: function() {
      if (this.isEquipment) {
        this.$refs['handleDataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              console.log(this.handleDataForm.toolOne)
              this.editLoading = true
              console.log(this.handleDataForm)
              this.handleDataForm.toolOne = this.handleDataForm.toolOne.toString()
              this.handleDataForm.toolTwo = this.handleDataForm.toolTwo.toString()
              this.handleDataForm.toolThree = this.handleDataForm.toolThree.toString()
              this.handleDataForm.toolFour = this.handleDataForm.toolFour.toString()
              this.handleDataForm.toolFive = this.handleDataForm.toolFive.toString()
              this.handleDataForm.toolSix = this.handleDataForm.toolSix.toString()
              this.handleDataForm.carNumber = this.handleDataForm.carNumber.toString()
              console.log(this.handleDataForm.toolOne)
              takeEquipment(this.handleDataForm).then((res) => {
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['handleDataForm'].resetFields()
                this.equipmentDialogVisible = false
                this.isEquipment = false
                this.getWorkerOrderInfoByPage()
              })
            })
          }
        })
      }
      if (this.isRecall) {
        this.$refs['didpatchDataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交退单信息吗？', '提示', {}).then(() => {
              this.editLoading = true
              console.log('派单提交是的数据')
              console.log(this.dataForm)
              console.log('派单提交是的数据')
              console.log(this.dataForm)
              this.didpatchDataForm.orderId = this.dataForm.orderId
              recallOrderDispatch(this.didpatchDataForm).then((res) => {
                if (res.data.code === 200) {
                  this.$message({ message: '退单成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['didpatchDataForm'].resetFields()
                this.dispatchdialogVisible = false
                this.isRecall = false
                this.getWorkerOrderInfoByPage()
              })
            })
          }
        })
      }
      if (this.isAdd) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              console.log(this.dataForm)
              addWorkRequire(this.dataForm).then((res) => {
                this.editLoading = true
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.isAdd = false
                this.getWorkerOrderInfoByPage()
              })
            })
          }
        })
      }
      if (this.isArrive) {
        this.$refs['handleDataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              console.log('提交的信息（处理）')
              console.log(this.handleDataForm)
              updateOrderArriveHandleInfo(this.handleDataForm).then((res) => {
                this.editLoading = true
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['handleDataForm'].resetFields()
                this.handleDispatchDialogVisible = false
                this.isArrive = false
                this.getWorkerOrderInfoByPage()
              })
            })
          }
        })
      }
      if (this.isStartWork) {
        this.$refs['handleDataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              console.log('提交的信息（处理）')
              console.log(this.handleDataForm)
              this.handleDataForm.workerPhoto = null
              this.handleDataForm.workBeforePhoto = null
              const that = this
              // 把相应的工作人员的照片的照片存入相应的字段之中
              var a = this.handleDataForm.fileList
              if (a.length === 0) {
                this.handleDataForm.workerPhoto = ''
              } else {
                a.forEach(function(value, key, arr) {
                  console.log(key)
                  console.log(arr[key].value)
                  if (that.handleDataForm.workerPhoto === null) {
                    that.handleDataForm.workerPhoto = arr[key].url
                  } else {
                    that.handleDataForm.workerPhoto = that.handleDataForm.workerPhoto + '#' + arr[key].url
                  }
                })
              }
              // 把相应的作业前的照片存入相应的字段之中
              var b = this.handleDataForm.fileList2
              if (b.length === 0) {
                this.handleDataForm.workBeforePhoto = ''
              } else {
                b.forEach(function(value, key, arr) {
                  console.log(key)
                  console.log(arr[key].value)
                  if (that.handleDataForm.workBeforePhoto === null) {
                    that.handleDataForm.workBeforePhoto = arr[key].url
                  } else {
                    that.handleDataForm.workBeforePhoto = that.handleDataForm.workBeforePhoto + '#' + arr[key].url
                  }
                })
              }
              console.log('workBrforePhoto的值为：')
              console.log(that.handleDataForm.workBeforePhoto)
              console.log('workerPhoto的值为：')
              console.log(that.handleDataForm.workerPhoto)
              console.log('提交的信息处理后（复勘）')
              console.log(this.handleDataForm)
              updateOrderStartWorkHandleInfo(this.handleDataForm).then((res) => {
                this.editLoading = true
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['handleDataForm'].resetFields()
                this.handleDispatchDialogVisible = false
                this.isStartWork = false
                this.getWorkerOrderInfoByPage()
              })
            })
          }
        })
      }
      if (this.isFinishWork) {
        this.$refs['handleDataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              console.log('提交的信息（完工）')
              console.log(this.handleDataForm)
              this.handleDataForm.workAfterPhoto = null
              const that = this
              // 把相应的工作人员的照片的照片存入相应的字段之中
              var a = this.handleDataForm.fileList3
              if (a.length === 0) {
                this.handleDataForm.workAfterPhoto = ''
              } else {
                a.forEach(function(value, key, arr) {
                  console.log(key)
                  console.log(arr[key].value)
                  if (that.handleDataForm.workAfterPhoto === null) {
                    that.handleDataForm.workAfterPhoto = arr[key].url
                  } else {
                    that.handleDataForm.workAfterPhoto = that.handleDataForm.workAfterPhoto + '#' + arr[key].url
                  }
                })
              }
              updateOrderFinishWorkHandleInfo(this.handleDataForm).then((res) => {
                this.editLoading = true
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['handleDataForm'].resetFields()
                this.handleDispatchDialogVisible = false
                this.isFinishWork = false
                this.getWorkerOrderInfoByPage()
              })
            })
          }
        })
      }
      if (this.isHandleAgain) {
        this.$refs['handleDataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              console.log('提交的信息前（复勘）')
              console.log(this.handleDataForm)
              this.handleDataForm.workAfterPhoto = null
              const that = this
              var a = this.handleDataForm.fileList3
              if (a.length === 0) {
                this.handleDataForm.workAfterPhoto = ''
              } else {
                a.forEach(function(value, key, arr) {
                  console.log(key)
                  console.log(arr[key].value)
                  if (that.handleDataForm.workAfterPhoto === null) {
                    that.handleDataForm.workAfterPhoto = arr[key].url
                  } else {
                    that.handleDataForm.workAfterPhoto = that.handleDataForm.workAfterPhoto + '#' + arr[key].url
                  }
                })
              }
              console.log('workAfterPhoto的值为：')
              console.log(that.handleDataForm.workAfterPhoto)
              console.log('提交的信息处理后（返工）')
              console.log(this.handleDataForm)
              updateOrderWorkAgainHandleInfo(this.handleDataForm).then((res) => {
                this.editLoading = true
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['handleDataForm'].resetFields()
                this.handleDispatchDialogVisible = false
                this.isHandleAgain = false
                this.getWorkerOrderInfoByPage()
              })
            })
          }
        })
      }
    }
  }
}
</script>
<style>
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    background-color: #97a8be10;
    width: 150px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
</style>
