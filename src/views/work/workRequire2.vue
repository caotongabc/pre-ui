<template xmlns:font-color="http://www.w3.org/1999/xhtml">
  <div class="app-container" style="min-height: 100%">
    <!-- 查询和其他操作 -->
    <div class="filter-container" style="margin: 10px 0 10px 0; min-height: 70%">
      <el-form style="align:right" :inline="false">
        <el-row>
          <el-col :span="5" style="text-align: right">
            <label>需求编号：</label>
            <el-input
              v-model="query.requireId"
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
            <el-select v-model="query.requireStatus" filterable clearable placeholder="请选择" style="width: 200px;margin-right: 15px">
              <el-option value="0">待提交</el-option>
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
            <label style="width: 40px;text-align: right">申请单位：</label>
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
            <label style="width: 40px;text-align: right">申请人：</label>
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
            <label style="margin-left: 38px">申请时间：</label>
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
      <el-table-column label="需求编号" width="160" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <!--          <span>{{ scope.row.requireId }}</span>-->
          <span style="color: #2C7BFB ;cursor: pointer" @click="goDetail(scope.row.requireId)">{{ scope.row.requireId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="需求状态" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.requireStatus === 0" size="small" type="info">待提交</el-tag>
            <el-tag v-else-if="scope.row.requireStatus=== 1" size="small" type="info">待派单</el-tag>
            <el-tag v-else-if="scope.row.requireStatus=== 2" size="small" type="info">待接单</el-tag>
            <el-tag v-else-if="scope.row.requireStatus=== 3" size="small" type="info">待回复</el-tag>
            <el-tag v-else-if="scope.row.requireStatus=== 4" size="small" type="info">已退单</el-tag>
            <el-tag v-else-if="scope.row.requireStatus=== 5" size="small" type="info">待审核</el-tag>
            <el-tag v-else-if="scope.row.requireStatus=== 6" size="small" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.requireStatus=== 7" size="small" type="danger">审核不通过</el-tag>
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
      <el-table-column label="申请单位" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.unitName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.applyPeople }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人电话" width="120" align="center" sortable prop="toolName">
        <template slot-scope="scope">
          <span>{{ scope.row.applyPeopletel }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="申请日期" width="200" align="center" sortable prop="toolId">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.applyTime) }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="操作" fixed="right" min-width="150" align="center">
        <template slot-scope="scope">
          <el-button v-if=" scope.row.requireStatus === 2 && (RoleSrting.indexOf('5') !== -1 ||RoleSrting.indexOf('4') !== -1)" type="text" icon="el-icon-edit" style="cursor: pointer" @click="handleAcceptDispatch(scope.row)">接单</el-button>
          <el-button v-if=" scope.row.requireStatus === 2 && (RoleSrting.indexOf('5') !== -1 ||RoleSrting.indexOf('4') !== -1)" type="text" icon="el-icon-edit" style="cursor: pointer" @click="handleRecallDispatch(scope.row)">退单</el-button>
          <el-button v-if=" scope.row.requireStatus === 0 && RoleSrting.indexOf('5') !== -1" type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button v-if=" scope.row.requireStatus === 3 && (RoleSrting.indexOf('5') !== -1 ||RoleSrting.indexOf('4') !== -1)" type="text" icon="el-icon-edit" style="cursor: pointer" @click="handleDispatch(scope.row)">回复</el-button>
          <el-button v-if=" scope.row.requireStatus === 7 && (RoleSrting.indexOf('5') !== -1 ||RoleSrting.indexOf('4') !== -1)" type="text" icon="el-icon-edit" style="cursor: pointer" @click="handleWatchAgainDispatch(scope.row)">复勘</el-button>
          <el-button v-if=" scope.row.requireStatus === 0 && RoleSrting.indexOf('5') !== -1" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
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
            <el-form-item label="需求编号" prop="requireId" :label-width="formLabelWidth">
              <el-input v-model="dataForm.requireId" :disabled="true" placeholder="请输入工具编号" />
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
                  <el-input v-model="dataForm.workContent" maxlength="256" :disabled="true" show-word-limit rows="5" type="textarea" placeholder="请输入作业内容" />
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
                  <el-select v-model="didpatchDataForm.manageNameReall" :disabled="true" clearable placeholder="请选择" @change="peopleCurrentChangeHandle2">
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
    <!-- 回复处理界面 -->
    <el-dialog
      :title="!handleDataForm.id ? '复勘' : '回复'"
      :fullscreen="true"
      :visible.sync="handleDispatchDialogVisible"
      :close-on-click-modal="false"
    >
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基本信息" name="4">
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
                  <el-input v-model="dataForm.workContent" maxlength="256" :disabled="true" show-word-limit rows="5" type="textarea" placeholder="请输入作业内容" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="勘探信息" name="4">
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
                  <el-select v-model="didpatchDataForm.manageNameReall" :disabled="true" clearable placeholder="请选择" @change="peopleCurrentChangeHandle2">
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
                <el-form-item label="勘察开始时间" prop="watchStartTime" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model="handleDataForm.watchStartTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择勘察开始时间"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="勘察结束时间" prop="watchEndTime" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model="handleDataForm.watchEndTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择勘察结束时间"
                    :picker-options="editStopOptions"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="作业条件" prop="workCondition" :label-width="formLabelWidth">
                  <el-input v-model="handleDataForm.workCondition" maxlength="256" show-word-limit rows="5" type="textarea" placeholder="请输入作业内容" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="作业环境" prop="workEnvironment" :label-width="formLabelWidth">
                  <el-input v-model="handleDataForm.workEnvironment" maxlength="256" show-word-limit rows="5" type="textarea" placeholder="请输入作业内容" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="危险事项" prop="dangerPoint" :label-width="formLabelWidth">
                  <el-input v-model="handleDataForm.dangerPoint" maxlength="256" show-word-limit rows="5" type="textarea" placeholder="请输入作业内容" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="安全措施" prop="safeMeasures" :label-width="formLabelWidth">
                  <el-input v-model="handleDataForm.safeMeasures" maxlength="256" show-word-limit rows="5" type="textarea" placeholder="请输入作业内容" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="勘察结果" prop="watchResult" :label-width="formLabelWidth">
                  <el-select v-model="handleDataForm.watchResult" clearable placeholder="请选择" @click.native="getProjectType">
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
                <el-form-item label="现场图片" prop="livePhoto" :label-width="formLabelWidth">
                  <el-upload
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
      <span slot="footer" class="dialog-footer">
        <el-button :size="size" @click="recall">取消</el-button>
        <el-button :size="size" type="primary" :loading="editLoading" @click="submitEditForm">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, addCourse, updateCourse, deleteCourse, deleteBatchCourse, fetchOrderList, getToolDetailWarnInfo, isExistToolId } from '@/api/tool'
