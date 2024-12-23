<template>
  <div class="app-container">
    <div class="card">
      <el-form ref="dataForm" :model="listQuery" :rules="rules">
        <el-row>
          <el-col :span="24">
            <el-form-item label="商户号" prop="merchantName">
              <el-input v-model="listQuery.merchantName" placeholder="多个商户号,使用英文逗号分割" class="filter-item" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="IP地址" prop="IP">
              <el-input v-model="listQuery.IP" type="textarea" placeholder="多个IP地址,使用换行分割" rows="6" class="filter-item" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="48">
            <el-button v-waves :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="addIP">
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

<script>
import waves from '@/directive/waves'
import { fetchAddIP, fetchDeleteIP } from '@/api/whiteList'

export default {
  name: 'ComplexTable',
  directives: { waves },
  data() {
    const validateIP = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('IP地址不能为空'))
      }
      const ips = value.split('\n')
      const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      const ipv6Pattern = /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|(([0-9a-fA-F]{1,4}:){1,6}|:):(([0-9a-fA-F]{1,4}:){1,5}|:):(([0-9a-fA-F]{1,4}:){1,4}|:):(([0-9a-fA-F]{1,4}:){1,3}|:):(([0-9a-fA-F]{1,4}:){1,2}|:):(([0-9a-fA-F]{1,4}:){1}|:):(([0-9a-fA-F]{1,4})|:)|::([0-9a-fA-F]{1,4}:){0,5}(([0-9a-fA-F]{1,4}:){1,4}|:):(([0-9a-fA-F]{1,4}:){1,3}|:):(([0-9a-fA-F]{1,4}:){1,2}|:):(([0-9a-fA-F]{1,4}:){1}|:):(([0-9a-fA-F]{1,4})|:)|::([0-9a-fA-F]{1,4}:){0,4}(([0-9a-fA-F]{1,4}:){1,3}|:):(([0-9a-fA-F]{1,4}:){1,2}|:):(([0-9a-fA-F]{1,4}:){1}|:):(([0-9a-fA-F]{1,4})|:)|::([0-9a-fA-F]{1,4}:){0,3}(([0-9a-fA-F]{1,4}:){1,2}|:):(([0-9a-fA-F]{1,4}:){1}|:):(([0-9a-fA-F]{1,4})|:)|::([0-9a-fA-F]{1,4}:){0,2}(([0-9a-fA-F]{1,4}:){1}|:):(([0-9a-fA-F]{1,4})|:)|::([0-9a-fA-F]{1,4}:){0,1}(([0-9a-fA-F]{1,4})|:)|::)$/

      for (let i = 0; i < ips.length; i++) {
        const ip = ips[i].trim()
        if (!ipv4Pattern.test(ip) && !ipv6Pattern.test(ip)) {
          return callback(new Error('IP地址格式错误'))
        }
      }
      callback()
    }
    const validateMerchantName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('商户不能为空'))
      }
      const merchants = value.split(',')
      const merchantPattern = /^[a-zA-Z0-9]{3}$/
      for (let i = 0; i < merchants.length; i++) {
        const merchant = merchants[i].trim()
        if (!merchantPattern.test(merchant)) {
          return callback(new Error('商户格式错误'))
        }
      }
      callback()
    }
    return {
      listLoading: false,
      listQuery: {
        merchantName: undefined,
        IP: undefined,
        OpUser: undefined,
        country: this.$route.path.substring(1)
      },
      rules: {
        merchantName: [{ required: true, validator: validateMerchantName, trigger: 'blur' }],
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
          fetchAddIP(data).then((response) => {
            this.$notify({
              title: 'Success',
              message: response.message,
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
          fetchDeleteIP(data).then((response) => {
            this.$notify({
              title: 'Success',
              message: response.message,
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

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 400px;
}
</style>
