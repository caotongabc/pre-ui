<template>
  <div class="app-container">
    <el-row  :gutter="15">
      <el-col   style="height: 70%" :xs="24" :sm="14">
        <el-card   style="height: 70%" class="user-center">
          <el-tabs   style="height: 70%" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="个人信息" name="first">
              <div class="user" style="width: 600px">
                <el-form ref="form" :model="user" label-width="80px">
                  <el-form-item label="头像">
<!--                    <el-upload-->
<!--                      class="avatar-uploader"-->
<!--                      action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                      :show-file-list="false"-->
<!--                      :on-success="handleAvatarSuccess"-->
<!--                      :before-upload="beforeAvatarUpload"-->
<!--                    >-->
<!--                      <img v-if="user.avatar" :src="user.avatar"    style="width: 30px;height: 30px" alt="">-->
<!--                      <i v-else class="el-icon-plus avatar-uploader-icon" />-->
<!--                    </el-upload>-->
                    <el-upload
                      action="/pre/file/upload/avator"
                      :show-file-list="false"
                      :http-request="uploadFile"
                      :on-remove="handleAvatarSuccess"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="user.avatar" :src="user.avatar" style="width: 80px;height: 60px" class="avatar">
                      <i v-else class="el-icon-plus  avatar-uploader-icon" ></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="用户名">
                    <el-input  :disabled="true" v-model="user.username" />
                  </el-form-item>
                  <el-form-item label="手机号">
                    <el-input v-model="user.phone" />
                  </el-form-item>
                  <el-form-item label="用户邮箱">
                    <el-input v-model="user.email"  />
                  </el-form-item>
                  <el-form-item label="所属部门">
                    <el-input v-model="user.deptName" :disabled="true" />
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="updateInfo('user')">提交</el-button>
                    <el-button>取消</el-button>
                  </el-form-item>
                </el-form>
              </div>

            </el-tab-pane>

            <el-tab-pane label="修改密码" name="second">

              <div style="width: 400px">
                <el-form
                  ref="passForm"
                  :model="passForm"
                  status-icon
                  :rules="rules"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="原密码" prop="oldPass">
                    <el-input v-model="passForm.oldPass" type="password" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="密码" prop="newPass">
                    <el-input v-model="passForm.newPass" type="password" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="确认密码" prop="checkPass">
                    <el-input v-model="passForm.checkPass" type="password" autocomplete="off" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="updatePass('passForm')">修改</el-button>
                    <el-button @click="resetForm('passForm')">重置</el-button>
                  </el-form-item>
                </el-form>
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
import { avatar } from '@/store/getters'
import { uploadAvator } from '@/api/file'
import { getUserInfo, editUser, updatePass, resetEmail, updateEmail, updateUserInfo } from '@/api/user'
import axios from 'axios'

import axiosInstance from 'axios'