import { parseTime } from '@/utils/index'
import { getDept, getDeptArray, getLowDept } from '@/api/dept'
import { getType } from '@/api/interface'
import initDict from '@/mixins/initDict'
import { getUserInfo } from '@/api/user'
import { getTeamByUnit } from '@/api/team'
import { getWareInfo } from '@/api/warehourse'
import { getFullWarnStrategyInfo, getOneWarnStrategyInfo } from '@/api/warnStrategy'
import moment from 'moment'
import { getWorkRequireInfoByPage, getWorkerRequireInfoByPage, submitList, recallList, updateWorkRequire, addWorkRequire, deleteWorkRequire, addFeedBackInfo, updateFeedBackInfo, getHandleInfoOne } from '@/api/workRequire'
import { uploadpciture, uploadRequirePciture } from '@/api/file'
import { getStationInfo } from '@/api/station'
import { getLineInfo } from '@/api/line'
import { getTgInfo } from '@/api/tg'
import { getUserInfoList } from '@/api/user'
import { addRequireDispatchInfo, acceptDispath, recallDispatch, getRecallDispatchInfo, getAcceptDispatchInfo } from '@/api/dispatch'

export default {
  mixins: [initDict],
  data() {
    return {
      activeNames: ['1', '2', '3'],
      checkId: null,
      showText: '展开收索',
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
        requireId: '',
        projectName: '',
        requireStatus: '',
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
      isAdd: false,
      isDispatch: false,
      isHandle: false,
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
      userInfo2: [],
      unitID: 5,
      toolTypesOptions: [],
      projectTypeOptions: [],
      requireTypeOptions: [],
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
        multiPhoto: '',
        watchResult: '',
        mode: [],
        pickList: [],
        fileList: []
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
        requireId: [{ required: true, message: '需求编号不能为空', trigger: 'blur' }],
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
      editStopOptions: {
        disabledDate: time => {
          return (
            time.getTime() < new Date(this.handleDataForm.watchStartTime) ||
            time.getTime() < new Date(1970 - 1 - 1).getTime() // 禁止选择1970年以前的日期
          )
        }
      },
      loading: false,
      dialogImageUrl: '',
      dialogVisible2: false,
      dialogVisible: false,
      dispatchdialogVisible: false,
      handleDispatchDialogVisible: false,
      editLoading: false

    }
  },
  created() {
    // 加载数据字典
    this.getUserInfo()
    this.findDeptTree()
    this.$forceUpdate()
  },
  methods: {
    parseTime,
    // 详情处理事件
    goDetail: function(id) {
      this.$router.push({ name: '需求详情', params: { id }})
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
        if (that.handleDataForm.picList === null) {
          that.handleDataForm.picList = []
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
    // 处理复勘的信息
    handleWatchAgainDispatch: function(row) {
      this.isDispatch = false
      this.isEditForm = false
      this.isAdd = false
      this.isHandleAgain = true
      this.handleDispatchDialogVisible = true
      this.dataForm = Object.assign({}, row)
      this.checkId = this.dataForm.id
      this.handleDataForm.requireIdd = this.dataForm.requireId
      this.dataForm.auditPeople = this.userInfo.username
      // await this.getLineByStation2(this.dataForm.stationId)
      //  console.log(this.dataForm.tgId)
      const params = new URLSearchParams()
      params.append('requireId', this.dataForm.requireId)
      getAcceptDispatchInfo(params).then(response => {
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
      params1.append('requireId', this.dataForm.requireId)
      getHandleInfoOne(params1).then(response => {
        console.log('t回复界面获取的回复信息为：')
        console.log(response.data.data)
        this.handleDataForm = response.data.data
        // this.handleDataForm.fileList.push({ key: uid, value: response.data.data })
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
        const a = this.userInfo.avatar
        this.$store.dispatch('setUseradvatar', a)
        this.$forceUpdate()
        this.getDeptChilren()
        this.getStationChilren()
        this.getCourseList()
      })
    },
    getCourseList: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      // alert(this.userId)
      params.append('manage', this.userId)
      getWorkerRequireInfoByPage(params).then(response => {
        this.loading = false
        this.tableData = response.data.data.records
        this.total = response.data.data.total
      })
    },
    // 获取需求信息并分页显示（待条件的查询）
    getWorkerRequireInfoByPage: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      params.append('requireId', this.query.requireId)
      params.append('projectName', this.query.projectName)
      params.append('projectType', this.query.projectType)
      params.append('requireStatus', this.query.requireStatus)
      params.append('requireType', this.query.requireType)
      params.append('stationId', this.query.stationId)
      params.append('lineId', this.query.lineId)
      params.append('tgId', this.query.tgId)
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
      getWorkerRequireInfoByPage(params).then(response => {
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
      this.getWorkerRequireInfoByPage()
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
              that.getWorkerRequireInfoByPage()
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
              that.getWorkerRequireInfoByPage()
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
        requireId: '',
        projectName: '',
        requireStatus: '',
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
      this.getWorkerRequireInfoByPage()
    },
    // 换页
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.getWorkerRequireInfoByPage()
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
      this.isEditForm = false
      this.isDispatch = false
      this.isHandle = false
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
      this.dataForm.requireId = num
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
      this.$confirm('此操作进行接单,接单之后不可取消是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // alert(row.requireId)
          acceptDispath(row.requireId).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.getWorkerRequireInfoByPage()
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
      this.isDispatch = true
      this.isEditForm = false
      this.isAdd = false
      this.isHandle = false
      this.isHandleAgain = false
      this.dispatchdialogVisible = true
      this.dataForm = Object.assign({}, row)
      this.checkId = this.dataForm.id
      this.dataForm.requireIdd = this.dataForm.requireId
      // await this.getLineByStation2(this.dataForm.stationId)
      //  console.log(this.dataForm.tgId)
      const params = new URLSearchParams()
      params.append('requireId', this.dataForm.requireId)
      getRecallDispatchInfo(params).then(response => {
        console.log('t退单界面获取的信息为：')
        console.log(response.data.data)
        this.didpatchDataForm = response.data.data
        this.handleDataForm = response.data.data
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
    // 处理回复的信息
    handleDispatch: function(row) {
      this.isDispatch = false
      this.isEditForm = false
      this.isAdd = false
      this.isHandle = true
      this.isHandleAgain = false
      this.handleDispatchDialogVisible = true
      this.dataForm = Object.assign({}, row)
      this.checkId = this.dataForm.id
      this.handleDataForm.requireIdd = this.dataForm.requireId
      // await this.getLineByStation2(this.dataForm.stationId)
      //  console.log(this.dataForm.tgId)
      const params = new URLSearchParams()
      params.append('requireId', this.dataForm.requireId)
      getAcceptDispatchInfo(params).then(response => {
        console.log('t回复界面获取的信息为：')
        console.log(response.data.data)
        this.didpatchDataForm = response.data.data
        this.handleDataForm = response.data.data
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
    // 编辑界面
    handleEdit: async function(row) {
      this.isEditForm = true
      this.isDispatch = false
      this.isAdd = false
      this.isHandle = false
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
              that.getWorkerRequireInfoByPage()
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
              that.getWorkerRequireInfoByPage()
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
      if (this.isHandle) {
        this.$refs['handleDataForm'].resetFields()
        this.handleDispatchDialogVisible = false
      }
      if (this.isHandleAgain) {
        this.$refs['handleDataForm'].resetFields()
        this.handleDispatchDialogVisible = false
        this.handleDataForm = {} // 主要是把相应的图片的fileList置空
      }
      if (this.isDispatch) {
        this.$refs['didpatchDataForm'].resetFields()
        this.dispatchdialogVisible = false
      }
      if (this.isAdd) {
        this.$refs['dataForm'].resetFields()
        this.dialogVisible = false
      }
      if (this.isEditForm) {
        this.$refs['dataForm'].resetFields()
        this.dialogVisible = false
      }
    },
    submitEditForm: function() {
      if (this.isEditForm) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true
              updateWorkRequire(this.dataForm).then((res) => {
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.isEditForm = false
                this.getWorkerRequireInfoByPage()
              })
            })
          }
        })
      }
      if (this.isDispatch) {
        this.$refs['didpatchDataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交退单信息吗？', '提示', {}).then(() => {
              this.editLoading = true
              console.log('派单提交是的数据')
              console.log(this.dataForm)
              console.log('派单提交是的数据')
              console.log(this.dataForm)
              this.didpatchDataForm.requireId = this.dataForm.requireId
              recallDispatch(this.didpatchDataForm).then((res) => {
                if (res.data.code === 200) {
                  this.$message({ message: '退单成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['didpatchDataForm'].resetFields()
                this.dispatchdialogVisible = false
                this.isDispatch = false
                this.getWorkerRequireInfoByPage()
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
                this.getWorkerRequireInfoByPage()
              })
            })
          }
        })
      }
      if (this.isHandle) {
        this.$refs['handleDataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              console.log('提交的信息（处理）')
              console.log(this.handleDataForm)
              addFeedBackInfo(this.handleDataForm).then((res) => {
                this.editLoading = true
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['handleDataForm'].resetFields()
                this.handleDispatchDialogVisible = false
                this.isHandle = false
                this.getWorkerRequireInfoByPage()
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
              console.log('提交的信息处理后（复勘）')
              console.log(this.handleDataForm)
              updateFeedBackInfo(this.handleDataForm).then((res) => {
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
                this.getWorkerRequireInfoByPage()
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
