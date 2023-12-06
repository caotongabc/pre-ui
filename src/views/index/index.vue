<template>
  <div class="wel-contailer">
    <div class="banner-text" style="background-color: white">
<!--      显示的工作人员的详情（包括需求勘测，工单实施）-->
      <el-row v-show="RoleSrting.indexOf('5') !== -1|| RoleSrting.indexOf('4') !== -1" :gutter="4" style="margin-bottom: 35px;margin-top: 5px">

        <el-col :span="6">
          <el-card style="color: #00ccff">
            <div style="text-align: left;padding-left: 15px">年接单量</div>
            <div style="text-align: center" v-text="this.jiedanCoutByYear ? this.jiedanCoutByYear : '0'" />
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card style="color: #dd1100">
            <div style="text-align: left;padding-left: 15px">年退单量</div>
            <div style="text-align: center" v-text="this.tuidanCoutByYear ? this.tuidanCoutByYear : '0'" />
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card style="color: #00ccff">
            <div style="text-align: left;padding-left: 15px">月接单量</div>
            <div style="text-align: center" v-text="this.jiedanCoutByMonth ? this.jiedanCoutByMonth : '0'" />
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card style="color: #dd1100">
            <div style="text-align: left;padding-left: 15px">月退单量</div>
            <div style="text-align: center"><label v-text="this.tuidanCoutByMonth ? this.tuidanCoutByMonth : '0'" /></div>
          </el-card>
        </el-col>
      </el-row>
      <el-row v-show="RoleSrting.indexOf('5') !== -1|| RoleSrting.indexOf('4') !== -1" style="width: 100%">
        <el-col :span="12"><div id="show" style="width: 700px;height: 450px;alignment: center" /></el-col>
        <el-col :span="12"><div id="pie" style="width: 700px;height: 450px;alignment: center" /></el-col>
      </el-row>
      <!--      显示的作业管理人员的详情（包括需求新增，工单完成）-->
      <el-row v-show="RoleSrting.indexOf('5') !== -1|| RoleSrting.indexOf('6') !== -1" :gutter="4" style="margin-bottom: 35px;margin-top: 5px">

        <el-col :span="6">
          <el-card style="color: #00ccff">
            <div style="text-align: left;padding-left: 15px">年需求制订</div>
            <div style="text-align: center" v-text="this.requireCoutByYear ? this.requireCoutByYear : '0'" />
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card style="color: #dd1100">
            <div style="text-align: left;padding-left: 15px">年工单完成</div>
            <div style="text-align: center" v-text="this.orderCoutByYear ? this.orderCoutByYear : '0'" />
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card style="color: #00ccff">
            <div style="text-align: left;padding-left: 15px">月需求制订</div>
            <div style="text-align: center" v-text="this.requireCoutByMonth ? this.requireCoutByMonth : '0'" />
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card style="color: #dd1100">
            <div style="text-align: left;padding-left: 15px">月工单完成</div>
            <div style="text-align: center"><label v-text="this.orderCoutByMonth ? this.orderCoutByMonth : '0'" /></div>
          </el-card>
        </el-col>
      </el-row>
      <el-row v-show="RoleSrting.indexOf('5') !== -1|| RoleSrting.indexOf('6') !== -1" style="width: 100%">
        <el-col :span="12"><div id="show2" style="width: 700px;height: 450px;alignment: center" /></el-col>
        <el-col :span="12"><div id="pie2" style="width: 700px;height: 450px;alignment: center" /></el-col>
      </el-row>
      <!--      显示的仓库人员的详情（）-->
      <el-row v-show="RoleSrting.indexOf('5') !== -1|| RoleSrting.indexOf('17') !== -1" :gutter="4" style="margin-bottom: 35px;margin-top: 5px">

        <el-col :span="6">
          <el-card style="color: #00ccff">
            <div style="text-align: left;padding-left: 15px">年处理预警数</div>
            <div style="text-align: center" v-text="this.warnCoutByYear ? this.warnCoutByYear : '0'" />
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card style="color: #00ccff">
            <div style="text-align: left;padding-left: 15px">月处理预警数</div>
            <div style="text-align: center" v-text="this.warnCoutByMonth ? this.warnCoutByMonth : '0'" />
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card style="color: #dd1100">
            <div style="text-align: left;padding-left: 15px">工具待处理数</div>
            <div style="text-align: center" v-text="this.toolWarnCount ? this.toolWarnCount : '0'" />
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card style="color: #dd1100">
            <div style="text-align: left;padding-left: 15px">车辆待处理数</div>
            <div style="text-align: center"><label v-text="this.carWarnCount ? this.carWarnCount : '0'" /></div>
          </el-card>
        </el-col>
      </el-row>
      <el-row v-show="RoleSrting.indexOf('5') !== -1|| RoleSrting.indexOf('17') !== -1" style="width: 100%">
        <el-col :span="12"><div id="show3" style="width: 700px;height: 450px;alignment: center" /></el-col>
        <el-col :span="12"><div id="pie3" style="width: 700px;height: 450px;alignment: center" /></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { uploadAvator } from '@/api/file'
