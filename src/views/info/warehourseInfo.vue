<template>
  <div class="app-container">
    <el-row :gutter="12">
      <el-col :xs="24" :sm="24">
        <el-card class="user-center">
          <el-tabs v-model="activeName">
            <el-tab-pane label="库房基本信息"  name="first">
              <div class="user"   style="width: 95%">
                <el-form ref="warehourseInfo" :model="warehourseInfo" label-width="100px">
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="库房ID">
                        <el-input  :disabled="true"  class="rt-input" v-model="warehourseInfo.warehourseId" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="9">
                      <el-form-item label="库房名称">
                        <el-input :disabled="true" class="rt-input"  v-model="warehourseInfo.warehourseName" />
                      </el-form-item>
                    </el-col>
                    </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="所属单位">
                        <el-input  :disabled="true"  class="rt-input"  v-model="warehourseInfo.unitName" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="9">
                      <el-form-item label="所属班组">
                        <el-input  :disabled="true" class="rt-input"  v-model="warehourseInfo.teamName" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="库房地址">
                        <el-input  :disabled="true"  class="rt-input"  v-model="warehourseInfo.warehourseAddress" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="9">
                      <el-form-item label="库房创建时间">
                        <el-date-picker
                          class="rt-input"
                          :disabled="true"
                          v-model="warehourseInfo.createTime"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择库房创建时间时间"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="保管人">
                        <el-input :disabled="true" class="rt-input"  v-model="warehourseInfo.peopleName" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="9">
                      <el-form-item label="保管人电话">
                        <el-input :disabled="true" class="rt-input"  v-model="warehourseInfo.peopleTel" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="库房状态" prop="toolState">
                        <el-input   :disabled="true"  class="rt-input"  v-model="warehourseInfo.warehourseState"  />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-form-item label="备注" prop="toolNote" >
                      <el-input    maxlength="256"  show-word-limit rows=5 v-bind:disabled="true" type="textarea" style="color: #2C7BFB" v-model="warehourseInfo.warehourseNote" placeholder="请输入备注" />
                    </el-form-item>
                  </el-row>
                </el-form>
              </div>

            </el-tab-pane>
            <el-tab-pane label="库房装备详情"  name="second">
              <div>
                <el-collapse v-model="activeNames">
                  <el-collapse-item title="工具信息" name="1">
                    <el-row>
                      <el-col :span="12"><div id="show1" style="width: 700px;height: 400px"></div></el-col>
                      <el-col :span="12"><div id="pie1" style="width: 700px;height: 400px;alignment: center"></div></el-col>
                    </el-row>
                  </el-collapse-item>
                  <el-collapse-item title="车辆信息" name="2">
                    <el-row>
                      <el-col :span="12"><div id="show2" style="width: 700px;height: 400px"></div></el-col>
                      <el-col :span="12"><div id="pie2" style="width: 700px;height: 400px;alignment: center"></div></el-col>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>

