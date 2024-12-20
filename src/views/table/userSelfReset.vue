<template>
  <div class="user-self-reset">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="当前用户" prop="username">
        <el-input v-model="form.username" disabled />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="form.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="再次输入新密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { resetUser } from '@/api/user'

export default {
  name: 'UserSelfReset',
  data() {
    return {
      form: {
        username: this.$store.getters.name, // Assuming username is stored in Vuex
        password: '',
        confirmPassword: ''
      },
      rules: {
        password: [{ required: true, message: 'Please input the new password', trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: 'Please confirm the new password', trigger: 'blur' },
          { validator: this.validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    validatePassword(rule, value, callback) {
      if (value !== this.form.password) {
        callback(new Error('2次密码不匹配'))
      } else {
        callback()
      }
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const formData = new URLSearchParams()
          formData.append('username', this.form.username)
          formData.append('password', this.form.password)

          resetUser(formData).then(response => {
            console.log(response.message)
            this.$message.success('密码修改成功')
            this.form.password = ''
            this.form.confirmPassword = ''
          }).catch(error => {
            console.error('密码修改失败:', error)
            this.$message.error('密码修改失败')
          })
        } else {
          console.log('Error submitting form!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.user-self-reset {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
