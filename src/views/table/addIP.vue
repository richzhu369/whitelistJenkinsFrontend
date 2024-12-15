<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery" :rules="rules" ref="dataForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="商户号" prop="merchantName">
              <el-input v-model="listQuery.merchantName" placeholder="商户号" style="width: 300px;" class="filter-item" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="IP地址" prop="IP">
              <el-input v-model="listQuery.IP" placeholder="多个IP地址,使用英文逗号分割" style="width: 300px;" class="filter-item" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="48">
            <el-button v-waves :loading="listLoading" class="filter-item" style="margin-left: 100px;" type="primary" icon="el-icon-plus" @click="addIP">
              添加
            </el-button>
            <el-button v-waves :loading="listLoading" class="filter-item" type="danger" icon="el-icon-close" @click="deleteIP">
              删除
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh; /* Full viewport height */
}

.filter-container {
  width: 100%;
  max-width: 600px; /* Adjust as needed */
  padding: 20px;
  background-color: #fff; /* Optional: for better visibility */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* Optional: for better visibility */
}
</style>
<script>
import waves from '@/directive/waves'
import { fetchAddIP,fetchDeleteIP } from '@/api/whiteList'

export default {
  name: 'ComplexTable',
  directives: { waves },
  data() {
    const validateIP = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('IP地址不能为空'))
      }
      const ips = value.split(',')
      for (let i = 0; i < ips.length; i++) {
        const segments = ips[i].trim().split('.')
        if (segments.length !== 4) {
          return callback(new Error('IP地址格式不正确'))
        }
        for (let j = 0; j < segments.length; j++) {
          const segment = parseInt(segments[j], 10)
          if (isNaN(segment) || segment < 0 || segment > 255) {
            return callback(new Error('IP地址格式不正确'))
          }
        }
      }
      callback()
    }
    return {
      listLoading: true,
      listQuery: {
        merchantName: undefined,
        IP: undefined,
        OpUser: undefined,
        country: this.$route.path.substring(1)
      },
      rules: {
        merchantName: [{ required: true, message: '商户号不能为空', trigger: 'blur' }],
        IP: [{ required: true, validator: validateIP, trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getCurrentUser()
  },
  methods: {
    getCurrentUser() {
      this.listQuery.OpUser = this.$store.getters.name
    },
    addIP() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          const data = {
            merchantName: this.listQuery.merchantName,
            IP: this.listQuery.IP,
            OpUser: this.listQuery.OpUser,
            country: this.listQuery.country
          }
          fetchAddIP(data).then(() => {
            this.$notify({
              title: 'Success',
              message: 'IP地址添加成功',
              type: 'success',
              duration: 2000
            })
          }).finally(() => {
            this.listLoading = false
          })
        }
      })
    },
    deleteIP() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          const data = {
            merchantName: this.listQuery.merchantName,
            IP: this.listQuery.IP,
            OpUser: this.listQuery.OpUser,
            country: this.listQuery.country
          }
          fetchDeleteIP(data).then(() => {
            this.$notify({
              title: 'Success',
              message: 'IP地址删除成功',
              type: 'success',
              duration: 2000
            })
          }).finally(() => {
            this.listLoading = false
          })
        }
      })
    }
  }
}
</script>