import { getUserInfo, updatePass, resetEmail, updateEmail } from '@/api/user'
import { getWareInfo, getFullWareInfo, getSingleWareInfo, updateWareHourse, deleteWareHourse, deleteBatchWareHourse, addWareHourse } from '@/api/warehourse'
import * as echarts from 'echarts'
import { getAcceptOrRecallInfo, getAcceptOrRecallInfoForChart, getEquipmentInfoInWareHourseForChart } from '@/api/eCharts'
export default {
  name: 'Index',
  // eslint-disable-next-line vue/no-unused-components
  data() {
    return {
      tableData: [],
      warehourseParams: this.$route.params.id,
      warehourseInfo: {
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
        warehourseNote: '',
        warehourseAddress: '',
        warehourseState: ''
      },
      formLabelWidth: '120px',
      user: {
        avatar: '',
        username: '',
        phone: 0,
        email: '',
        deptName: '',
        jobName: '',
        createTime: ''
      },
      activeName: 'first',
      activeNames: ['1', '2', '3', '4'],
      passForm: {
        oldPass: '',
        newPass: '',
        checkPass: ''
      },
      buttonName: '发送验证码',
      isDisabled: false,
      codeLoading: false,
      time: 60
    }
  },
  computed: {
    avatar() {
      return require(`@/assets/avatar/c7c4ee7be3eb4e73a19887dc713505145.jpg`)
    }
  },
  created() {
    this.findUserInfo()
    this.getSingleWareInfo()
  },
  mounted() {
    // 工具的饼状图
    var chartDom = document.getElementById('pie1')
    var myChart = echarts.init(chartDom)
    var option = {
      title: {
        text: '库房内工具数量',
        // subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}:{c}({d}%)'
      },
      series: [
        {
          name: '工具详情',
          type: 'pie',
          radius: '50%',
          data: [
            { value: '', name: '绝缘紧线器' },
            { value: '', name: '绝缘杆' },
            { value: '', name: '绝缘钳' },
            { value: '', name: '防护手套' },
            { value: '', name: '防护靴' }
          ],
          // label: {
          //   show: true,
          //   formatter: '{b}:{c}' + '\n\r' + '({d}%)' },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ],
      legend: {
        orient: 'vertical',
        left: 'left',
        selected: {
          // 选中'系列1',如果数量为0则默认是不选中
          '绝缘紧线器': true,
          // 不选中'系列2'
          '绝缘杆': true,
          '绝缘钳': true,
          '防护手套': true,
          '防护靴': true
          //
          // '绝缘紧线器': option.series[0].data[0].value !== 0,
          // // 不选中'系列2'
          // '绝缘杆': option.series[0].data[1].value !== 0,
          // '绝缘钳': option.series[0].data[2].value !== 0,
          // '防护手套': option.series[0].data[3].value !== 0,
          // '防护靴': option.series[0].data[4].value !== 0
        }
      }
    }
    // 工具的折线图
    var app = {}
    var chartDom2 = document.getElementById('show1')
    var myChart2 = echarts.init(chartDom2)
    var option2

    const posList = [
      'left',
      'right',
      'top',
      'bottom',
      'inside',
      'insideTop',
      'insideLeft',
      'insideRight',
      'insideBottom',
      'insideTopLeft',
      'insideTopRight',
      'insideBottomLeft',
      'insideBottomRight'
    ]
    app.configParameters = {
      rotate: {
        min: -90,
        max: 150
      },
      align: {
        options: {
          left: 'left',
          center: 'center',
          right: 'right'
        }
      },
      verticalAlign: {
        options: {
          top: 'top',
          middle: 'middle',
          bottom: 'bottom'
        }
      },
      position: {
        options: posList.reduce(function(map, pos) {
          map[pos] = pos
          return map
        }, {})
      },
      distance: {
        min: 0,
        max: 100
      }
    }
    app.config = {
      rotate: 90,
      align: 'left',
      verticalAlign: 'middle',
      position: 'insideBottom',
      distance: 15,
      onChange: function() {
        const labelOption = {
          rotate: app.config.rotate,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          position: app.config.position,
          distance: app.config.distance
        }
        myChart2.setOption({
          series: [
            {
              label: labelOption
            },
            {
              label: labelOption
            },
            {
              label: labelOption
            },
            {
              label: labelOption
            }
          ]
        })
      }
    }
    const labelOption = {
      show: true,
      position: app.config.position,
      distance: app.config.distance,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      rotate: app.config.rotate,
      formatter: '{c} ',
      fontSize: 18,
      rich: {
        name: {}
      }
    }
    option2 = {
      title: {
        text: '库房内工具情况',
        left: 'top'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['空闲中', '使用中']
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['第一季度', '第二季度', '第三季度', '第四季度']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '空闲中',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: []
        },
        {
          name: '使用中',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: []
        }
      ]
    }

    // 车辆的饼状图

    var chartDom4 = document.getElementById('pie2')
    var myChart4 = echarts.init(chartDom4)
    var option4 = {
      title: {
        text: '库房内车辆数量',
        // subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}:{c}({d}%)'
      },
      series: [
        {
          name: '车辆详情',
          type: 'pie',
          radius: '50%',
          data: [
            { value: '', name: '翻斗车' },
            { value: '', name: '吊车' },
            { value: '', name: '曲臂作业车' },
            { value: '', name: '高空作业车' },
            { value: '', name: '轨道行走作业车' }
          ],
          // label: {
          //   show: true,
          //   formatter: '{b}:{c}' + '\n\r' + '({d}%)' },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ],
      legend: {
        orient: 'vertical',
        left: 'left',
        selected: {
          // 选中'系列1',如果数量为0则默认是不选中
          '翻斗车': true,
          // 不选中'系列2'
          '吊车': true,
          '曲臂作业车': true,
          '高空作业车': true,
          '轨道行走作业车': true
          //
          // '绝缘紧线器': option.series[0].data[0].value !== 0,
          // // 不选中'系列2'
          // '绝缘杆': option.series[0].data[1].value !== 0,
          // '绝缘钳': option.series[0].data[2].value !== 0,
          // '防护手套': option.series[0].data[3].value !== 0,
          // '防护靴': option.series[0].data[4].value !== 0
        }
      }
    }
    // 车辆的折线图
    var app3 = {}
    var chartDom3 = document.getElementById('show2')
    var myChart3 = echarts.init(chartDom3)
    var option3

    const posList3 = [
      'left',
      'right',
      'top',
      'bottom',
      'inside',
      'insideTop',
      'insideLeft',
      'insideRight',
      'insideBottom',
      'insideTopLeft',
      'insideTopRight',
      'insideBottomLeft',
      'insideBottomRight'
    ]
    app3.configParameters = {
      rotate: {
        min: -90,
        max: 150
      },
      align: {
        options: {
          left: 'left',
          center: 'center',
          right: 'right'
        }
      },
      verticalAlign: {
        options: {
          top: 'top',
          middle: 'middle',
          bottom: 'bottom'
        }
      },
      position: {
        options: posList.reduce(function(map, pos) {
          map[pos] = pos
          return map
        }, {})
      },
      distance: {
        min: 0,
        max: 100
      }
    }
    app3.config = {
      rotate: 90,
      align: 'left',
      verticalAlign: 'middle',
      position: 'insideBottom',
      distance: 15,
      onChange: function() {
        const labelOption3 = {
          rotate: app.config.rotate,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          position: app.config.position,
          distance: app.config.distance
        }
        myChart3.setOption({
          series: [
            {
              label: labelOption3
            },
            {
              label: labelOption3
            },
            {
              label: labelOption3
            },
            {
              label: labelOption3
            }
          ]
        })
      }
    }
    const labelOption3 = {
      show: true,
      position: app3.config.position,
      distance: app3.config.distance,
      align: app3.config.align,
      verticalAlign: app3.config.verticalAlign,
      rotate: app3.config.rotate,
      formatter: '{c} ',
      fontSize: 18,
      rich: {
        name: {}
      }
    }
    option3 = {
      title: {
        text: '库房内车辆情况',
        left: 'top'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['空闲中', '使用中']
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['第一季度', '第二季度', '第三季度', '第四季度']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '空闲中',
          type: 'bar',
          barGap: 0,
          label: labelOption3,
          emphasis: {
            focus: 'series'
          },
          data: []
        },
        {
          name: '使用中',
          type: 'bar',
          label: labelOption3,
          emphasis: {
            focus: 'series'
          },
          data: []
        }
      ]
    }
    getUserInfo().then((res) => {
      console.log(res.data.data)
      this.user = res.data.data
      const params = new URLSearchParams()
      params.append('warehourseId', this.warehourseParams)
      getEquipmentInfoInWareHourseForChart(params).then(response => {
        // 库房内工具的情况
        option2.xAxis[0].data = response.data.data[0]// 工具种类
        option2.series[0].data = response.data.data[1] // 空闲工具数量
        option2.series[1].data = response.data.data[2] // 使用工具数量
        // 库房内车辆的情况
        option3.xAxis[0].data = response.data.data[4]// 工具种类
        option3.series[0].data = response.data.data[5] // 空闲工具数量
        option3.series[1].data = response.data.data[6] // 使用工具数量
        // option2.series[1].data = response.data.data[1]
        // option2.series[2].data = response.data.data[2]
        // option2.series[3].data = response.data.data[3]
        myChart2.setOption(option2)
        myChart3.setOption(option3)
        // 设置工具的饼状图
        option.series[0].data[0].value = response.data.data[3][0]
        if (option.series[0].data[0].value === '0') {
          option.legend.selected.绝缘紧线器 = false
          option.series[0].data[0] = null
        }
        option.series[0].data[1].value = response.data.data[3][1]
        if (option.series[0].data[1].value === '0') {
          option.legend.selected.绝缘杆 = false
          option.series[0].data[1] = null
        }
        option.series[0].data[2].value = response.data.data[3][2]
        if (option.series[0].data[2].value === '0') {
          option.legend.selected.绝缘钳 = false
          option.series[0].data[2] = null
        }
        option.series[0].data[3].value = response.data.data[3][3]
        if (option.series[0].data[3].value === '0') {
          option.legend.selected.防护手套 = false
          option.series[0].data[3] = null
        }
        option.series[0].data[4].value = response.data.data[3][4]
        if (option.series[0].data[4].value === '0') {
          option.legend.selected.防护靴 = false
          option.series[0].data[4] = null
        }
        myChart.setOption(option)
        // 设置车辆的饼状图
        option4.series[0].data[0].value = response.data.data[7][0]
        if (option4.series[0].data[0].value === '0') {
          // option4.legend.selected.绝缘紧线器 = false
          option4.series[0].data[0] = null
        }
        option4.series[0].data[1].value = response.data.data[7][1]
        if (option4.series[0].data[1].value === '0') {
          // option4.legend.selected.绝缘杆 = false
          option4.series[0].data[1] = null
        }
        option4.series[0].data[2].value = response.data.data[7][2]
        if (option4.series[0].data[2].value === '0') {
          // option4.legend.selected.绝缘钳 = false
          option4.series[0].data[2] = null
        }
        option4.series[0].data[3].value = response.data.data[7][3]
        if (option4.series[0].data[3].value === '0') {
          // option4.legend.selected.防护手套 = false
          option4.series[0].data[3] = null
        }
        option4.series[0].data[4].value = response.data.data[7][4]
        if (option4.series[0].data[4].value === '0') {
          // option4.legend.selected.防护靴 = false
          option4.series[0].data[4] = null
        }
        myChart4.setOption(option4)
        this.$forceUpdate()
      })
    })
  },
  methods: {
    // parseTime,
    // formatEmail(mail) {
    //   return regEmail(mail)
    // },
    // 加载工具的信息
    getSingleWareInfo: function() {
      const params = new URLSearchParams()
      params.append('warehourseId', this.warehourseParams)
      getSingleWareInfo(params).then((res) => {
        this.tableData = res.data.data
        this.warehourseInfo = this.tableData
        if (this.warehourseInfo.warehourseState === 0) {
          this.warehourseInfo.warehourseState = '正常'
        } else {
          this.warehourseInfo.warehourseState = '停用'
        }
        console.log('表格获取的数据')
        console.log(this.tableData)
        console.log(this.warehourseInfo)
      })
    },
    // 加载用户个人信息
    findUserInfo: function() {
      getUserInfo().then((res) => {
        this.user = res.data.data
        const a = this.user.avatar
        this.$store.dispatch('setUseradvatar', a)
      })
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