export default {
  name: 'Index',
  // components: { PanThumb },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.passForm.checkPass !== '') {
          this.$refs.passForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passForm.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
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
        createTime: ''
      },
      activeName: 'first',
      passForm: {
        oldPass: '',
        newPass: '',
        checkPass: ''
      },
      rules: {
        oldPass: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
        newPass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      },
      mailForm: {
        email: '',
        code: '',
        pass: ''
      },
      buttonName: '发送验证码',
      isDisabled: false,
      codeLoading: false,
      time: 60,
      logo: [
        { img: 'gitee.png', name: 'gitee', bind: false, radius: true },
        { img: 'github.png', name: 'github', bind: false, radius: true },
        { img: 'tencent_cloud.png', name: 'tencent_cloud', bind: false, radius: true },
        { img: 'qq.png', name: 'qq', bind: false, radius: false },
        { img: 'dingtalk.png', name: 'dingtalk', bind: false, radius: true },
        { img: 'microsoft.png', name: 'microsoft', bind: false, radius: false }
      ]
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

  methods: {
    // parseTime,
    // formatEmail(mail) {
    //   return regEmail(mail)
    // },

    resolveLogo(logo) {
      return require(`@/assets/logo/${logo}`)
    },
    // 加载用户个人信息
    async findUserInfo() {
      await getUserInfo().then((res) => {
        console.log(res.data.data)
        this.user = res.data.data
        const a = this.user.avatar
        this.$store.dispatch('setUseradvatar', a)
      })
    },
    // 修改密码
    updatePass: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = new URLSearchParams()
          params.append('oldPass', this.passForm.oldPass)
          params.append('newPass', this.passForm.newPass)
          updatePass(params).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.activeName = 'second'
              this.$refs['passForm'].resetFields()
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
        } else {
          return false
        }
      })
    },
    // 修改个人信息
    updateInfo: function(formName) {
      console.log('提交前的地址为：')
      console.log(this.user.avatar)
      const a = this.user.avatar
      updateUserInfo(this.user).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.$store.dispatch('setUseradvatar', a)
          this.activeName = 'first'
          this.$refs['passForm'].resetFields()
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    // 修改邮箱
    updateEmail: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = new URLSearchParams()
          params.append('mail', this.mailForm.email)
          params.append('code', this.mailForm.code)
          params.append('pass', this.mailForm.pass)
          updateEmail(params).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.activeName = 'third'
              this.$refs['mailForm'].resetFields()
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
        } else {
          return false
        }
      })
    },

    // 发送邮箱验证码
    sendCode() {
      if (this.mailForm.email && this.mailForm.email !== '') {
        this.codeLoading = true
        this.buttonName = '验证码发送中'
        const params = new URLSearchParams()
        params.append('to', this.mailForm.email)
        const _this = this
        resetEmail(params).then(res => {
          if (res.data.code === 200) {
            this.$message({
              showClose: true,
              message: '发送成功，验证码有效期5分钟',
              type: 'success'
            })
            this.codeLoading = false
            this.isDisabled = true
            this.buttonName = this.time-- + '秒后重新发送'
            this.timer = window.setInterval(function() {
              _this.buttonName = _this.time + '秒后重新发送'
              --_this.time
              if (_this.time < 0) {
                _this.buttonName = '重新发送'
                _this.time = 60
                _this.isDisabled = false
                window.clearInterval(_this.timer)
              }
            }, 1000)
          }
        }).catch(err => {
          this.resetForm()
          this.codeLoading = false
          console.log(err.data.message)
        })
      }
    },
    // handleSuccess(response, file, fileList) {
    //   this.$notify({
    //     title: '头像修改成功',
    //     type: 'success',
    //     duration: 2500
    //   })
    //   store.dispatch('GetInfo').then(() => {
    //   })
    // },
    // 监听上传失败
    // handleError(e, file, fileList) {
    //   const msg = JSON.parse(e.message)
    //   this.$notify({
    //     title: msg.message,
    //     type: 'error',
    //     duration: 2500
    //   })
    // },
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
    // 文件上传
    uploadFile(params) {
      console.log('uploadFile', params)
      // this.dataForm.toolPhoto = ''
      this.user.multipartFile = params.file
      const isLt2M = this.user.multipartFile.size / 1024 / 1024 < 2
      // 通过 FormData 对象上传文件
      if (!isLt2M) {
        this.$message.error('请上传2M以下的.xlsx文件')
        return false
      }
      console.log('通过方法不是action来访问接口')
      // 发起请求
      var formData = new FormData()
      formData.append('multipartFile', this.user.multipartFile)
      uploadAvator(formData).then(res => {
        this.user.avatar = res.data.data
        console.log('头像的地址为：')
        console.log(this.user.avatar)
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
      this.imageUrl = URL.createObjectURL(file.raw)
      // this.user.avatar = URL.createObjectURL(file.raw)
      console.log(this.user.avatar)
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

  .user-center{
    height: 440px;
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