import { getAcceptOrRecallInfo, getAcceptOrRecallInfoForChart, getWorkManageInfoForIndex, getWorkManageInfoForChart, getEquipmentWarnInfoForIndex, getWarnInfoForChart } from '@/api/eCharts'

import * as echarts from 'echarts'
import { getUserInfo, editUser, updatePass, resetEmail, updateEmail, updateUserInfo } from '@/api/user'
export default {
  name: 'Index',
  data() {
    return {
      user: {
        avatar: '',
        username: '',
        multipartFile: '',
        phone: 0,
        email: '',
        deptName: '',
        jobName: '',
        deptId: '',
        userId: '',
        createTime: ''
      },
      RoleSrting: '',
      activeNames: ['1', '2', '3', '4'],
      DATA: [],
      text: '',
      actor: '',
      count: 0,
      jiedanCoutByYear: '',
      jiedanCoutByMonth: '',
      tuidanCoutByYear: '',
      tuidanCoutByMonth: '',
      requireCoutByYear: '',
      requireCoutByMonth: '',
      orderCoutByYear: '',
      orderCoutByMonth: '',
      warnCoutByYear: '',
      warnCoutByMonth: '',
      toolWarnCount: '',
      carWarnCount: '',
      isText: false
    }
  },
  computed: {
    avatar() {
      return require(`@/assets/avatar/20180414165754.jpg`)
    }
  },
  created() {
    this.findUserInfo()
  },
  mounted() {
    // 实施人员的信息（饼状）
    var chartDom = document.getElementById('pie')
    var myChart = echarts.init(chartDom)
    var option = {
      title: {
        text: '本月工作情况',
        // subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}:{c}({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '本月详情',
          type: 'pie',
          radius: '50%',
          data: [
            { value: '', name: '本月工单接单' },
            { value: '', name: '本月工单退单' },
            { value: '', name: '本月勘测接单' },
            { value: '', name: '本月勘测退单' }
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
      ]
    }
    var app = {}
    var chartDom2 = document.getElementById('show')
    var myChart2 = echarts.init(chartDom2)
    var option2
    // 实施人员的信息（柱状）
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
        text: '各季度工作情况',
        left: 'top'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['工单接单', '工单退单', '勘测接单', '勘测退单']
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
          name: '工单接单',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: []
        },
        {
          name: '工单退单',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: []
        },
        {
          name: '勘测接单',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: []
        },
        {
          name: '勘测退单',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: []
        }
      ]
    }

    // 作业管理人员的信息（饼状）
    var chartDom3 = document.getElementById('pie2')
    var myChart3 = echarts.init(chartDom3)
    var option3 = {
      title: {
        text: '本月工作情况',
        // subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}:{c}({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '本月详情',
          type: 'pie',
          radius: '50%',
          data: [
            { value: '', name: '本月需求制订' },
            { value: '', name: '本月工单完成' }
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
      ]
    }
    var app2 = {}
    var chartDom4 = document.getElementById('show2')
    var myChart4 = echarts.init(chartDom4)
    var option4
    // 作业管理人员的信息（柱状）
    const posList2 = [
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
    app2.configParameters = {
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
        options: posList2.reduce(function(map, pos) {
          map[pos] = pos
          return map
        }, {})
      },
      distance: {
        min: 0,
        max: 100
      }
    }
    app2.config = {
      rotate: 90,
      align: 'left',
      verticalAlign: 'middle',
      position: 'insideBottom',
      distance: 15,
      onChange: function() {
        const labelOption2 = {
          rotate: app2.config.rotate,
          align: app2.config.align,
          verticalAlign: app2.config.verticalAlign,
          position: app2.config.position,
          distance: app2.config.distance
        }
        myChart4.setOption({
          series: [
            {
              label: labelOption2
            },
            {
              label: labelOption2
            },
            {
              label: labelOption2
            },
            {
              label: labelOption2
            }
          ]
        })
      }
    }
    const labelOption2 = {
      show: true,
      position: app2.config.position,
      distance: app2.config.distance,
      align: app2.config.align,
      verticalAlign: app2.config.verticalAlign,
      rotate: app2.config.rotate,
      formatter: '{c} ',
      fontSize: 18,
      rich: {
        name: {}
      }
    }
    option4 = {
      title: {
        text: '各季度工作情况',
        left: 'top'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['需求制订', '工单完成']
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
          name: '需求制订',
          type: 'bar',
          barGap: 0,
          label: labelOption2,
          emphasis: {
            focus: 'series'
          },
          data: []
        },
        {
          name: '工单完成',
          type: 'bar',
          label: labelOption2,
          emphasis: {
            focus: 'series'
          },
          data: []
        }
      ]
    }
    // 作业管理人员的信息（饼状）
    var chartDom5 = document.getElementById('pie3')
    var myChart5 = echarts.init(chartDom5)
    var option5 = {
      title: {
        text: '待试验详情',
        // subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}:{c}({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '预警详情',
          type: 'pie',
          radius: '50%',
          data: [
            { value: '', name: '工具试验待处理数' },
            { value: '', name: '车辆试验待处理数' },
            { value: '', name: '车辆保险待处理数' }
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
      ]
    }
    var app3 = {}
    var chartDom6 = document.getElementById('show3')
    var myChart6 = echarts.init(chartDom6)
    var option6
    // 作业管理人员的信息（柱状）
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
        options: posList3.reduce(function(map, pos) {
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
          rotate: app3.config.rotate,
          align: app3.config.align,
          verticalAlign: app3.config.verticalAlign,
          position: app3.config.position,
          distance: app3.config.distance
        }
        myChart6.setOption({
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
    option6 = {
      title: {
        text: '各季度工作情况',
        left: 'top'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['工具试验预警处理', '车辆试验预警处理', '车辆保险预警处理']
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
          name: '工具试验预警处理',
          type: 'bar',
          barGap: 0,
          label: labelOption3,
          emphasis: {
            focus: 'series'
          },
          data: []
        },
        {
          name: '车辆试验预警处理',
          type: 'bar',
          label: labelOption3,
          emphasis: {
            focus: 'series'
          },
          data: []
        },
        {
          name: '车辆保险预警处理',
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
      this.loading = true
      console.log(res.data.data)
      this.user = res.data.data
      const params = new URLSearchParams()
      params.append('userId', this.user.userId)
      getAcceptOrRecallInfoForChart(params).then(response => {
        this.loading = false
        // 柱状图工作人员
        option2.series[0].data = response.data.data[0]
        option2.series[1].data = response.data.data[1]
        option2.series[2].data = response.data.data[2]
        option2.series[3].data = response.data.data[3]
        myChart2.setOption(option2)
        // 饼图工作人员
        option.series[0].data[0].value = response.data.data[4][0]
        if (response.data.data[4][0] === 0) {
          // option.series[0].data[0] = null
        }
        option.series[0].data[1].value = response.data.data[4][2]
        if (response.data.data[4][2] === 0) {
          // option.series[0].data[1] = null
        }
        option.series[0].data[2].value = response.data.data[4][1]
        if (response.data.data[4][1] === 0) {
          // option.series[0].data[2] = null
        }
        option.series[0].data[3].value = response.data.data[4][3]
        if (response.data.data[4][3] === 0) {
          // option.series[0].data[3] = null
        }
        myChart.setOption(option)
        // console.log(option.series[0].data)
        // console.log(option.series[0].data[0].value)
        // console.log(option.series[0].data[1].value)
        // console.log(option.series[0].data[2].value)
        // console.log(option.series[0].data[3].value)
        // console.log(response.data.data[4][0])
        // console.log(response.data.data[4][1])
        // console.log(response.data.data[4][2])
        // console.log(response.data.data[4][3])
        this.$forceUpdate()
      })
      getWorkManageInfoForChart(params).then(response => {
        this.loading = false
        // 柱状图作业管理人员
        option4.series[0].data = response.data.data[0]
        option4.series[1].data = response.data.data[1]
        myChart4.setOption(option4)
        // 饼图作业管理人员
        option3.series[0].data[0].value = response.data.data[2][0]
        option3.series[0].data[1].value = response.data.data[2][1]
        myChart3.setOption(option3)
        this.$forceUpdate()
      })
      getWarnInfoForChart(params).then(response => {
        this.loading = false
        // 柱状图库房管理人员
        option6.series[0].data = response.data.data[0]
        option6.series[1].data = response.data.data[1]
        option6.series[2].data = response.data.data[2]
        myChart6.setOption(option6)
        // 饼图库房管理人员
        option5.series[0].data[0].value = response.data.data[3][0]
        option5.series[0].data[1].value = response.data.data[3][1]
        option5.series[0].data[2].value = response.data.data[3][2]
        myChart5.setOption(option5)
        this.$forceUpdate()
      })
    })
  },
  methods: {
    // 加载用户个人信息
    async findUserInfo() {
      await getUserInfo().then((res) => {
        console.log(res.data.data)
        this.user = res.data.data
        this.RoleSrting = res.data.data.roleString
      })
      const a = this.user.avatar
      // 更新相应的头像信息，放入到store中
      this.$store.dispatch('setUseradvatar', a)
      if (this.RoleSrting.indexOf('5') !== -1) {
        this.getAcceptOrRecallInfo()
        this.getWorkManageInfoForIndex()
        this.getEquipmentWarnInfoForIndex()
      }
      if (this.RoleSrting.indexOf('4') !== -1) {
        this.getAcceptOrRecallInfo()
      }
      if (this.RoleSrting.indexOf('6') !== -1) {
        this.getWorkManageInfoForIndex()
      }
      if (this.RoleSrting.indexOf('17') !== -1) {
        this.getEquipmentWarnInfoForIndex()
      }

      // this.getAcceptOrRecallInfoForChart()
    },
    getAcceptOrRecallInfo() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('userId', this.user.userId)
      getAcceptOrRecallInfo(params).then(response => {
        this.loading = false
        console.log('获取接退单数量顶部4个')
        console.log(response.data.data)
        this.jiedanCoutByYear = response.data.data[0]
        this.tuidanCoutByYear = response.data.data[2]
        this.jiedanCoutByMonth = response.data.data[1]
        this.tuidanCoutByMonth = response.data.data[3]
      })
    },
    getWorkManageInfoForIndex() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('userId', this.user.userId)
      getWorkManageInfoForIndex(params).then(response => {
        this.loading = false
        this.requireCoutByYear = response.data.data[0]
        this.orderCoutByYear = response.data.data[1]
        this.requireCoutByMonth = response.data.data[2]
        this.orderCoutByMonth = response.data.data[3]
      })
    },
    getEquipmentWarnInfoForIndex() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('userId', this.user.userId)
      getEquipmentWarnInfoForIndex(params).then(response => {
        this.loading = false
        this.warnCoutByYear = response.data.data[0]
        this.warnCoutByMonth = response.data.data[1]
        this.toolWarnCount = response.data.data[2]
        this.carWarnCount = response.data.data[3]
      })
    },
    getAcceptOrRecallInfoForChart() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('userId', this.user.userId)
      getAcceptOrRecallInfoForChart(params).then(response => {
        this.loading = false
        this.options.series[0] = response.data.data[0]
        this.options.series[0] = response.data.data[2]
        this.options.series[0] = response.data.data[1]
        this.options.series[0] = response.data.data[3]
      })
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
  .wel-contailer {
    position: relative;
  }

  .banner-text {
    position: relative;
    padding: 0 20px;
    font-size: 20px;
    text-align: center;
    color: #333;
  }

  .banner-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    display: none;
  }

  .actor {
    height: 250px;
    overflow: hidden;
    font-size: 18px;
    color: #333;
  }

  .actor:after {
    content: '';
    width: 3px;
    height: 25px;
    vertical-align: -5px;
    margin-left: 5px;
    background-color: #333;
    display: inline-block;
    animation: blink 0.4s infinite alternate;
  }

  .typeing:after {
    animation: none;
  }

  @keyframes blink {
    to {
      opacity: 0;
    }
  }
</style>
